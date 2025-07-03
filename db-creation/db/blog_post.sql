CREATE TABLE blogs_table (
  blog_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  creation_date TIMESTAMP NOT NULL,
  edit_date TIMESTAMP,
  img_reference TEXT
);