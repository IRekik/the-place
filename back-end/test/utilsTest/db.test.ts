import { Pool } from 'pg';

// Mock the pg library
jest.mock('pg');

// Unit test: simulates a postgresql dabatase connection by mocking the pg library, creating a Pool instance, connecting and requesting
describe('Database Connection', () => {
    it('should open a connection to the database', async () => {
        // Mock the Pool class and its methods
        const mockQuery = jest.fn().mockResolvedValue({ rows: [] });
        const mockRelease = jest.fn();

        // Mock the Pool constructor
        (Pool as any).mockImplementation(() => ({
            connect: jest.fn().mockImplementation(() => ({
                query: mockQuery,
                release: mockRelease,
            })),
            end: jest.fn(),
        }));

        // Your actual connection parameters
        const connectionParams = {
            user: 'root',
            host: 'localhost',
            database: 'your_database',
            password: 'your_password',
            port: 5432,
        };

        // Create a new Pool instance (mocked)
        const pool = new Pool(connectionParams);

        // Try to connect to the database
        const client = await pool.connect();

        // Verify that the Pool.connect method was called
        expect(pool.connect).toHaveBeenCalled();

        // Verify that the client was obtained successfully
        expect(client).toBeDefined();

        // Verify that the query method is functional
        await client.query('SELECT 1');

        // Release the client
        client.release();

        // Verify that the release method is called
        expect(mockRelease).toHaveBeenCalled();

        // Close the pool after the test
        await pool.end();
    });
});