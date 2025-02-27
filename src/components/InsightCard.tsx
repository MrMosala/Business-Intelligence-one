import React from 'react';
import Link from 'next/link';

interface InsightCardProps {
  id: string;
  type: string;
  status: string;
  createdAt: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ id, type, status, createdAt }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Insight: {type}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Created at: {new Date(createdAt).toLocaleString()}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{status}</dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Link href={`/insights/${id}`} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default InsightCard;