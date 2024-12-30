const mediaModel = require('../Models/media_model');
const pool = require('../database');
// const mockResult = require('./_mockData/mockMedia');

// Mock the database pool
jest.mock('../database', () => ({
  execute: jest.fn(),
}));

describe('Media Model test', () => {
    beforeEach(() => {
        pool.execute.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getMedia', () => {
        it('should execute simple search query', async () => {
            await mediaModel.getMedia('test', false, null, null); // latter two parameters should not affect query

            expect(pool.execute).toHaveBeenCalledWith(
            expect.stringContaining('WHERE (mediaName LIKE ? OR creator LIKE ? OR publisher LIKE ?)'),
            ['%test%', '%test%', '%test%']
            );
        });

        it('should execute advanced search query by all fields', async () => {
            await mediaModel.getMedia('test', true, 'all', { all: true, book: true, periodical: true , multimedia: true});

            expect(pool.execute).toHaveBeenCalledWith(
            expect.stringContaining('WHERE (m.mediaName LIKE ? OR m.creator LIKE ? OR m.publisher LIKE ?)'),
            ['%test%', '%test%', '%test%']
            );
        });

        it('should execute advanced search query by specific field', async () => {
            await mediaModel.getMedia('test', true, 'mediaName', { all: true, book: true, periodical: true , multimedia: true});

            expect(pool.execute).toHaveBeenCalledWith(
                expect.stringContaining('WHERE mediaName LIKE ?'),
                ['%test%']
            );
        });

        it('should include media types in sql command', async () => {
            await mediaModel.getMedia('test', true, 'all', { all: false, book: true, periodical: false , multimedia: true});

            expect(pool.execute).toHaveBeenCalledWith(
                expect.stringContaining('WHERE (m.mediaName LIKE ? OR m.creator LIKE ? OR m.publisher LIKE ?) AND types.mediaType IN (?, ?)'),
                ['%test%', '%test%', '%test%', 'book', 'multimedia']
            );
        });

        it('should ignore media type filter if all media types are false', async () => {
            await mediaModel.getMedia('test', true, 'all', { all: false, book: false, periodical: false , multimedia: false});

            expect(pool.execute).toHaveBeenCalledWith(
                expect.stringContaining('WHERE (m.mediaName LIKE ? OR m.creator LIKE ? OR m.publisher LIKE ?)'),
                ['%test%', '%test%', '%test%']
            );
        });
    });
});