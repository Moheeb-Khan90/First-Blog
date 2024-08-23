import React from "react";
import BlogServies from "../../Appwrite/Blog";
import { Link } from "react-router-dom";

const CardBlog = ({
  content_image,
  title,
  slug,
  description,
  status
}) => {

  return (
    <>
    {
      status ? <div key={title} className="max-w-xl  bg-white shadow-lg rounded-lg overflow-hidden my-4 xsm:w-full sm:w-full md:w-[24rem] md:h-[60%]">
      <Link to={`/posts/${slug}`}>
      <div className=" flex flex-col flex-wrap ">
        <div className="w-full h-auto flex flex-col md:flex-row">
          <img
            className=" w-full h-24 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            src={BlogServies.getFilePreview(content_image)}
            alt={title}
            
          />
        </div>

        <div className=" p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-800">
            {description}
          </p>
        </div>
      </div>
      </Link>
     
    </div>:null
    }
      
    </>
  );
};

export default CardBlog;
