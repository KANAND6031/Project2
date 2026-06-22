import { useState } from "react";
import API from "../services/api";
import StatsBar from "./StatsBar";

function UploadSection() {

    const [pdf, setPdf] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [progress, setProgress] = useState(0);

    const [pages, setPages] = useState(0);

    const [totalChunks, setTotalChunks] =
        useState(0);

    const [embeddingInfo, setEmbeddingInfo] =
        useState(null);

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

            setTotalChunks(
                response.data.totalChunks || 0
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

    return (

        <div className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-blue-50
        to-indigo-100
        p-6
        ">

            <div className="
            bg-white
            p-10
            rounded-3xl
            shadow-2xl
            border
            border-gray-200
            ">

                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    OpsMind AI
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Enterprise SOP Intelligence Platform
                </p>

                <div className="
                bg-white
                rounded-2xl
                shadow-xl
                p-8
                mb-8
                border
                ">

                    <h2 className="
                    text-2xl
                    font-bold
                    mb-4
                    text-gray-800
                    ">
                        Upload SOP Document
                    </h2>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setPdf(
                                e.target.files[0]
                            )
                        }
                        className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        "
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
                        "
                    >

                        {
                            loading ? (

                                <div className="flex items-center justify-center gap-2">

                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>

                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>

                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>

                                </div>

                            ) : (

                                "Upload PDF"

                            )
                        }

                    </button>

                </div>

                {
                    progress > 0 && (

                        <div className="mt-5">

                            <div className="
                            w-full
                            bg-gray-300
                            h-4
                            rounded-full
                            ">

                                <div
                                    className="
                                    bg-gradient-to-r
                                    from-blue-500
                                    to-indigo-600
                                    h-4
                                    rounded-full
                                    "
                                    style={{
                                        width:
                                            `${progress}%`
                                    }}
                                />

                            </div>

                            <p className="
                            text-center
                            mt-2
                            ">
                                {progress}%
                            </p>

                        </div>
                    )
                }

                {
                    message && (

                        <p className="
                        text-center
                        mt-4
                        font-medium
                        ">
                            {message}
                        </p>
                    )
                }

                {
                    pages > 0 && (

                        <p className="
                        text-center
                        mt-2
                        ">
                            Total Pages:
                            {" "}
                            {pages}
                        </p>
                    )
                }

                <StatsBar
                    pages={pages}
                    chunks={totalChunks}
                    dimensions={
                        embeddingInfo
                            ?.embedding
                            ?.length || 384
                    }
                />

            </div>

        </div>
    );
}

export default UploadSection;