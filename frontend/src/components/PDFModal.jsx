function PDFModal({
    snippet,
    section,
    page,
    onClose
}) {

    return (

        <div className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
        ">

            <div className="
            bg-white
            p-6
            rounded-xl
            max-w-3xl
            w-full
            ">

                <button
                    onClick={onClose}
                    className="
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded
                    mb-4
                    "
                >
                    Close
                </button>

                <h2 className="
                text-2xl
                font-bold
                mb-2
                ">
                    {section}
                </h2>

                <p className="
                text-gray-500
                mb-4
                ">
                    Page {page}
                </p>

                <div className="
                bg-gray-100
                p-4
                rounded-lg
                whitespace-pre-wrap
                ">
                    {snippet}
                </div>

            </div>

        </div>
    );
}

export default PDFModal;