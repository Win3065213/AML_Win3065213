const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/auth');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      sendStatus: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    process.env.ACCESS_TOKEN_SECRET = 'test_secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided', () => {
    const middleware = verifyToken();
    middleware(mockRequest, mockResponse, mockNext);

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    mockRequest.headers['authorization'] = 'Bearer invalid_token';
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    const middleware = verifyToken();
    middleware(mockRequest, mockResponse, mockNext);

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(403);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next() if token is valid', () => {
    mockRequest.headers['authorization'] = 'Bearer valid_token';
    const mockUser = { id: 1, email: 'testuser', role: 'user' };
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, mockUser);
    });

    const middleware = verifyToken();
    middleware(mockRequest, mockResponse, mockNext);

    expect(mockRequest.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 403 if required role is not met', () => {
    mockRequest.headers['authorization'] = 'Bearer valid_token';
    const mockUser = { id: 1, email: 'testuser', role: 'user' };
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, mockUser);
    });

    const middleware = verifyToken('sys_admin');
    middleware(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Insufficient role privileges" });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next() if required role is met', () => {
    mockRequest.headers['authorization'] = 'Bearer valid_token';
    const mockUser = { id: 3, username: 'testuser', role: 'sys_admin' };
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, mockUser);
    });

    const middleware = verifyToken('sys_admin');
    middleware(mockRequest, mockResponse, mockNext);

    expect(mockRequest.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalled();
  });
});

