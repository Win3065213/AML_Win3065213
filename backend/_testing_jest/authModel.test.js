const authModel = require('../Models/auth_model');
const pool = require('../database');
const bcrypt = require('bcryptjs');

// Mock the database pool and bcrypt
jest.mock('../database');
jest.mock('bcryptjs');

describe('Auth Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findUser', () => {
    it('should return user when found', async () => {
      const mockUser = { id: 1, email: 'user@test.com' };
      pool.execute.mockResolvedValue([[mockUser]]);

      const result = await authModel.findUser('user@test.com');

      expect(pool.execute).toHaveBeenCalledWith("SELECT * FROM account WHERE email = ?", ['user@test.com']);
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      pool.execute.mockResolvedValue([[]]);

      const result = await authModel.findUser('unregistered@test.com');

      expect(result).toBeNull();
    });

    it('should throw error when database query fails', async () => {
      pool.execute.mockRejectedValue(new Error('Database error'));

      await expect(authModel.findUser('user@test.com')).rejects.toThrow('Database error');
    });
  });

  describe('findRole', () => {
    it('should find role by ID', async () => {
      const mockRole = { roleID: 1, roleName: 'member' };
      pool.execute.mockResolvedValue([[mockRole]]);

      const result = await authModel.findRole(1, true);

      expect(pool.execute).toHaveBeenCalledWith("SELECT * FROM role WHERE roleID = ?", [1]);
      expect(result).toEqual(mockRole);
    });

    it('should find role by name', async () => {
      const mockRole = { roleID: 1, roleName: 'member' };
      pool.execute.mockResolvedValue([[mockRole]]);

      const result = await authModel.findRole('member');

      expect(pool.execute).toHaveBeenCalledWith("SELECT * FROM role WHERE roleName = ?", ['member']);
      expect(result).toEqual(mockRole);
    });

    it('should return null when role not found', async () => {
      pool.execute.mockResolvedValue([[]]);

      const result = await authModel.findRole('other');

      expect(result).toBeNull();
    });

    it('should throw error when database query fails', async () => {
      pool.execute.mockRejectedValue(new Error('Database error'));

      await expect(authModel.findRole('admin')).rejects.toThrow('Database error');
    });
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      const mockRole = { roleID: 1, roleName: 'member' };
      const mockInsertResult = { affectedRows: 1 };
      
      bcrypt.hash.mockResolvedValue('hashedPassword');
      pool.execute.mockResolvedValueOnce([[mockRole]]);
      pool.execute.mockResolvedValueOnce([mockInsertResult]);

      const result = await authModel.registerUser('newuser@test.com', 'password123');

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(pool.execute).toHaveBeenCalledWith("SELECT * FROM role WHERE roleName = ?", ['member']);
      expect(pool.execute).toHaveBeenCalledWith(
        "INSERT INTO account (email, password, roleID) VALUES (?,?,?)",
        ['newuser@test.com', 'hashedPassword', 1]
      );
      expect(result).toBe(true);
    });

    it('should return false when user registration fails', async () => {
      const mockRole = { roleID: 1, roleName: 'member' };
      const mockInsertResult = { affectedRows: 0 };
      
      bcrypt.hash.mockResolvedValue('hashedPassword');
      pool.execute.mockResolvedValueOnce([[mockRole]]);
      pool.execute.mockResolvedValueOnce([mockInsertResult]);

      const result = await authModel.registerUser('newuser@test.com', 'password123');

      expect(result).toBe(false);
    });

    it('should throw error when role not found', async () => {
      pool.execute.mockResolvedValueOnce([[]]);

      await expect(authModel.registerUser('newuser@test.com', 'password123')).rejects.toThrow();
    });

    it('should throw error when database insert fails', async () => {
      const mockRole = { roleID: 1, roleName: 'member' };
      
      bcrypt.hash.mockResolvedValue('hashedPassword');
      pool.execute.mockResolvedValueOnce([[mockRole]]);
      pool.execute.mockRejectedValueOnce(new Error('Insert failed'));

      await expect(authModel.registerUser('newuser@test.com', 'password123')).rejects.toThrow('Insert failed');
    });
  });
});