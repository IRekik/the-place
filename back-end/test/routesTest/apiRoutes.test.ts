import { request } from './testSetup';

const TOKEN = String(process.env.TOKEN) || "undefined";

describe('Endpoint testing', () => {
    // Test case: delete post endpoint - creates a posts, then deletes it and compares status, 204 expected
    it('DELETE - /delete-post - should return a 204 status to confirm delete operation', async () => {
        const createPostResponse = await request
        .post('/submit-data')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
            title: 'Test Post',
            text_content: 'Test Content',
            img_reference: ''
        });

        const postId = createPostResponse.body.blog_id;    
        const deleteResponse = await request
        .delete(`/delete-post/${postId}`)
        .set('Authorization', `Bearer ${TOKEN}`);
        expect(deleteResponse.status).toEqual(204);
    });

    // Test case: edit post endpoint - creates a post, then edits it and compares request status, 200 expected
    it('POST - /edit-post - should return a 200 status to confirm post editing operation', async () => {
        const createPostResponse = await request
        .post('/submit-data')
        .send({
            title: 'Test Post',
            text_content: 'Test Content',
            img_reference: ''
        })
        .set('Authorization', `Bearer ${TOKEN}`);

        const postId = createPostResponse.body.blog_id;    
        const editResponse = await request
        .post(`/edit-post/${postId}`)
        .send({
            title: 'New Post',
            text_content: 'New Content',
        })
        .set('Authorization', `Bearer ${TOKEN}`);   
        expect(editResponse.status).toEqual(200);
    });

    // Test case: edit post, creates dummy post using endpoint and verifies request status and body message, 200 and adequate creation message expected
    it('POST - submit-data - should return a 200 status to confirm data submisison operation', async () => {
        const createPostResponse = await request
        .post('/submit-data')
        .send({
            title: 'Test Post',
            text_content: 'Test Content',
            img_reference: ''
        })
        .set('Authorization', `Bearer ${TOKEN}`);
        const postId = createPostResponse.body.blog_id;    

        expect(createPostResponse.status).toEqual(200);
        expect(createPostResponse.body.message).toEqual('Data received and inserted successfully');

        request.delete(`/delete-post/${postId}`);
    });

    // Test case: get all post endpoint - retrieves data from endpoint and verifies request status and body, 200 and content expected
    it('GET - /getAllPosts - should return a list of the blog data', async () => {
        const response = await request
        .get('/get-hero-data')
        .set('Authorization', `Bearer ${TOKEN}`);
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    // Test case: get hero data endpoint, retrieves data from endpoint and verifies request status and body, 200 and content expected
    it('GET - /get-hero-data - should return a list containing the information used by the hero section', async () => {
        const response = await request
        .get('/get-hero-data')
        .set('Authorization', `Bearer ${TOKEN}`);
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    // Test case: submit data endpoint, creates dummy post, retrieves post's data from endpoint and verifies request status and body, 200 and created content expected
    it('GET - /get-post-by-id - should return a list containing the information of the designated post', async () => {
        const createPostResponse = await request
        .post('/submit-data')
        .send({
            title: 'POSTBYID TITLE',
            text_content: 'POSTBYID CONTENT',
            img_reference: ''
        })
        .set('Authorization', `Bearer ${TOKEN}`);
        const postId = createPostResponse.body.blog_id;    

        const response = await request
        .get(`/get-post-by-id/${postId}`)
        .set('Authorization', `Bearer ${TOKEN}`);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('POSTBYID TITLE');
        expect(response.body.content).toEqual('POSTBYID CONTENT');
    });
});