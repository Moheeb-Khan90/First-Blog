import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    labelText,
    type = "text",
    placeholder = "",
    classLabel = "",
    className = "w-full",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <>
      <div className="w-full">
        {labelText && (
          <label htmlFor={id} className={`${classLabel}`}>
            {labelText}
          </label>
        )}
      </div>

      <input

        type={type}
        placeholder={`${placeholder}`}
        {...props}
        className={` p-2 rounded-sm border bg-white  border-neutral-200 focus:outline-blue-300  ${className} `}
        id={id}
        ref={ref}
      />
    </>
  );
});

export default Input;
