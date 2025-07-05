"use client";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../../utils/interfaces/blogPostInterface";
import SERVER_URL from "../../utils/environmentVariables/serverUrl";
import TOKEN from "../../utils/environmentVariables/token";

const BlogPosts = () => {
  const initialDisplayCount = 3;

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/get-all-posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const data: BlogPost[] = await response.json();

        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const visiblePosts = Array.isArray(posts) ? posts.slice(0, displayCount) : [];

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8 bg-gray-200 p-4 mb-5">
      <div>
        <h1 className="text-3xl text-gray-800 font-semibold">Threads</h1>
        <p className="mt-3 text-gray-500">
          Threads that everybody loves, threads that you love. Provides the
          juice in real-time, every time. Grab your pop-corn and hop on.
        </p>
      </div>
      <div className="mt-12 grid gap-4 divide-y md:grid-cols-2 md:divide-y-0 lg:grid-cols-1">
        {visiblePosts.map((item, idx) => (
          <article
            className="mt-5 pt-8 md:pt-0 border rounded-lg border-gray-200 transition duration-300 transform hover:scale-105"
            key={idx}
          >
            <Link legacyBehavior href={`/posts/${item.blog_id}`} passHref>
              <a className="block">
                <div className="ml-2">
                  {item.img_reference && (
                    <Image
                      src={item.img_reference}
                      loading="lazy"
                      alt="Img" 
                      width={80}
                      height={80}
                      className="w-20 rounded-lg"
                    />
                  )}
                  <h3 className="text-xl text-gray-900 font-semibold hover:underline">
                    {item.title}
                  </h3>
                  <div className="mt-2">
                    <span className="block text-gray-600 text-xs">
                      {formatDate(item.creation_date)}
                      {item.edit_date &&
                        ` · Edited ${formatDate(item.edit_date)}`}
                    </span>
                    <div className="block text-gray-900 mt-1 leading-relaxed fade-text">
                      <p dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                  </div>
                  <button className="mt-2 outline-none flex items-center text-[14px] text-indigo-600 decoration-blue-600 hover:underline">
                    READ MORE
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </a>
            </Link>
          </article>
        ))}
      </div>
      {displayCount < posts.length && (
        <button
          className="mt-4 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </section>
  );
};

export default BlogPosts;
