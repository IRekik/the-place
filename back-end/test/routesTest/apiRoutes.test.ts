// Changing the PG database to a test database for the purpose of not altering main database
process.env.PG_DATABASE = "theplace_db_test";
import { request } from "./testSetup";

const TOKEN = String(process.env.TOKEN) || "undefined";

describe("Endpoint testing", () => {
  // Test case: delete post endpoint - creates a posts, then deletes it and compares status,
  // Expected, the delete query shall return 204 status and quering the deleted post shall result in "Post not found"
  it("DELETE - /delete-post - should return a 204 status to confirm delete operation", async () => {
    const createPostResponse = await request
      .post("/submit-data")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        title: "Test Post",
        text_content: "Test Content",
        img_reference: "",
      });

    const postId = createPostResponse.body.blog_id;

    const deleteResponse = await request
      .delete(`/delete-post/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`);

    const deletedPostQuering = await request
      .get(`/get-post-by-id/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`);

    expect(deletedPostQuering.body).toEqual({ error: "Post not found" });
    expect(deleteResponse.status).toEqual(204);
  });

  // Test case: edit post endpoint - creates a post, then edits it and compares request status,
  // Expected: The edit request shall return a 200 request and quering the post shall return the new values
  it("POST - /edit-post - should return a 200 status to confirm post editing operation", async () => {
    const createPostResponse = await request
      .post("/submit-data")
      .send({
        title: "Test Post",
        text_content: "Test Content",
        img_reference: "",
      })
      .set("Authorization", `Bearer ${TOKEN}`);

    const postId = createPostResponse.body.blog_id;

    const editResponse = await request
      .post(`/edit-post/${postId}`)
      .send({
        title: "New Post",
        text_content: "New Content",
      })
      .set("Authorization", `Bearer ${TOKEN}`);

    const editedPostQuering = await request
      .get(`/get-post-by-id/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`);

    expect(editResponse.status).toEqual(200);
    expect(editedPostQuering.body.title).toEqual("New Post");
    expect(editedPostQuering.body.content).toEqual("New Content");
  });

  // Test case: edit post, creates dummy post using endpoint and verifies request status and body message,
  // Expected: The post request shall return a 200 status and quering the post shall return the values used during submission
  it("POST - submit-data - should return a 200 status to confirm data submisison operation", async () => {
    const createPostResponse = await request
      .post("/submit-data")
      .send({
        title: "Test Post",
        text_content: "Test Content",
        img_reference: "",
      })
      .set("Authorization", `Bearer ${TOKEN}`);

    const postId = createPostResponse.body.blog_id;

    const submittedPostQuering = await request
      .get(`/get-post-by-id/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`);

    expect(createPostResponse.status).toEqual(200);
    expect(submittedPostQuering.body.title).toEqual("Test Post");
    expect(submittedPostQuering.body.content).toEqual("Test Content");

    request.delete(`/delete-post/${postId}`);
  });

  // Test case: get all post endpoint - retrieves data from endpoint and verifies request status and body,
  // Expected: The request's status shall be 200 and the request's body shall be an object
  it("GET - /getAllPosts - should return a list of the blog data", async () => {
    const response = await request
      .get("/get-hero-data")
      .set("Authorization", `Bearer ${TOKEN}`);

    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  // Test case: get hero data endpoint, retrieves data from endpoint and verifies request status and body,
  // Expected: The response shall have be an object of three properties (threads, comments and users) and return a 200 status
  it("GET - /get-hero-data - should return a list containing the information used by the hero section", async () => {
    const response = await request
      .get("/get-hero-data")
      .set("Authorization", `Bearer ${TOKEN}`);

    expect(response.body).toBeInstanceOf(Object);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("threads");
    expect(response.body).toHaveProperty("comments");
    expect(response.body).toHaveProperty("users");
  });

  // Test case: submit data endpoint, creates dummy post, retrieves post's data from endpoint and verifies request status and body
  // Expected: The response shall include a 200 status and a body of title and content equal to the values used at submission
  it("GET - /get-post-by-id - should return a list containing the information of the designated post", async () => {
    const createPostResponse = await request
      .post("/submit-data")
      .send({
        title: "POSTBYID TITLE",
        text_content: "POSTBYID CONTENT",
        img_reference: "",
      })
      .set("Authorization", `Bearer ${TOKEN}`);
    const postId = createPostResponse.body.blog_id;

    const response = await request
      .get(`/get-post-by-id/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`);
    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual("POSTBYID TITLE");
    expect(response.body.content).toEqual("POSTBYID CONTENT");
  });
});
