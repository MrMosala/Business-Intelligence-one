import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      debugger;
      const file = acceptedFiles[0];
      const validFileNames = ['Groceries_dataset.csv', 'sales_data_sample.csv'];
      const validExtensions = ['.csv', '.xlsx'];
      const fileExtension = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);

      if (!validFileNames.includes(file.name) || !validExtensions.includes(`.${fileExtension}`)) {
        Swal.fire({
          icon: 'error',
          title: 'Unsupported File',
          text: 'Only sales_data_sample.csv or Groceries_dataset.csv are accepted.',
          confirmButtonColor: '#ff5722',
        });
        return;
      }
      
      onFileUpload(acceptedFiles);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300
        ${isDragActive ? 'border-primary-500 bg-primary-100' : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-primary-600 font-semibold">Drop the file here ...</p>
      ) : (
        <p>Drag & drop a file here, or click to select a file</p>
      )}
      <p className="text-sm text-gray-500 mt-2">Accepted file types: .csv, .xlsx</p>
      <p className="text-xs text-gray-400 mt-1">Specific files: Groceries_dataset.csv, sales_data_sample.csv</p>
    </div>
  );
};