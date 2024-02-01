# The Place - Front End

[![jp](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/IRekik/the-place/blob/main/front-end/README.jp.md)


The front end of "The Place" blog web application is developed using the Next.js framework, React for the UI components, and TypeScript for a more robust development experience. This section provides an overview of the project structure, key components, and how to set up and run the front-end locally.

## Project Structure

- `components/`: Contains React components used throughout the project.
  - `blogs/`: Components related to blog posts.
    - `BlogPostDisplay.tsx`: React component for displaying a single blog post.
    - `Ellipsis.tsx`: React component for an ellipsis menu with options like edit and delete.
  - `home/`: Components related to the home page.
    - `BlogPost.tsx`: React component for displaying blog posts on the home page.
    - `Footer.tsx`: React component for the footer section on the home page.
    - `Hero.tsx`: React component for the hero section on the home page.
- `utils/`: Contains utility functions and interfaces.
  - `interfaces/`: TypeScript interfaces for defining data structures.
    - `blogPostInterface.ts`: Interface for the blog post data structure.
    - `heroDataInterface.ts`: Interface for the hero data structure.
  - `formatDate.ts`: Utility function for formatting dates.
  - `environmentVariables/`: Contains constants or environment variables.
    - `serverUrl.ts`: File containing the server URL.
- `app/`: Contains Next.js pages.
  - `new-post/page.tsx`: Page for creating a new blog post.
  - `posts/[blog_id]/page.tsx`: Page for displaying a single blog post.
  - `index.tsx`: Layout UI shared between routes.
  - `page.tsx`: Home page.

## Environment Variables

To ensure the integrity and security of the application, secrets and sensitive information have been stored as system variables. Here is a list of environment variables to set up:

- `SECRET_KEY`: JWT secret key used to generate a JWT Token.
- `TOKEN`: JWT Token generated using `SECRET_KEY`.

### App

- **`new-post`**: Contains the page for creating a new blog post.
- **`posts`**: Contains dynamic pages for individual blog posts.
- **`layout.tsx`**: Defines the layout for the entire application.
- **`page.tsx`**: Main page component that integrates various sections like Hero and BlogPosts.

### Components

- **`blogs`**: Folder for components related to displaying blog posts.
- **`home`**: Folder for components related to the home page.
- **`new-post`**: Folder for components related to creating a new post.

### Utils

- **`environmentVariables`**: Holds configuration variables, such as the server URL.
- **`interfaces`**: Defines TypeScript interfaces for data structures used in the application.
- **`contentBoxParser.js`**: Parses content for image references and text content.
- **`formatDate.js`**: Formats date strings.

## Running Locally

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/IRekik/the-place.git
    ```

2. Navigate to the front-end directory:

    ```bash
    cd the-place/front-end
    ```

3. Install dependencies:

    ```bash
    npm install
    ```
4. Build the project:

    ```bash
    npm run build
    ```

### Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.

## Tests

The `test` directory contains files for testing the back-end code using Jest.

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### Running Tests

    To execute the tests, run the following command:

    ```bash
    npm install
    npm test
    ```

## Learn More

Explore the official documentation of the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
