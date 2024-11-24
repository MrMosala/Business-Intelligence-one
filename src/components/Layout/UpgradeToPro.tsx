import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  subscribed: boolean;
  subscription?: string;
}

export const UpgradeToPro: React.FC = () => {
  const { data: session, status } = useSession();
  //const customSession = session as CustomSession | null;

  if (status === 'loading') {
    return null; // Don't show anything while loading
  }
 

  if (session?.user.subscribed && session.user.subscription) {
    return (
      <div className="px-5 py-3 m-5 text-base font-medium text-center text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300">
        {session.user.subscription} Plan
      </div>
    );
  }

  return (
    <Link 
      href="/upgrade" 
      className="block w-full px-5 py-3 m-5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Upgrade to Pro
    </Link>
  );
};