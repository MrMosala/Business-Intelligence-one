import React, { useState } from 'react'
import { CircleLoader } from 'react-spinners'

function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="relative">
                <CircleLoader color="#d84315" className='text-primary-800' />
                <h6 className='text-primary-800'>Loading...</h6>
            </div>
        </div>
    )
}

const useLoader = () => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => {
        setLoading(true);
    };

    const hideLoader = () => {
        setLoading(false);
    };

    const Loader = () => {
        if (loading) {
            return <Loading />;
        }
        return null;
    };

    return { loading, showLoader, hideLoader, Loader };
}
export { useLoader }
export default Loading