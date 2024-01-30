import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

interface ContentEditorProps {
    content: string;
    onContentChange: (newContent: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ content, onContentChange }) => {
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

    return (
        <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
        </label>
        <div className="h-80 mt-2 w-full flex items-left flex-col bg-white">
            <div className="h-full rounded-md">
            <QuillEditor
                value={content}
                onChange={onContentChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your blog post here..."
                className="w-full h-[80%]"
            />
            </div>
        </div>
        </div>
    );
};

export default ContentEditor;