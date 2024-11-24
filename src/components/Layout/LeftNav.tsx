import { Insight } from '@/types/datatypes'
import Link from 'next/link'
import React, { useState } from 'react'
import { UpgradeToPro } from './UpgradeToPro'
import { useSession } from 'next-auth/react'

interface LeftNavProps {
    previousInsights: Insight[],
    archivedInsights: Insight[],
}

const LeftNav: React.FC<LeftNavProps> = ({ previousInsights, archivedInsights }) => {
    const [insightsDropdown, setInsightsDropdown] = useState(false)
    const [archivedDropdown, setArchivedDropdown] = useState(false)
    const { data: session, status } = useSession();

    return (
        <aside id="sidebar" className="fixed top-0 left-0 z-20  flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width hidden" aria-label="Sidebar">
            <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 space-y-1  divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <ul className="pb-2 space-y-2">

                            <li>
                                <Link href="/" className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                    <svg className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span className="ml-3" sidebar-toggle-item="">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <button type="button" onClick={() => { setInsightsDropdown((prev) => !prev) }} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700" aria-controls="dropdown-layouts" data-collapse-toggle="dropdown-layouts">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                                    </svg>
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap -rotate-0" sidebar-toggle-item="">Previous Insights</span>
                                    <svg sidebar-toggle-item="" className={`w-6 h-6 -rotate-90 ${!insightsDropdown ? "" : "-rotate-0"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                                <ul id="dropdown-layouts" className={`${insightsDropdown ? "" : "hidden"} py-2 space-y-2`}>
                                    {previousInsights && previousInsights.map((ins, key) =>
                                        <li key={key}>
                                            <Link
                                                href={`/insights/${ins.id}`}
                                                className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                            >
                                                {(() => {
                                                    const date = new Date(ins.created_at);
                                                    const time = date.toLocaleString('en-GB', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false
                                                    });
                                                    const day = date.getDate().toString().padStart(2, '0');
                                                    const month = date.toLocaleString('en-GB', { month: 'short' });
                                                    const year = date.getFullYear();

                                                    // Ensure September is abbreviated as 'Sept'
                                                    const formattedMonth = month === 'Sep' ? 'Sept' : month;

                                                    return `${time} ${day} ${formattedMonth} ${year}`;
                                                })()}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </li>
                            {session?.user.subscribed   && (
                            <li>
                                <button type="button" onClick={() => { setArchivedDropdown((prev) => !prev) }} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700" aria-controls="dropdown-layouts" data-collapse-toggle="dropdown-layouts">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                                    </svg>
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap -rotate-0" sidebar-toggle-item="">Archived Insights</span>
                                    <svg sidebar-toggle-item="" className={`w-6 h-6 -rotate-90 ${!archivedDropdown ? "" : "-rotate-0"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                                <ul id="dropdown-layouts" className={`${archivedDropdown ? "" : "hidden"} py-2 space-y-2`}>
                                    {archivedInsights && archivedInsights.map((ins, key) =>
                                        <li key={key}>
                                            <Link
                                                href={`/archived-insights/${ins.id}`}
                                                className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                            >
                                                {(() => {
                                                    const date = new Date(ins.created_at);
                                                    const time = date.toLocaleString('en-GB', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false
                                                    });
                                                    const day = date.getDate().toString().padStart(2, '0');
                                                    const month = date.toLocaleString('en-GB', { month: 'short' });
                                                    const year = date.getFullYear();

                                                    // Ensure September is abbreviated as 'Sept'
                                                    const formattedMonth = month === 'Sep' ? 'Sept' : month;

                                                    return `${time} ${day} ${formattedMonth} ${year}`;
                                                })()}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                                </li>
                            )}
                        </ul>
                        <div className="pt-2 space-y-2">

                        </div>
                    </div>
                </div>
                <UpgradeToPro />
            </div>
        </aside>
    )
}

export default LeftNav;