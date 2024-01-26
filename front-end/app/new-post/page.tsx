'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { parseContent } from '../../utils/contentBoxParser'
import 'react-quill/dist/quill.snow.css';
import SERVER_URL from '../../utils/environmentVariables/serverUrl'

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const NewPost: React.FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [postStatus, setPostStatus] = useState<string | null>(null);
    const [hasEnteredTitle, setHasEnteredTitle] = useState(true);
    const [hasEnteredContent, setHasEnteredContent] = useState(true);

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
    };

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
    ];

    const handleEditorChange = (newContent: React.SetStateAction<string>) => {
        setContent(newContent);
        setHasEnteredContent(true);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setHasEnteredTitle(true);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title) {
        setHasEnteredTitle(false);
        }
        if (!content) {
        setHasEnteredContent(false);
        }
        console.log(hasEnteredTitle);
        console.log(hasEnteredContent);
        if (!title || !content) {
        console.log("A title and content are required to post a thread");
        return;
        }
        else {
            try {
                const [img_reference, text_content] = parseContent(content);
                const response = await fetch(`${SERVER_URL}/submit-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, text_content, img_reference }),
                });

                if (response.ok) {
                const responseData = await response.json();
                const insertedId = responseData.blog_id;
                setPostStatus(`Post created successfully!`);
                setTimeout(() => {
                    router.push(`/posts/${insertedId}`);
                }, 1000);
                } else {
                setPostStatus('Failed to create post. Please try again.');
                }

                setTitle('');
                setContent('');
            } catch (error) {
                console.error('Error:', error);
                setPostStatus('Error creating post. Please try again.');
            }
        }  
    };

    console.log(hasEnteredTitle);
    console.log(hasEnteredContent);

    return (
        <div className="max-w-2xl mx-auto mt-8 mb-5">
        <h1 className="text-3xl font-bold mb-4">Create a post</h1>
        {postStatus && (
            <div
            className={`p-3 mb-4 rounded ${postStatus.includes('successfully') ? 'bg-green-200' : 'bg-red-200'}`}
            >
            <p className={postStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}>{postStatus}</p>
            </div>)}
        {(!hasEnteredTitle || !hasEnteredContent) && (
            <div className="p-3 mb-4 rounded bg-red-200">
            <p className="text-red-600">A title and content are required to post a thread</p>
            </div>
        )}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Title"
            />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
                </label>
                <div className=
                "h-80 mt-2 w-full flex items-left flex-col bg-white">
                    <div className="h-full rounded-md">
                    <QuillEditor
                    value={content}
                    onChange={handleEditorChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your blog post here..."
                    className="w-full h-[80%]"
                    />
                    </div>
                </div>
            </div>
            <button
            type="submit"
            className=" text-white px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 visited:bg-indigo-300"
            >
            Post
            </button>
        </form>
        </div>
    );
};

export default NewPost;