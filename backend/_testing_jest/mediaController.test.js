const mediaController = require('../Controllers/media_controller');
const mediaModel = require('../Models/media_model');
const mockMediaList = require('./_mockData/mockMedia');

// Mock the media model
jest.mock('../Models/media_model', () => ({
    getMedia: jest.fn(),
}));

describe('Media Controller', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;

    beforeEach(() => {
        mockRequest = {
            body: {
                value: 'test',
                isAdvanced: false,
                searchBy: 'all',
                mediaTypes: { all: true, book: true, periodical: true , multimedia: true},
            },
        };
        mockResponse = {
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return media list on successful search', async () => {
        mediaModel.getMedia.mockResolvedValue(mockMediaList);

        await mediaController.searchMedia(mockRequest, mockResponse, mockNext);

        expect(mediaModel.getMedia).toHaveBeenCalledWith('test', false, 'all', { all: true, book: true, periodical: true , multimedia: true});
        expect(mockResponse.json).toHaveBeenCalledWith(mockMediaList);
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle errors and pass them to next middleware', async () => {
        const mockError = new Error('Test error');
        mediaModel.getMedia.mockRejectedValue(mockError);

        await mediaController.searchMedia(mockRequest, mockResponse, mockNext);

        expect(mediaModel.getMedia).toHaveBeenCalledWith('test', false, 'all', { all: true, book: true, periodical: true , multimedia: true});
        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it('should handle advanced search correctly', async () => {
        mockRequest.body.isAdvanced = true;
        mockRequest.body.searchBy = 'mediaName';
        mockRequest.body.mediaTypes = { all: false, book: true, periodical: false , multimedia: true};

        mediaModel.getMedia.mockResolvedValue(mockMediaList);

        await mediaController.searchMedia(mockRequest, mockResponse, mockNext);

        expect(mediaModel.getMedia).toHaveBeenCalledWith('test', true, 'mediaName', { all: false, book: true, periodical: false , multimedia: true});
        expect(mockResponse.json).toHaveBeenCalledWith(mockMediaList);
        expect(mockNext).not.toHaveBeenCalled();
    });
});