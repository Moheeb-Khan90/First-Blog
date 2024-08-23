import React, { useState } from "react";
import { AllPosts } from "../components/index";
import BlogServies from "../Appwrite/Blog";

const AllPost = () => {
  const [posts, setPost] = useState([]);

  BlogServies.readDocuments([]).then((posts) => {
    setPost(posts.documents);
  });

  return (
    <>
      <div
        className="w-full gap-6  my-4 
      xsm:flex xsm:flex-col  xsm:justify-center xsm:items-center xsm:p-4
      sm:flex sm:flex-col sm:justify-center sm:items-center 
      md:flex md:flex-row  md:justify-center "
      >
        {posts && posts.map((post) => (
          <div key={post.$id} >
            <AllPosts {...post} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllPost;
