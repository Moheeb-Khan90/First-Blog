import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../../config-variable/config.js";

function RichEditor({ name, control, defaultValue }) {
  return (
    <>
      <div className="w-full">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <Editor
                apiKey= {config.RICH_EDITOR}
                initialValue={defaultValue}
                init={{
                  initialValue: defaultValue,
                  height: 600,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                  ],
                  toolbar:
                    "quickbars | undo redo | styles | bold italic | link image |alignleft aligncenter alignright | link",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={onChange}
              />
            );
          }}
        />
      </div>
    </>
  );
}

export default RichEditor;
