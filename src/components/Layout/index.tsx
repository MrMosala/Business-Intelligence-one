import React, { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import LeftNav from './LeftNav';
import Footer from './Footer';
import { Insight } from '@/types/datatypes';
import { useSession } from 'next-auth/react';
import { X } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
    previousInsights: Insight[];
    archivedInsights: Insight[];
}

const Layout: React.FC<LayoutProps> = ({ children, previousInsights, archivedInsights }) => {
    const { data: session, status } = useSession();
    const [showTopAd, setShowTopAd] = useState(true);
    const [showSideAd, setShowSideAd] = useState(true);

    useEffect(() => {
        let topTimer: NodeJS.Timeout;
        let sideTimer: NodeJS.Timeout;

        if (!showTopAd) {
            topTimer = setTimeout(() => setShowTopAd(true), 60000); // 1 minute
        }
        if (!showSideAd) {
            sideTimer = setTimeout(() => setShowSideAd(true), 120000); // 2 minutes
        }

        return () => {
            clearTimeout(topTimer);
            clearTimeout(sideTimer);
        };
    }, [showTopAd, showSideAd]);

    return (
        <>
            <Navbar />
            <div className='flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-600 min-h-screen'>
                <div className="relative w-full overflow-y-auto lg:ml-64 flex-col flex flex-grow">
                    {status === 'authenticated' && <LeftNav previousInsights={previousInsights} archivedInsights={archivedInsights} />} 
                    <div className="fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90 hidden" id="sidebarBackdrop"></div>
                    <main className='flex-grow'>
                        <div className="flex-grow flex flex-col">
                            {!session?.user.subscribed && showTopAd && (
                                <div className="bg-blue-100 p-2 text-center relative flex items-center justify-between">
                                    <span className="text-sm">Advertisement</span>
                                    <button 
                                        onClick={() => setShowTopAd(false)}
                                        className="text-gray-600 hover:text-gray-800"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            {children}
                        </div>
                    </main>
                    <Footer />
                    {!session?.user.subscribed && showSideAd && (
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-4 shadow-lg flex flex-col items-start justify-between">
                            <span className="text-sm font-bold mb-2">Side Ad</span>
                            <p className="text-xs mb-2">Check out our latest offers and discounts on premium subscriptions!</p>
                            <a href="/subscribe" className="text-blue-500 hover:underline text-xs mb-2">Subscribe now</a>
                            <button 
                                onClick={() => setShowSideAd(false)}
                                className="text-gray-600 hover:text-gray-800 self-end"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Layout