# The Place, a blog web application

A blog web application developped using Next.JS framework, along with React for front end and Typescript Express back-end server. The Place currently three different cloud services to run on the cloud: Cloudinary for image hosting and access, Render for cloud database hosting and two AWS EC2s to run separately back end and front end.

## Installation

Start by cloning the current repository.

```bash
git clone https://github.com/IRekik/the-place.git
```

### Front end

From the root repository, change directory to `front-end`.

```bash
cd front-end
```

Install dependencies.

```bash
npm install
```

Build the project

```bash
npm run build
```

### Back end

From the root repository, change directory to `back-end`.

```bash
cd back-end
```

Install dependencies.

```bash
npm install
```

Build the project

```bash
npm run build
```

## Getting Started

This section will explain how to run locally the project. The package manager `npm` will be used to run the project.

### Front end

Run the front end:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The front end is running on the port 3000, make sure to not already use it when running the front end, otherwise it will not be able to run.

### Back end

Run the development server:

```bash
npm start
```

The server will run locally on `http://localhost:3001`. The back end is running on the port 3001, make sure to not already use it when running the front end, otherwise it will not be able to run.

## Features and design

### Home page and layout

The home page is a welcome page when user accesses the web application. The Hero section displays information about the website: number of threads, number of comments and number of users. The lower section is designated to display all the current blog posts and are loaded 3 by 3 by clicking on a button. The layout includes a navbar to access the home page and the footer is only implemented for aesthetic purposes.

### Post a thread (or a blog post)

By clicking on `Post your thread` on the home page, the website is redirected to `http://localhost:3000/new-post` where user can enter a title and content to create a blog post. The title uses a simple text input box and the content is inputted via the rich text editor `QuillEditor` and supports HTML format text, allowing for italic, bold, underlined text and more. The rich text editor also supports images. The user can upload an image and a copy will be hosted on the cloud using `Cloudinary` cloud service. The rich text editor can support both text content and image content at the same time.

### View a thread

Accessible from the home page by clicking on individual posts or by accessing them using their own link. Each thread is accessible and located at `http://localhost:3000/posts/[blog_id]` where `blog_id` is an ID assigned to a thread upon creation and is unique.

### Edit a thread

At the thread viewing page, it is possible to edit the thread. By clicking on "Edit" located inside the ellipsis, it is possible to enter a new title and text content, then submit the modifications. The editing timestamp will be included at the top of the thread.

### Delete a thread

At the thread viewing page, it is possible to delete the thread. To delete a thread, click on "Delete" located inside the ellipsis and the thread will be deleted.

## Learn More

### Useful Resources

- **Next.js Documentation**: Explore the official [Next.js documentation](https://nextjs.org/docs) for in-depth information on features, API references, and best practices.

- **TypeScript Handbook**: Dive into the [TypeScript Handbook](https://www.typescriptlang.org/docs) to strengthen your knowledge of TypeScript and its capabilities.

- **PostgreSQL Documentation**: Refer to the official [PostgreSQL documentation](https://www.postgresql.org/docs/) for comprehensive guides on database setup, queries, and optimization.

- **AWS EC2 Documentation**: Explore the [AWS EC2 documentation](https://docs.aws.amazon.com/ec2/) to learn about cloud computing with scalable virtual machines.

- **Render Documentation**: Get familiar with [Render's documentation](https://render.com/docs) to deploy and host your web applications and databases effortlessly.

- **Cloudinary Documentation**: Discover the features and integrations offered by Cloudinary for effective image and video management in your web and mobile applications at [Cloudinary Documentation](https://cloudinary.com/documentation).

Feel free to refer to these resources for continuous learning and optimization of your web application. If you encounter any issues or have suggestions, please open an [issue](https://github.com/IRekik/the-place/issues) or submit a [pull request](https://github.com/IRekik/the-place/pulls).

## License

This project is licensed under the MIT License - see the [LICENSE_EN.txt](LICENSE_EN.txt) file for details.
