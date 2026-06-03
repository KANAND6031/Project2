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

const [query, setQuery] =
    useState("");

const [results, setResults] =
    useState([]);

const [answer, setAnswer] = useState("");


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


const handleSearch = async () => {

    try {

        const response =
            await API.post(
                "/search",
                {
                    query,
                }
            );

        setAnswer(
    response.data.answer
);

setResults(
    response.data.sources
);

    } catch (error) {

        console.log(error);
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

                        <p>
                            <strong>Chunk:</strong>
                            {" "}
                            {embeddingInfo.chunkIndex}
                        </p>

                        <p>
                            <strong>Character Count:</strong>
                            {" "}
                            {embeddingInfo.charCount}
                        </p>

                        <p>
                            <strong>
                                Embedding Dimensions:
                            </strong>
                            {" "}
                            {
                                embeddingInfo.embedding?.length
                            }
                        </p>

                    </div>
                )
            }

            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-4">
                    Ask Questions
                </h2>

                <input
                    type="text"
                    value={query}
                    onChange={(e) =>
                        setQuery(
                            e.target.value
                        )
                    }
                    placeholder="Ask about the document..."
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    onClick={handleSearch}
                    className="w-full mt-3 bg-blue-600 text-white py-3 rounded-lg"
                >
                    Search
                </button>

            </div>

            {
    answer && (

        <div className="mt-8">

            <h2 className="text-2xl font-bold mb-4">
                Answer
            </h2>

            <div className="bg-green-100 p-5 rounded-lg">

                <p className="whitespace-pre-wrap">
                    {answer}
                </p>

            </div>

        </div>
    )
}

//...

{
    results.length > 0 && (

        <div className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
                Sources
            </h2>

            {
                results.map(
                    (
                        item,
                        index
                    ) => (

                        <div
                            key={index}
                            className="bg-gray-100 p-4 rounded-lg mb-4"
                        >

                            <p>
                                <strong>
                                    File:
                                </strong>
                                {" "}
                                {
                                    item.fileName ||
                                    "Unknown"
                                }
                            </p>

                            <p>
                                <strong>
                                    Page:
                                </strong>
                                {" "}
                                {
                                    item.pageNumber ||
                                    "N/A"
                                }
                            </p>

                            <p>
                                <strong>
                                    Section:
                                </strong>
                                {" "}
                                {
                                    item.section ||
                                    "N/A"
                                }
                            </p>

                            <p>
                                <strong>
                                    Chunk:
                                </strong>
                                {" "}
                                {
                                    item.chunk
                                }
                            </p>

                            <p>
                                <strong>
                                    Score:
                                </strong>
                                {" "}
                                {
                                    item.score?.toFixed(4)
                                }
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
);


};

export default UploadPage;
