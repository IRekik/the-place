"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { parseContent } from "../../utils/contentBoxParser";
import "react-quill/dist/quill.snow.css";
import SERVER_URL from "../../utils/environmentVariables/serverUrl";
import TOKEN from "../../utils/environmentVariables/token";
import TitleInput from "@/components/new-post/TitleInput";
import ContentEditor from "@/components/new-post/ContentEditor";

const NewPost: React.FC = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && !user?.admin) {
      router.replace("/404");
    }
  }, [user, isLoading, router]);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [postStatus, setPostStatus] = useState<string | null>(null);
  const [hasEnteredTitle, setHasEnteredTitle] = useState(true);
  const [hasEnteredContent, setHasEnteredContent] = useState(true);

  const handleEditorChange = (newContent: React.SetStateAction<string>) => {
    setContent(newContent);
    setHasEnteredContent(true);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasEnteredTitle(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setHasEnteredTitle(false);
    }
    if (!content) {
      setHasEnteredContent(false);
    }
    if (!title || !content) {
      console.log("A title and content are required to post a thread");
      return;
    }

    try {
      const [img_reference, text_content] = parseContent(content);
      const response = await fetch(`${SERVER_URL}/api/blog-post/submit-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
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
        if (response.status === 403) {
          router.replace('/404');
          return;
        }
        setPostStatus("Failed to create post. Please try again.");
      }

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error:", error);
      setPostStatus("Error creating post. Please try again.");
    }
  };

  // Don't render anything while checking or if not admin
  if (isLoading || !user?.admin) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 mb-5">
      <h1 className="text-3xl font-bold mb-4">Create a post</h1>
      {postStatus && (
        <div
          className={`p-3 mb-4 rounded ${
            postStatus.includes("successfully") ? "bg-green-200" : "bg-red-200"
          }`}
        >
          <p
            className={
              postStatus.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {postStatus}
          </p>
        </div>
      )}
      {(!hasEnteredTitle || !hasEnteredContent) && (
        <div className="p-3 mb-4 rounded bg-red-200">
          <p className="text-red-600">
            A title and content are required to post a thread
          </p>
        </div>
      )}
      <div>
        <div className="mb-4">
          <TitleInput title={title} onTitleChange={handleTitleChange} />
        </div>
        <div className="mb-4">
          <ContentEditor
            content={content}
            onContentChange={handleEditorChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="text-white px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPost;