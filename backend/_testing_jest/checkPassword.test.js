const authModel = require('../Models/auth_model');
const bcrypt = require('bcryptjs');

describe('checkPassword', () => {
    it('should return true for correct password', async () => {
        const password = 'correctPassword';
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await authModel.checkPassword({ password: hashedPassword }, password);

        expect(result).toBe(true);
    });

    it('should return false for incorrect password', async () => {
        const password = 'correctPassword';
        const incorrectPassword = 'wrongPassword';
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await authModel.checkPassword({ password: hashedPassword }, incorrectPassword);

        expect(result).toBe(false);
    });

    it('should throw error when bcrypt compare fails', async () => {
        jest.spyOn(bcrypt, 'compare').mockRejectedValue(new Error('Bcrypt error'));

        await expect(authModel.checkPassword({ password: 'hashedPassword' }, 'password')).rejects.toThrow('Bcrypt error');
    });
});