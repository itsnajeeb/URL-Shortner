import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewDetails = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);  // <-- array
    const { code } = useParams();
    const URL = "http://localhost:3000";

    const fetchData = async () => {
        try {
            const res = await axios.get(`${URL}/api/code/${code}`);
            setData(res.data?.data || []);       // <-- always an array
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (data.length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-600">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl w-full flex justify-center items-center flex-col">
                <h1 className="text-2xl font-bold text-center mb-4">URL Details</h1>

                <div className="flex gap-10">
                    {data.map((urlInfo, idx) => (
                        <div key={idx} className='flex gap-10'>
                            <div className='flex flex-col gap-2 font-semibold'>
                                <h3>Original URL:</h3>
                                <h3>Short URL:</h3>
                                <h3>Short Code:</h3>
                                <h3>Total Clicks:</h3>
                                <h3>Last Click:</h3>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <h3 className='max-w-[400px] whitespace-nowrap overflow-hidden text-ellipsis'>
                                    <a
                                        href={urlInfo.original_url}
                                        className='text-blue-500 break-all'
                                        target='_blank'
                                    >
                                        {urlInfo.original_url}
                                    </a>
                                </h3>

                                <h3>
                                    <a
                                        href={`${URL}/${urlInfo.short_code}`}
                                        className='text-blue-500'
                                        target='_blank'
                                    >
                                        {URL}/{urlInfo.short_code}
                                    </a>
                                </h3>

                                <h3>{urlInfo.short_code}</h3>
                                <h3 className='font-semibold'>{urlInfo.clicks}</h3>
                                <h3>{new Date(urlInfo.lastClickedAt).toLocaleString()}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => navigate('/')}
                    className='mt-5 text-blue-500 border-b-2 cursor-pointer'
                >
                    Back to list
                </button>
            </div>
        </div>
    );
};

export default ViewDetails;
