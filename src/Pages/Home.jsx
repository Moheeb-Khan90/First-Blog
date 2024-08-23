import React, { useState } from "react";
import { CardBlog, Loader } from "../components/index";
import BlogServies from "../Appwrite/Blog";
import { Query } from "appwrite";

const Home = () => {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    BlogServies.readDocuments([Query.limit(5), Query.orderDesc(posts.title)])
      .then((posts) => {
        setLoading(false);
        setPost(posts.documents);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 2000);

  return (
    <>
      {loading ?(
        <Loader loadingText={"loading..."} />

      ):(
<div
        className="w-full gap-6  my-4
      xsm:flex xsm:flex-col xsm:justify-center xsm:items-center xsm:p-4
      sm:flex sm:flex-col sm:justify-center sm:items-center 
      md:flex md:flex-row md:flex-wrap md:justify-center bg-white"
      >
        {posts && posts.map((post) => (
          <CardBlog {...post} key={post.slug}/>
        ))}
      </div>
      )}
      
    </>
  );
};

export default Home;
