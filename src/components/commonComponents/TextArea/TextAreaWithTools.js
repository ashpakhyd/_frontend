"use client"
import React, { useMemo } from "react";
// import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './TextAreaWithTools.css';
import dynamic from "next/dynamic";

const TextAreaWithTools = React.forwardRef(
  
  (
    {
      label,
      placeholder,
      className,
      labelClassName,
      isRequired = true,
      ...rest
    },
    ref
  ) => {

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

    return (
      <div className={className}>
        {label && (
          <label className={`text-base text-gray-300 mb-1 ${labelClassName}`}>
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </label>
        )}
        <ReactQuill
          ref={ref}
          placeholder={placeholder}
          {...rest}
          modules={{
            toolbar: [
              [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link', 'image', 'code-block']
            ]
          }}
          formats={[
            'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
            'color', 'background', 'align', 'link', 'image', 'code-block'
          ]}
          className="rounded-md border-2 border-gray-400 bg-transparent p-2 h-[300px]"
        />
      </div>
    );
  }
);

TextAreaWithTools.displayName = "TextAreaWithTools";
export default TextAreaWithTools;
