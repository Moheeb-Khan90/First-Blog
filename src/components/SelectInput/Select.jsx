import React, { useId } from "react";

const Select = (
  { options, optionLabel, className, selectClassName = "", props },
  ref
) => {
  const id = useId();
  return (
    <>
      <div className="w-full">
        {optionLabel && (
          <label htmlFor={id} className={`${selectClassName}`}>
            {optionLabel}
          </label>
        )}
        <select
          {...props}
          id={id}
          ref={ref}
          className={`w-full p-2 rounded-sm border bg-white  border-neutral-200 focus:outline-blue-300  ${className} `}
        >
          <option disabled value="">
            Select your option
          </option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default React.forwardRef(Select);
