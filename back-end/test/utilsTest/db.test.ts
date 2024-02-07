import { Pool } from "pg";

// Mock the pg library
jest.mock("pg", () => {
  return {
    Pool: jest.fn(() => ({
      connect: jest.fn(),
      end: jest.fn(),
    })),
    Client: jest.fn(() => ({
      connect: jest.fn(),
      query: jest.fn(),
      release: jest.fn(),
    })),
  };
});

// Unit test: simulates a PostgreSQL database connection by mocking the pg library, creating a Pool instance, connecting, and requesting
describe("Database Connection", () => {
  it("should open a connection to the database", async () => {
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

    // Mock the connect and query methods
    (pool.connect as jest.Mock).mockResolvedValue({
      query: jest.fn().mockResolvedValue({ rows: [] }),
      release: jest.fn(),
    });

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

    // Close the pool after the test
    await pool.end();
  });
});
