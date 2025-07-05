"use client";
import { useEffect, useState } from "react";
import { BlogPost } from "../../../utils/interfaces/blogPostInterface";
import { notFound, usePathname } from "next/navigation";
import BlogPostDisplay from "@/components/blogs/BlogPostDisplay";
import SERVER_URL from "../../../utils/environmentVariables/serverUrl";
import TOKEN from "../../../utils/environmentVariables/token";

const Post: React.FC = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const postId = usePathname().split("/").pop();

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      try {
        if (!postId) {
          return;
        }

        const response = await fetch(`${SERVER_URL}/api/blog-post/get-post-by-id/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const postData: BlogPost = await response.json();

        setStatus(response.status);
        setPost(postData);
      } catch (error) {
        console.error(`Error fetching data for post ID ${postId}:`, error);
      }
    };

    fetchData();
  }, [postId]);

  if (status == 404) {
    return notFound();
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {post && (
        <div className="relative">
          <BlogPostDisplay post={post} />
        </div>
      )}
    </div>
  );
};

export default Post;
