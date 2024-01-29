'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '../../utils/interfaces/blogPostInterface';
import { formatDate } from '@/utils/formatDate';
import EllipsisMenu from './Ellipsis';
import dynamic from 'next/dynamic';
import  SERVER_URL from '../../utils/environmentVariables/serverUrl'
import 'react-quill/dist/quill.snow.css';

interface BlogPostDisplayProps {
    post: BlogPost;
}

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const BlogPostDisplay: React.FC<BlogPostDisplayProps> = ({ post }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedContent, setEditedContent] = useState(post.content);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/delete-post/${post.blog_id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log(response);
                router.push('/');
            } else {
                console.error('Failed to delete post.');
            }
        } catch (error) {
          console.error('Error deleting post:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/edit-post/${post.blog_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: editedTitle,
                    text_content: editedContent,
                }),
            });
        
            if (response.ok) {
                console.log('Post edited successfully!');
            } else {
                console.error('Failed to edit post.');
            }
        } catch (error) {
            console.error('Error editing post:', error);
        }
        location.reload();
        setIsEditing(false);
      };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <div className='blog-post bg-white shadow-lg p-6 rounded-lg mb-4 ml-[5%] 
        mr-[5%] md:ml-[10%] md:mr-[10%] lg:ml-[15%] lg:mr-[15%] min-h-48'>
            <h2 className='text-2xl font-bold mb-4'>
                {isEditing ? (
                    <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="text-2xl font-bold mb-4 w-full border-b border-gray-300"
                    />
                ) : (
                    post.title
                )}
                <EllipsisMenu onDelete={handleDelete} onEdit={handleEdit} />
            </h2>
            <div className='flex items-center text-gray-500 mb-2'>
                <p className='mr-4'>
                    {formatDate(post.creation_date)}
                    {post.edit_date && ` · Edited ${formatDate(post.edit_date)}`}
                </p>
            </div>
            {isEditing ? (
                <div className="mb-4">
                    <QuillEditor
                    value={editedContent}
                    onChange={(value) => setEditedContent(value)}
                    modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image'],
                            ['clean'],
                        ],
                    }}
                    placeholder="Write your blog post here..."
                    />
                </div>
            ) : (
                <>
                    {post.img_reference && (
                        <img 
                        src={post.img_reference} 
                        alt='Post Image' 
                        className='w-auto h-auto mb-4' />
                    )}
                    <p
                    className="block text-gray-900 mt-1 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </>
            )}
            {isEditing && (
                <div className="flex space-x-2">
                    <button
                    className=" text-white px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 visited:bg-indigo-300"
                    onClick={handleSaveEdit}
                    >
                        Save
                    </button>
                    <button
                    className=" text-white px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 visited:bg-red-300"
                    onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogPostDisplay;