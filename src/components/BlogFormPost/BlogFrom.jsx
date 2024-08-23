
import React, { useCallback, useEffect, useState } from "react";
import { Input, RichEditor, Select, Loader } from "../index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogServies from "../../Appwrite/Blog";

const BlogFrom = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "Add Blog",
      slug: post?.$id || "",
      status: post?.status || "active",
      description: post?.description || "",
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post?.title || "",
        content: post?.content || "Add Blog",
        slug: post?.$id || "",
        status: post?.status || "active",
        description: post?.description || "",
      });
    }
  }, [post, reset]);

  const submit = async (data) => {
    setLoading(true);
    try {
      if (post) {
        const file = data.image[0]
          ? await BlogServies.uploadFile(data.image[0])
          : undefined;
        if (file && post.content_image) {
          console.log(post.content_image);
          await BlogServies.removeFile(post.content_image);
        }

        const updatedPost = await BlogServies.updateDocument(post.$id, {
          ...data,
          content_image: file ? file.$id : post.content_image,
        });
        if (updatedPost) {
          navigate(`/posts/${post.slug}`);
        }
      } else {
        const file = await BlogServies.uploadFile(data.image[0]);
        if (file) {
          const newPost = await BlogServies.createsDocuments({
            ...data,
            content_image: file.$id,
            userId: user.userData?.$id,
          });
          if (newPost) {
            navigate(`/home`)
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const slugValue = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugValue(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugValue, setValue]);

  return (
    <>
      <div className="w-full p-4 bg-slate-100 flex justify-center">
        <div className="outline  w-full py-4 px-2">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
            <div className="w-full flex gap-3">
              <div className="w-1/2">
                <Input
                  type="text"
                  labelText="Blog Title"
                  classLabel="my-2 flex-start capitalize font-semibold text-lg text-neutral-600"
                  placeholder="Blog Title"
                  autoComplete="off"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Title Must Be Required",
                    },
                  })}
                />
                {errors.title && (
                  <p className="text-red-600">{errors.title.message}</p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  type="text"
                  labelText="Slug"
                  classLabel="my-2 flex-start capitalize font-semibold text-lg text-neutral-600"
                  placeholder="Slug"
                  autoComplete="off"
                  {...register("slug", {
                    required: { value: true, message: "Slug Must Be Required" },
                  })}
                  onInput={(e) => {
                    setValue("slug", slugValue(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />
                {errors.slug && (
                  <p className="text-red-600">{errors.slug.message}</p>
                )}
              </div>
            </div>
            <div className="w-full flex gap-3">
              <div className="w-1/2">
                <Input
                  type="file"
                  labelText="Select Image"
                  classLabel="my-2 flex-start capitalize font-semibold text-lg text-neutral-600 "
                  {...register("image", {
                    required: {
                      value: !post?.content_image,
                      message: "File Must Be Required",
                    },
                  })}
                />
                {errors.image && (
                  <p className="text-red-600">{errors.image.message}</p>
                )}
              </div>
              <div className="w-1/2">
                <Select
                  options={["active", "inactive"]}
                  optionLabel="Status"
                  className="my-2"
                  selectClassName="my-2 flex-start capitalize font-semibold text-lg text-neutral-600"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Status Must Be Required",
                    },
                  })}
                />
                {errors.status && (
                  <p className="text-red-600">{errors.status.message}</p>
                )}
              </div>
            </div>
            <div className="w-full flex gap-3">
              <div className="w-full">
                <Input
                  type="text"
                  labelText="Description"
                  placeholder="description"
                  autoComplete="off"
                  classLabel="my-2 flex-start capitalize font-semibold text-lg text-neutral-600 "
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description Must Be Required",
                    },
                  })}
                />
                {errors.description && (
                  <p className="text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>
            <div className="w-full">
              <RichEditor
                name="content"
                control={control}
                autoComplete="off"
                defaultValue={getValues("content")}
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                disabled={loading || isSubmitting}
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white capitalize w-[80%]"
              >
                {post ? "Update Blog" : "Create Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && <Loader loadingText="Uploading..." />}
    </>
  );
};

export default BlogFrom;
