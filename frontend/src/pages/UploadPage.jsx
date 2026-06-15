import { useState,useEffect,useRef } from "react";
import API from "../services/api";

const UploadPage = () => {

    const [pdf, setPdf] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [progress, setProgress] = useState(0);

    const [pages, setPages] = useState(0);

    const [embeddingInfo, setEmbeddingInfo] =
        useState(null);

    const [query, setQuery] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const [loadingAnswer,
        setLoadingAnswer] =
        useState(false);

    const chatEndRef =
    useRef(null);

useEffect(() => {

    chatEndRef.current
        ?.scrollIntoView({
            behavior: "smooth"
        });

}, [messages]);

    // -------------------------
    // Upload PDF
    // -------------------------

    const handleUpload = async () => {

        if (!pdf) {

            setMessage(
                "Please select a PDF"
            );

            return;
        }

        try {

            setLoading(true);

            setMessage("");

            setProgress(0);

            const formData =
                new FormData();

            formData.append(
                "pdf",
                pdf
            );

            const response =
                await API.post(
                    "/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },

                        onUploadProgress:
                            (
                                progressEvent
                            ) => {

                                const percent =
                                    Math.round(
                                        (
                                            progressEvent.loaded *
                                            100
                                        ) /
                                        progressEvent.total
                                    );

                                setProgress(
                                    percent
                                );
                            },
                    }
                );

            setMessage(
                response.data.message
            );

            setPages(
                response.data.pages
            );

            setEmbeddingInfo(
                response.data.sampleEmbedding
            );

        } catch (error) {

            console.log(error);

            setMessage(
                "Upload failed"
            );

        } finally {

            setLoading(false);
        }
    };

    // -------------------------
    // Ask Question
    // -------------------------

    const handleSearch = async () => {

        if (!query.trim())
            return;

        const userMessage = {

            role: "user",

            content: query,
        };

        setMessages(
            (prev) => [
                ...prev,
                userMessage,
            ]
        );

        setLoadingAnswer(
            true
        );

        try {

            const response =
                await API.post(
                    "/search",
                    {
                        query,
                    }
                );

            const botMessage = {

                role:
                    "assistant",

                content:
                    response.data
                        .answer,

                sources:
                    response.data
                        .sources ||
                    [],
            };

            setMessages(
                (prev) => [
                    ...prev,
                    botMessage,
                ]
            );

            setQuery("");

        } catch (error) {

            console.log(error);

            const errorMessage = {

                role:
                    "assistant",

                content:
                    "Search failed. Please try again.",

                sources: [],
            };

            setMessages(
                (prev) => [
                    ...prev,
                    errorMessage,
                ]
            );

        } finally {

            setLoadingAnswer(
                false
            );
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="bg-white p-10 rounded-2xl shadow-lg max-w-6xl mx-auto">

                {/* Header */}

                <h1 className="text-5xl font-bold text-center mb-6">
                    OpsMind AI
                </h1>

                <p className="text-gray-600 text-center mb-8">
                    Upload SOP PDF documents
                </p>

                {/* Upload Section */}

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                        setPdf(
                            e.target
                                .files[0]
                        )
                    }
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    onClick={
                        handleUpload
                    }
                    disabled={
                        loading
                    }
                    className="w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                >
                    {
                        loading
                            ? "Uploading..."
                            : "Upload PDF"
                    }
                </button>

                {/* Progress */}

                {
                    progress > 0 && (

                        <div className="mt-5">

                            <div className="w-full bg-gray-300 h-4 rounded-full">

                                <div
                                    className="bg-black h-4 rounded-full"
                                    style={{
                                        width:
                                            `${progress}%`,
                                    }}
                                />

                            </div>

                            <p className="text-center mt-2">
                                {
                                    progress
                                }
                                %
                            </p>

                        </div>
                    )
                }

                {/* Upload Status */}

                {
                    message && (

                        <p className="text-center mt-4 font-medium">
                            {
                                message
                            }
                        </p>
                    )
                }

                {
                    pages > 0 && (

                        <p className="text-center mt-2">
                            Total Pages:
                            {" "}
                            {pages}
                        </p>
                    )
                }

                {/* Embedding Info */}

                {
                    embeddingInfo && (

                        <div className="mt-8 bg-gray-100 p-5 rounded-xl">

                            <h2 className="text-2xl font-bold mb-4">
                                Sample Embedding
                            </h2>

                            <p>
                                <strong>
                                    Chunk:
                                </strong>
                                {" "}
                                {
                                    embeddingInfo.chunkIndex
                                }
                            </p>

                            <p>
                                <strong>
                                    Character Count:
                                </strong>
                                {" "}
                                {
                                    embeddingInfo.charCount
                                }
                            </p>

                            <p>
                                <strong>
                                    Embedding Dimensions:
                                </strong>
                                {" "}
                                {
                                    embeddingInfo.embedding
                                        ?.length
                                }
                            </p>

                        </div>
                    )
                }

                {/* Chat Section */}

                <div className="mt-10">

                    <h2 className="text-3xl font-bold mb-5">
                        Chat with SOP
                    </h2>

                    <div className="bg-gray-50 border rounded-xl h-[500px] overflow-y-auto p-5">

                        {
                            messages.map(
                                (
                                    msg,
                                    index
                                ) => (

                                    <div
                                        key={
                                            index
                                        }
                                        className={`mb-6 flex ${
                                            msg.role ===
                                            "user"
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >

                                        <div
                                            className={`max-w-[75%] p-4 rounded-xl ${
                                                msg.role ===
                                                "user"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-green-100 text-black"
                                            }`}
                                        >

                                            <p className="whitespace-pre-wrap">
                                                {
                                                    msg.content
                                                }
                                            </p>

                                            {
    msg.content !==
    "I don't know based on uploaded SOPs."

    &&

    msg.sources?.length > 0

    && (

        <div className="mt-4 border-t pt-3 text-sm">

            <strong>
                Sources
            </strong>

            {
                msg.sources.map(
                    (
                        src,
                        i
                    ) => (

                        <div
                            key={i}
                            className="mt-2"
                        >

                            <p>
                                File: {src.fileName}
                            </p>

                            <p>
                                Page: {src.pageNumber}
                            </p>

                            <p>
                                <strong>
                                    Section:
                                </strong>{" "}
                                {src.section}
                            </p>

                            <p>
                                Chunk: {src.chunk}
                            </p>

                            <p>
                                Score:{" "}
                                {src.score?.toFixed(
                                    4
                                )}
                            </p>

                        </div>
                    )
                )
            }

        </div>
    )
}

                                        </div>

                                    </div>
                                )
                            )
                        }

                        {
                            loadingAnswer && (

                                <div className="flex justify-start">

                                    <div className="bg-gray-200 p-4 rounded-xl">

                                        Thinking...

                                    </div>

                                </div>
                            )
                        }
                        <div ref={chatEndRef}></div>

                    </div>

                    {/* Input */}

                    <div className="flex gap-3 mt-5">

                        <input
                            type="text"
                            value={
                                query
                            }
                            onChange={(e) =>
                                setQuery(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                        }}
                            placeholder="Ask a question about the SOP..."
                            className="flex-1 border p-3 rounded-lg"
                        />

                        <button
                            onClick={
                                handleSearch
                            }
                            className="bg-blue-600 text-white px-8 rounded-lg"
                        >
                            Send
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UploadPage;




/**/ 