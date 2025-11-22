import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { creatrShortUrl } from '../api/LinkService.js'

const CreateShorUrlForm = () => {
    const navigate = useNavigate()
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [customCode, setCustomCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // const { data } = await axios.post("http://localhost:3000/api/links", {
            //     url,
            //     customCode
            // });

            const { data } = await creatrShortUrl({ url, customCode })

            // console.log("Data >", data);
            setUrl("")
            setCustomCode("")
            setShortUrl(data.shortUrl);

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleSeeList = () => {
        setShortUrl('')
        setCustomCode('')
        navigate('/')
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full mt-10 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full">
                <h1 className="text-2xl font-bold text-center mb-4">URL Shortener</h1>

                {/* FORM */}
                <form className="space-y-4 mb-5" onSubmit={handleSubmit}>
                    <div className="flex gap-3">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter a long URL..."
                            className="w-[70%] px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                            required
                        />
                        <input
                            type="text"
                            value={customCode}
                            onChange={(e) => setCustomCode(e.target.value)}
                            placeholder="Custom code (optional)"
                            className="w-[30%] px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-fit px-6 mt-5 py-2 rounded-lg transition
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                    >
                        {loading ? "Shortening..." : "Shorten URL"}
                    </button>

                    <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={handleSeeList}>see list</button>
                </form>

                {/* RESULT + COPY BUTTON */}
                {shortUrl && (
                    <div className="mt-6">
                        <h2 className="text-base font-semibold mb-2">Your Shortened URL</h2>
                        <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-between">
                            
                            <a href={shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                {shortUrl}
                            </a>

                            <button
                                onClick={handleCopy}
                                className={`px-3 py-1 cursor-pointer rounded-lg text-white transition 
                                    ${copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-900"}`}
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateShorUrlForm;
