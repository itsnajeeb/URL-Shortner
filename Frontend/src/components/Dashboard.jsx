import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteLink, getAllLinks } from '../api/LinkService.js'

const Dashboard = () => {
    const navigate = useNavigate()
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("")

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data } = await getAllLinks()
            setLinks(data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log(filter);

    const filteredLinks = links.filter(link => (
        link.short_code?.toLowerCase().includes(filter.toLowerCase()) ||
        link.original_url?.toLowerCase().includes(filter.toLowerCase())
    )

    );


    const deleteHandler = async (code) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${code}"?`);

        if (!confirmDelete) return; // user canceled

        setIsLoading(true);

        try {
            // const { data } = await axios.delete(`${URL}/api/code/${code}`);
            const { data } = await deleteLink(code);
            console.log("Deleted >", data);

            fetchData();  // reload links
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to delete link");
        } finally {
            setIsLoading(false);
        }
    };

    const viewDetails = (code) => {
        navigate(`/code/:${code}`)
    }


    return (
        <div className='mx-20 my-10'>
            <div className='my-4 flex justify-between'>
                <input type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder='Search by url or code...'
                    className='border py-2 px-4 rounded-md w-[30%] outline-0'
                />
                <button className='bg-green-500 px-8 py-1 text-base font-semibold text-white rounded-md cursor-pointer' onClick={() => navigate('/add')}>Create New Short URL</button>

            </div>
            <table className='table w-full text-center border border-collapse '>
                <thead className='bg-gray-200 '>
                    <tr>
                        <th className='py-2'>Short Code</th>
                        <th className='py-2 '>Target URL</th>
                        <th className='py-2'>Total Clicks</th>
                        <th className='py-2'>Last Clicks</th>
                        <th className='py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? (
                            <tr >
                                <td colSpan={5} className='border py-2'>Loading...</td>
                            </tr>
                        ) : (
                            filteredLinks.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className='border py-2'>No Links found</td>
                                </tr>
                            ) :

                                filteredLinks.map((link, idx) =>
                                (
                                    <tr className=' ' key={idx}>

                                        <td className='border py-2 '>{link.short_code}</td>
                                        <td className='border py-2 max-w-[250px] overflow-hidden px-5'><a target='blank'
                                            href={link?.original_url} className='text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis'>{link.original_url}</a></td>


                                        <td className='border py-2 '>{link.clicks}</td>
                                        <td className='border py-2 '>  {link.lastClickedAt ? new Date(link.lastClickedAt).toLocaleString() : "Not Click yet"}
                                        </td>

                                        <td className='border py-2 space-x-5'>

                                            <button className='bg-red-500 px-8 py-1 text-base font-semibold text-white rounded-md cursor-pointer' onClick={() => deleteHandler(link?.short_code)}>Delete</button>

                                            <button className='bg-yellow-400 text-black px-8 py-1 text-base font-semibold rounded-md cursor-pointer' onClick={() => viewDetails(link?.short_code)}>View Details</button>
                                        </td>
                                    </tr>

                                )))}

                </tbody>
            </table>
        </div >
    )
}

export default Dashboard