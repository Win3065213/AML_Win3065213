const mediaModel = require('../Models/media_model');
const pool = require('../database');
const mockResult = require('./_mockData/mockMedia');

// Mock the database pool
jest.mock('../database', () => ({
  execute: jest.fn(),
}));

describe('Media Model test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getMedia', () => {
        beforeEach(() => {
            pool.execute.mockResolvedValue([mockResult]);
        });

        it('should perform simple search', async () => {
            const result = await mediaModel.getMedia('test', false, null, null); // latter two parameters should not affect query

            expect(pool.execute).toHaveBeenCalledWith(
            expect.stringContaining('WHERE (mediaName LIKE ? OR creator LIKE ? OR publisher LIKE ?)'),
            ['%test%', '%test%', '%test%']
            );
            expect(result).toEqual(mockResult); // only for checking mock resolve, no filter applied
        });

        it('should perform advanced search by all fields', async () => {
            const result = await mediaModel.getMedia('test', true, 'all', { all: true, book: true, periodical: true , multimedia: true});

            expect(pool.execute).toHaveBeenCalledWith(
            expect.stringContaining('WHERE (m.mediaName LIKE ? OR m.creator LIKE ? OR m.publisher LIKE ?)'),
            ['%test%', '%test%', '%test%']
            );
            expect(result).toEqual(mockResult); // only for checking mock resolve, no filter applied
        });

        it('should perform advanced search by specific field', async () => {

            const result = await mediaModel.getMedia('test', true, 'mediaName', { all: true, book: true, periodical: true , multimedia: true});

            expect(pool.execute).toHaveBeenCalledWith(
                expect.stringContaining('WHERE mediaName LIKE ?'),
                ['%test%']
            );
            expect(result).toEqual(mockResult); // only for checking mock resolve, no filter applied
        });

        it('should include media types in sql command', async () => {
            const result = await mediaModel.getMedia('test', true, 'all', { all: false, book: true, periodical: false , multimedia: true});

            expect(pool.execute).toHaveBeenCalledWith(
                expect.stringContaining('WHERE (m.mediaName LIKE ? OR m.creator LIKE ? OR m.publisher LIKE ?) AND type.mediaType IN (?, ?)'),
                ['%test%', '%test%', '%test%', 'book', 'multimedia']
            );
            expect(result).toEqual(mockResult); // only for checking mock resolve, no filter applied
        });

        it('should ignore media type filter if all media types are false', async () => {
            const result = await mediaModel.getMedia('test', true, 'all', { all: false, book: false, periodical: false , multimedia: false});

            expect(pool.execute).toHaveBeenCalledWith(
                expect.stringContaining('WHERE (m.mediaName LIKE ? OR m.creator LIKE ? OR m.publisher LIKE ?)'),
                ['%test%', '%test%', '%test%']
            );
            expect(result).toEqual(mockResult); // only for checking mock resolve, no filter applied
        });
    });
});