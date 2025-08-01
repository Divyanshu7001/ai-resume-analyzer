import React, { useCallback} from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );
  const maxFileSize = 20 * 1024 * 1024; // 20 MB
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
  });
  const file = acceptedFiles[0] || null;

  return (
    <div
      className="w-full gradiant-border"
      onClick={(e) => e.stopPropagation()}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div className="uploader-selected-file">
              <img src="./images/pdf.png" alt="pdf" className="size-10" />
              <div className="flex items-center space-x-3">
                <div className="">
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
                <button
                  className="p-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileSelect?.(null);
                  }}
                >
                  <img
                    src="./icons/cross.svg"
                    alt="delete"
                    className="h-4 w-4"
                    onClick={() => onFileSelect(null)}
                  />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <img src="./icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-lg text-gray-500">
                PDF(max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
