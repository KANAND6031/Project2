const StatsBar = ({
    pages,
    chunks,
    dimensions
}) => {

    return (

        <div
            className="
            grid
            grid-cols-1
            md:grid-cols-4
            gap-4
            my-8
            "
        >

            <div
                className="
                bg-white
                shadow-lg
                rounded-xl
                p-5
                text-center
                "
            >
                <p className="text-sm text-gray-500">
                    Pages
                </p>

                <h3 className="text-3xl font-bold">
                    {pages || 0}
                </h3>
            </div>

            <div
                className="
                bg-white
                shadow-lg
                rounded-xl
                p-5
                text-center
                "
            >
                <p className="text-sm text-gray-500">
                    Chunks
                </p>

                <h3 className="text-3xl font-bold">
                    {chunks || 0}
                </h3>
            </div>

            <div
                className="
                bg-white
                shadow-lg
                rounded-xl
                p-5
                text-center
                "
            >
                <p className="text-sm text-gray-500">
                    Embeddings
                </p>

                <h3 className="text-3xl font-bold">
                    {dimensions || 384}
                </h3>
            </div>

            <div
                className="
                bg-white
                shadow-lg
                rounded-xl
                p-5
                text-center
                "
            >
                <p className="text-sm text-gray-500">
                    AI Model
                </p>

                <h3 className="text-xl font-bold">
                    Gemini 2.5
                </h3>
            </div>

        </div>
    );
};

export default StatsBar;