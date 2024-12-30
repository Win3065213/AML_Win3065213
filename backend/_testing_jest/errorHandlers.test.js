const { jsonParseErrorHandler, generalErrorHandler } = require('../middlewares/errorHandlers');

describe('Error Handlers', () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('jsonParseErrorHandler', () => {
    it('should handle JSON parse errors', () => {
      const jsonError = new SyntaxError('JSON Syntax Error');
      jsonError.status = 400;
      jsonError.body = '{ 1"invalid": "json" }';

      jsonParseErrorHandler(jsonError, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid JSON payload' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should pass other errors to next middleware', () => {
      const otherError = new Error('Other type of error');

      jsonParseErrorHandler(otherError, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(otherError);
    });
  });

  describe('generalErrorHandler', () => {
    it('should handle general errors', () => {
      const error = new Error('Some error');

      generalErrorHandler(error, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});

