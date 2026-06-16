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

        <div className="
min-h-screen
bg-gradient-to-br
from-slate-50
via-blue-50
to-indigo-100
p-6
md:p-10
">

            <div className="
bg-white
p-10
rounded-3xl
shadow-2xl
max-w-7xl
mx-auto
border
border-gray-200
">

                {/* Header */}

                <div className="text-center mb-10">

    <h1 className="
    text-6xl
    font-extrabold
    bg-gradient-to-r
    from-blue-600
    to-indigo-700
    bg-clip-text
    text-transparent
    ">
        OpsMind AI
    </h1>

    <p className="
    text-gray-600
    mt-3
    text-lg
    ">
        Enterprise SOP Knowledge Assistant
    </p>

    <div className="
    inline-flex
    items-center
    gap-2
    bg-green-100
    text-green-700
    px-4
    py-2
    rounded-full
    font-medium
    mt-4
    ">
        ● AI Powered RAG System
    </div>

</div>

                {/* Upload Section */}
                <div className="
bg-white
rounded-2xl
shadow-xl
p-8
mb-8
border
">
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
                    className="
w-full
mt-5
bg-gradient-to-r
from-blue-600
to-indigo-700
text-white
py-4
rounded-xl
font-semibold
shadow-lg
hover:scale-[1.01]
transition
duration-300
"
                >
                    {
                        loading
                            ? "Uploading..."
                            : "Upload PDF"
                    }
                </button>
                </div>
                {/* Progress */}

                {
                    progress > 0 && (

                        <div className="mt-5">

                            <div className="w-full bg-gray-300 h-4 rounded-full">

                                <div
                                    className="
bg-gradient-to-r
from-blue-500
to-indigo-600
h-4
rounded-full
transition-all
duration-500
"
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

                <div className="
grid
grid-cols-1
md:grid-cols-3
gap-4
mt-8
">

<div className="
bg-white
shadow-lg
rounded-xl
p-5
text-center
">
<h3 className="font-bold">
Pages
</h3>
<p className="text-3xl">
{pages}
</p>
</div>

<div className="
bg-white
shadow-lg
rounded-xl
p-5
text-center
">
<h3 className="font-bold">
Chunk Size
</h3>
<p className="text-3xl">
1000
</p>
</div>

<div className="
bg-white
shadow-lg
rounded-xl
p-5
text-center
">
<h3 className="font-bold">
Embedding Dimensions
</h3>
<p className="text-3xl">
384
</p>
</div>

</div>

                {/* Chat Section */}

                <div className="mt-10">

                    <h2 className="text-3xl font-bold mb-5">
                        Chat with SOP
                    </h2>

                    <div className="
bg-white
border
rounded-2xl
shadow-xl
h-[600px]
overflow-y-auto
p-6
">

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
                                                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
                                                    : "bg-white border shadow-md text-black"
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
                            className="
mt-3
bg-gray-50
p-3
rounded-lg
border
"
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

                                <div className="flex gap-2">

<div className="
w-3 h-3
bg-blue-500
rounded-full
animate-bounce
"></div>

<div className="
w-3 h-3
bg-blue-500
rounded-full
animate-bounce
"></div>

<div className="
w-3 h-3
bg-blue-500
rounded-full
animate-bounce
"></div>

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
                            className="
flex-1
border
border-gray-300
p-4
rounded-xl
shadow-sm
focus:ring-2
focus:ring-blue-500
focus:outline-none
"
                        />

                        <button
                            onClick={
                                handleSearch
                            }
                            className="
bg-gradient-to-r
from-blue-600
to-indigo-700
text-white
px-8
rounded-xl
shadow-lg
hover:scale-105
transition
duration-300
"
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