# Back-end Folder Documentation

[![jp](https://img.shields.io/badge/lang-jp-yellow.svg)](https://github.com/IRekik/the-place/blob/main/back-end/README.jp.md)

This document provides an overview of the back-end folder structure, configuration files, and key components for "The Place" blog web application developed using the Next.js framework, React, and TypeScript Express for the front-end and back-end, respectively.

## Folder Structure

The back-end folder has the following structure:

- `src`: Contains the source code for the back-end server.
  - `routes`: Includes route handlers for different API endpoints.
  - `utils`: Contains utility functions and integrations, such as Cloudinary integration and database connection.
- `test`: Houses test files for Jest.

## Configuration Files

### `jest.config.js`

This configuration file is used for running tests with Jest. Key configurations include the test runner, test environment, file extensions, and module name mapping.

### `package.json`

This file includes metadata about the back-end project, scripts for testing, starting the server, and building the TypeScript code. Dependencies and devDependencies are listed here.

### `tsconfig.json`

This TypeScript configuration file defines compiler options, including target, module, output directory, root directory, and strict mode. It also specifies the files to include in compilation.

## Environment Variables

To ensure the integrity and security of the application, secrets and sensitive information have been stored as system variables. Here is a list of environment variables to set up:

- `CLOUD_NAME`: Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Cloudinary API secret.
- `PG_USER`: PostgreSQL Pool connection's user field.
- `PG_HOST`: PostgreSQL Pool connection's host field.
- `PG_DATABASE`: PostgreSQL Pool connection's database field.
- `PG_PASSWORD`: PostgreSQL Pool connection's password field.
- `PG_PORT`: PostgreSQL Pool connection's port.
- `SECRET_KEY`: JWT secret key used to generate a JWT Token.
- `TOKEN`: JWT Token generated using `SECRET_KEY`.

## Server Entry Point

### `src/index.ts`

This file serves as the entry point for the back-end server. It configures an Express application, sets up middleware (such as CORS and JSON parsing), defines routes, and creates an HTTP server. The server listens on a specified port.

## Route Handlers

The back-end utilizes Express.js for routing. Each route handler corresponds to a specific API endpoint. Here's a detailed overview of each endpoint:

### Delete a Blog Post

**Endpoint:** `DELETE /delete-post/:postId`

Deletes a blog post from the database using the provided post ID.

```javascript
const result = await pool.query('DELETE FROM blog_post WHERE blog_id = $1', [postId]);
```

### Edit a Blog Post

**Endpoint:** `POST /edit-post/:postId`

Updates the title and text content of a blog post using the provided post ID while logging the edit date.

```javascript
const result = await pool.query('UPDATE blog_post SET title = $2, content = $3, edit_date = $4 WHERE blog_id = $1', [postId, title, text_content, edit_date]);
```

### Get All Blog Posts

**Endpoint:** `GET /get-all-posts`

Fetches all blog posts from the database, including all fields.
```javascript
const result = await pool.query('SELECT * FROM blog_post ORDER BY creation_date DESC');
```

### Get Hero Section Data

**Endpoint:** `GET /get-hero-data`

Fetches information related to the home page's hero section. The number of threads, comments, and users are provided as placeholders.

```javascript
const result = await pool.query("SELECT count(*) AS exact_count FROM blog_post");
```

### Get a Blog Post by ID

**Endpoint:** `GET /get-post-by-id/:postId`

Fetches a specific blog post from the database based on the provided post ID.
```javascript
const result = await pool.query('SELECT * FROM blog_post WHERE blog_id = $1', [postId]);
```

### Post a New Blog Post

**Endpoint:** `POST /submit-data`

Inserts a new blog post into the database. The endpoint supports both text and image content.

```javascript
if (img_reference) {
    const img_link = await uploadBase64Image(img_reference);
    query = 'INSERT INTO blog_post (title, content, creation_date, img_reference) VALUES ($1, $2, $3, $4) RETURNING *';
    params = [title, text_content, creation_date, img_link];
} else {
    query = 'INSERT INTO blog_post (title, content, creation_date) VALUES ($1, $2, $3) RETURNING *';
    params = [title, text_content, creation_date];
}
```

## Database Integration

### `src/utils/db.ts`

This file establishes a connection to the PostgreSQL database using the `pg` library. The `Pool` object is used to manage connections. Database configuration details such as user, host, database name, password, and port are obtained from environment variables.

## Cloudinary Integration

### `src/utils/cloudinaryIntegration.ts`

This file provides integration with the Cloudinary service for image hosting. It uses the `cloudinary` library to configure the Cloudinary API with credentials obtained from environment variables. The `uploadBase64Image` function handles the uploading of base64-encoded images and returns the reference link.

## Testing

The `test` directory contains files for testing the back-end code using Jest. Test files follow a naming convention like `*.test.ts`. Running `npm test` executes Jest and runs the test suite.

## Running the Server

To start the back-end server, use the following npm script:

```bash
npm start
```

This script runs the server using `ts-node` for TypeScript support.

## Useful Resources

- **Express.js Documentation**: Explore the official [Express.js documentation](https://expressjs.com/) for in-depth information on building web applications with Express.

- **Jest Documentation**: Refer to the official [Jest documentation](https://jestjs.io/) for comprehensive guides on testing JavaScript and TypeScript code.

- **Cloudinary Documentation**: Discover the features and integrations offered by Cloudinary for effective image and video management in your web and mobile applications at [Cloudinary Documentation](https://cloudinary.com/documentation).