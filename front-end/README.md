# The Place - Front End

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
- `pages/`: Contains Next.js pages.
  - `new-post.tsx`: Page for creating a new blog post.
  - `posts/[blog_id].tsx`: Page for displaying a single blog post.
  - `index.tsx`: Home page.

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

### Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.

## Learn More

Explore the official documentation of the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)