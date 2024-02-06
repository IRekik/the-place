import { Pool } from "pg";

// Mock the pg library
jest.mock("pg");

// Unit test: simulates a postgresql dabatase connection by mocking the pg library, creating a Pool instance, connecting and requesting
describe("Database Connection", () => {
  it("should open a connection to the database", async () => {
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

    const connectionParams = {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT),
      ssl: { rejectUnauthorized: false },
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
    await client.query("SELECT 1");

    // Release the client
    client.release();

    // Verify that the release method is called
    expect(mockRelease).toHaveBeenCalled();

    // Close the pool after the test
    await pool.end();
  });
});
