import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { RedirectAPI } from '../api/LinkService.js';

const Redirect = () => {
    const { id } = useParams();
    const executed = useRef(false);

    useEffect(() => {
        if (executed.current) return; // prevents re-run
        executed.current = true;

        const handleRedirect = async () => {
            try {
                const response = await RedirectAPI(id);
                const originalUrl = response.data.original_url;
                window.location.href = originalUrl;
            } catch (error) {
                console.log(error);
                window.location.href = "/404";
            }
        };

        handleRedirect();
    }, [id]);

    return (
        <div className="flex justify-center items-center h-screen">
            <h1>Redirecting...</h1>
        </div>
    );
};

export default Redirect;
