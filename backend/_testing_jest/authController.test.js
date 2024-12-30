const authController = require('../Controllers/auth_controller');
const authModel = require('../Models/auth_model');
const jwt = require('jsonwebtoken');

// Mock the dependencies
jest.mock('../Models/auth_model');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let mockRequest;
  let mockResponse
  let mockNext;

  beforeEach(() => {
    mockRequest = {
      body: {},
      user: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should return 400 if email or password is missing', async () => {
      mockRequest.body = { email: 'user@test.com', password: undefined };

      await authController.register(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith('All fields required');
    });

    it('should return 400 if user already exists', async () => {
      mockRequest.body = { email: 'user@test.com', password: 'password' };
      const mockUser = { accountID: 1, email: 'user@test.com', password: 'password', roleID: 1 };
      authModel.findUser.mockResolvedValue(mockUser);

      await authController.register(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith('User already registered');
    });

    it('should register user successfully', async () => {
      mockRequest.body = { email: 'newuser@test.com', password: 'password' };
      authModel.findUser.mockResolvedValue(null);
      authModel.registerUser.mockResolvedValue(true);

      await authController.register(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith('Successfully Registered');
    });

    it('should call next with error if registration fails', async () => {
      mockRequest.body = { email: 'newuser@test.com', password: 'password' };
      authModel.findUser.mockResolvedValue(null);
      authModel.registerUser.mockResolvedValue(false);

      await authController.register(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('login', () => {
    it('should return 400 if email or password is missing', async () => {
      mockRequest.body = { email: 'user@test.com', password: undefined };

      await authController.login(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith('All fields required');
    });

    it('should return 400 if user is not found', async () => {
      mockRequest.body = { email: 'user@test.com', password: 'password' };
      authModel.findUser.mockResolvedValue(null);

      await authController.login(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith('User not found.');
    });

    it('should return 401 if password is incorrect', async () => {
      mockRequest.body = { email: 'user@test.com', password: 'password' };
      const mockUser = { accountID: 1, email: 'user@test.com', password: 'password', roleID: 1 };
      authModel.findUser.mockResolvedValue(mockUser);
      authModel.checkPassword.mockResolvedValue(false);

      await authController.login(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith('Email and password mismatch.');
    });

    it('should login user successfully', async () => {
      mockRequest.body = { email: 'user@test.com', password: 'password' };
      const mockUser = { accountID: 1, email: 'user@test.com', password: 'password', roleID: 1 };
      const mockRole = { roleID: 1, roleName: 'member' };
      authModel.findUser.mockResolvedValue(mockUser);
      authModel.checkPassword.mockResolvedValue(true);
      authModel.findRole.mockResolvedValue(mockRole);
      jwt.sign.mockReturnValue('mock-token');

      await authController.login(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        user: {
          id: 1,
          email: 'user@test.com',
          role: 'member'
        },
        token: 'mock-token'
      });
    });

    it('should call next with error if login fails', async () => {
      mockRequest.body = { email: 'user@test.com', password: 'password' };
      authModel.findUser.mockRejectedValue(new Error('Database error'));

      await authController.login(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});