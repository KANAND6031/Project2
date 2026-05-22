const UploadPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-[500px]">
                
                <h1 className="text-4xl font-bold text-center mb-6">
                    OpsMind AI
                </h1>

                <p className="text-gray-600 text-center mb-8">
                    Upload SOP PDF documents
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    className="w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                >
                    Upload PDF
                </button>

            </div>
        </div>
    );
};

export default UploadPage;