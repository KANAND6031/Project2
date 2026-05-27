import { useState } from "react";
import API from "../services/api";

const UploadPage = () => {

    const [pdf, setPdf] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [progress, setProgress] = useState(0);

    const [pages, setPages] = useState(0);

    const [embeddingInfo, setEmbeddingInfo] =
        useState(null);


    const handleUpload = async () => {

        if (!pdf) {

            setMessage("Please select a PDF");

            return;
        }

        try {

            setLoading(true);

            setMessage("");

            setProgress(0);

            const formData = new FormData();

            formData.append("pdf", pdf);

            const response = await API.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },

                    onUploadProgress:
                        (progressEvent) => {

                            const percent =
                                Math.round(
                                    (
                                        progressEvent.loaded * 100
                                    ) /
                                    progressEvent.total
                                );

                            setProgress(percent);
                        },
                }
            );

            console.log(response.data);

            setMessage(response.data.message);

            setPages(response.data.pages);

            setEmbeddingInfo(
                response.data.sampleEmbedding
            );

        } catch (error) {

            console.log(error);

            setMessage("Upload failed");

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="bg-white p-10 rounded-2xl shadow-lg max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-center mb-6">
                    OpsMind AI
                </h1>

                <p className="text-gray-600 text-center mb-8">
                    Upload SOP PDF documents
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                        setPdf(e.target.files[0])
                    }
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                >
                    {
                        loading
                            ? "Uploading..."
                            : "Upload PDF"
                    }
                </button>

                {
                    progress > 0 && (

                        <div className="mt-4">

                            <div className="w-full bg-gray-300 rounded-full h-4">

                                <div
                                    className="bg-black h-4 rounded-full"
                                    style={{
                                        width:
                                            `${progress}%`,
                                    }}
                                />

                            </div>

                            <p className="text-center mt-2">
                                {progress}%
                            </p>

                        </div>
                    )
                }

                {
                    message && (

                        <p className="text-center mt-4 font-medium">
                            {message}
                        </p>
                    )
                }

                {
                    pages > 0 && (

                        <p className="mt-4 text-center">
                            Total Pages: {pages}
                        </p>
                    )
                }

                {
                    embeddingInfo && (

                        <div className="mt-8 bg-gray-100 p-5 rounded-xl">

                            <h2 className="text-2xl font-bold mb-4">
                                Sample Embedding
                            </h2>

                            <p className="mb-2">
                                <strong>Chunk:</strong>
                                {" "}
                                {embeddingInfo.chunkIndex}
                            </p>

                            <p className="mb-2">
                                <strong>Word Count:</strong>
                                {" "}
                                {embeddingInfo.wordCount}
                            </p>

                            <p className="mb-4">
                                <strong>
                                    Embedding Dimensions:
                                </strong>
                                {" "}
                                {
                                    embeddingInfo.embedding
                                        ?.length
                                }
                            </p>

                            <div className="bg-white p-4 rounded-lg max-h-[300px] overflow-y-auto text-sm">

                                <pre>
                                    {
                                        JSON.stringify(
                                            embeddingInfo.embedding?.slice(0, 50),
                                            null,
                                            2
                                        )
                                    }
                                </pre>

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default UploadPage;