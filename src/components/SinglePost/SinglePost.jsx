import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogServies from "../../Appwrite/Blog";
import HTMLReactParser from "html-react-parser";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  const loginUSer = useSelector((state) => state.auth.userData);


  //detele Post 
  const handleDelete = async (id) => {
    const deletePost = await BlogServies.deleteDocument(id);
    if (deletePost) {
      navigate("/home");
      await BlogServies.removeFile(post.content_image);
    }
  };

  useEffect(() => {
    BlogServies.readDocument(slug)
      .then((post) => {
        setPost(post)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  return (
    <>
      <div className="max-w-5xl  my-9  p-4 flex justify-center flex-col items-center rounded-sm shadow-lg">
        {post && post.userId === loginUSer.$id ? (
          <div className="w-full flex justify-end gap-3 text-blue-600 ">
            <FaEdit
              onClick={() => navigate(`/edit/${post.slug}`)}
              className="cursor-pointer"
            />
            <FaTrash
              onClick={() => handleDelete(post.slug)}
              className="cursor-pointer"
            />
          </div>
        ) : null}

        <div className="w-[50%] h-96 mx-auto">
          <img
            className="w-full "
            src={post && BlogServies.getFilePreview(post.content_image)}
            alt=""
          />
        </div>
        <div className="w-full my-5 xsm:p-2 sm:p-2 md:p-4 text-gray-700 ">
          <h1 className="font-bold text-[2rem] capitalize ">{post?.title}</h1>
          {post && typeof post.content === "string"
            ? HTMLReactParser(post.content)
            : "Loading content..."}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
