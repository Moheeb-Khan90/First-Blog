import React from "react";
import BlogServices from "../../Appwrite/Blog";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const AllPosts = ({ ...post }) => {
  return (
    <>
      {post && (
        <Link to={`/posts/${post.slug}`}>
            <div className=" w-[22rem] flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                className=" w-[22rem] h-48 object-cover"
                src={BlogServices.getFilePreview(post.content_image)}
                alt={post.title}
              />
              <div className="p-4 flex flex-col justify-between ">
                <h2 className="text-xl font-semibold mb-2 capitalize">{post.title}</h2>
                <p className="text-gray-800 ">
                  {parse(
                    post.description && post.description.length < 50
                      ? post.description.substring(0, 100)
                      : post.description
                  )}
                  ...
                </p>
              </div>
            </div>
        </Link>
      )}
    </>
  );
};

export default AllPosts;
