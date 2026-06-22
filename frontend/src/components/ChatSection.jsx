import { useState, useEffect, useRef } from "react";
import API from "../services/api";
import PDFModal from "./PDFModal";
function ChatSection() {

    const [selectedSource, setSelectedSource] = useState(null);
    const [query, setQuery] = useState("");

    const [messages, setMessages] = useState([]);

    const [loadingAnswer, setLoadingAnswer] =
        useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    const openCitation =
        (source) => {

            setSelectedSource(
                source
            );

        };

    const handleSearch = async () => {

        if (!query.trim()) return;

        const userMessage = {
            role: "user",
            content: query,
        };

        setMessages(prev => [
            ...prev,
            userMessage
        ]);

        setLoadingAnswer(true);

        try {

            const response =
                await API.post(
                    "/search",
                    {
                        query
                    }
                );

            const botMessage = {
                role: "assistant",
                content:
                    response.data.answer,
                sources:
                    response.data.sources || []
            };

            setMessages(prev => [
                ...prev,
                botMessage
            ]);

            setQuery("");

        } catch (error) {

            console.log(error);

            const errorMessage = {
                role: "assistant",
                content:
                    "Search failed. Please try again.",
                sources: []
            };

            setMessages(prev => [
                ...prev,
                errorMessage
            ]);

        } finally {

            setLoadingAnswer(false);
        }
    };

    return (

        <div className="p-6">

            <h2 className="
        text-3xl
        font-bold
        mb-5
        flex
        items-center
        gap-2
        ">
                🤖 AI Knowledge Assistant
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
                    messages.length === 0 && (

                        <div className="
                    flex
                    items-center
                    justify-center
                    h-full
                    text-gray-400
                    text-lg
                    ">

                            Ask a question about your uploaded SOP

                        </div>
                    )
                }

                {
                    messages.map(
                        (
                            msg,
                            index
                        ) => (

                            <div
                                key={index}
                                className={`mb-6 flex ${msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >

                                <div
                                    className={`max-w-[75%] p-4 rounded-xl ${msg.role === "user"
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl"
                                        : "bg-gradient-to-r from-slate-50 to-blue-50 border shadow-md"
                                        }`}
                                >

                                    <p className="whitespace-pre-wrap">
                                        {msg.content}
                                    </p>

                                    {
                                        msg.content !==
                                        "I don't know based on uploaded SOPs."

                                        &&

                                        msg.sources?.length > 0

                                        && (

                                            <div className="
                                        mt-4
                                        border-t
                                        pt-3
                                        text-sm
                                        ">

                                                <h4 className="
                                            font-bold
                                            text-blue-600
                                            mb-2
                                            ">
                                                    Sources
                                                </h4>

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
                                                                    File:
                                                                    {" "}
                                                                    {src.fileName}
                                                                </p>

                                                                <button

                                                                    onClick={() =>
                                                                        openCitation(
                                                                            src
                                                                        )
                                                                    }

                                                                    className="text-blue-600 underline font-medium"
                                                                >


                                                                    Page
                                                                    {src.pageNumber}

                                                                </button>

                                                                <p>
                                                                    <strong>
                                                                        Section:
                                                                    </strong>
                                                                    {" "}
                                                                    {src.section}
                                                                </p>

                                                                <p>
                                                                    Chunk:
                                                                    {" "}
                                                                    {src.chunk}
                                                                </p>

                                                                <p>
                                                                    Score:
                                                                    {" "}
                                                                    {src.score?.toFixed(4)}
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
                        w-3
                        h-3
                        bg-blue-500
                        rounded-full
                        animate-bounce
                        "></div>

                            <div className="
                        w-3
                        h-3
                        bg-blue-500
                        rounded-full
                        animate-bounce
                        "></div>

                            <div className="
                        w-3
                        h-3
                        bg-blue-500
                        rounded-full
                        animate-bounce
                        "></div>

                        </div>
                    )
                }

                <div ref={chatEndRef}></div>

            </div>

            <div className="
        flex
        gap-3
        mt-5
        ">

                <input
                    type="text"
                    value={query}
                    onChange={(e) =>
                        setQuery(
                            e.target.value
                        )
                    }
                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter"
                        ) {

                            handleSearch();
                        }
                    }}
                    placeholder="
                Ask a question about the SOP...
                "
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

{
selectedSource && (

<PDFModal
    page={
        selectedSource.pageNumber
    }
    snippet={
        selectedSource.snippet
    }
    section={
        selectedSource.section
    }
    onClose={() =>
        setSelectedSource(null)
    }
/>

)
}

        </div>
    );


}

export default ChatSection;
