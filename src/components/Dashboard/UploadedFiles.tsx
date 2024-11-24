
import { File } from '@/types/datatypes';
import React, { useState } from 'react';
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaFileAlt, FaTrash, FaPaperPlane, FaArchive } from 'react-icons/fa';

interface UploadedFilesProps {
  files: File[];
  onProcessFile: (fileId: string, InsightId: string) => Promise<void>;
  onDeleteFile: (fileId: string) => Promise<void>;
  archived?: boolean;
}

export const UploadedFiles: React.FC<UploadedFilesProps> = ({ files, onProcessFile, onDeleteFile, archived = false }) => {
  const [processingFiles, setProcessingFiles] = useState<Set<string>>(new Set());
  const [deletingFiles, setDeletingFiles] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const handleProcessFile = async (fileId: string, insightId: string) => {
    setProcessingFiles(prev => new Set(prev).add(fileId));
    setError(null);
    try {
      await onProcessFile(fileId, insightId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the file');
    } finally {
      setProcessingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    setDeletingFiles(prev => new Set(prev).add(fileId));
    setError(null);
    try {
      await onDeleteFile(fileId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting the file');
    } finally {
      setDeletingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };

  if (error) return <p className="text-red-500 text-center my-4">{error}</p>;

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div key={file.id} className="flex justify-between items-center m-4 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center space-x-4">
            <FaFileAlt className="text-primary text-2xl" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">{file.filename} ({file.status})</span>

          </div>
          <div className="flex items-center space-x-4">
            {file.status === 'Processed' ? (
              <FaCheckCircle className="text-green-500 text-xl" />
            ) : file.status === 'Failed' ? (
              <FaTimesCircle className="text-red-500 text-xl" />
            ) : processingFiles.has(file.id) ? (
              <FaSpinner className="text-primary-500 text-xl animate-spin" />
            ) : archived ? (
              <FaArchive className="text-gray-500 text-xl" />
            ) : (
              <button
                onClick={() => handleProcessFile(file.id, file.insight_id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-300 focus:outline-none"
              >
                <FaPaperPlane />
              </button>
            )}

            {/* <button
              onClick={() => handleDeleteFile(file.file_id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-300 focus:outline-none"
              disabled={deletingFiles.has(file.file_id)}
            >
              {deletingFiles.has(file.file_id) ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaTrash />
              )}
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};