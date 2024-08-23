import React, { useEffect, useState } from "react";
import { BlogFrom } from "../components";
import { useParams } from "react-router-dom";
import BlogServies from "../Appwrite/Blog";
const Edit = () => {
  const [post, setPost] = useState("");
  const { slug } = useParams();
  
  useEffect(() => {
   BlogServies.readDocument(slug).then((post) => {
      setPost(post);
    });
  }, [slug]);

  return (
    <div>
      <BlogFrom post={post} />
    </div>
  );
};

export default Edit;
