const Sidebar = ({
    activeTab,
    setActiveTab
}) => {

    const menuItems = [
        {
            id: "chat",
            label: "💬 Chat"
        },
        {
            id: "upload",
            label: "📄 Upload SOP"
        },
        {
            id: "admin",
            label: "⚙ Admin"
        }
    ];

    return (

        <div
            className="
            w-72
            bg-slate-950
            text-white
            p-6
            flex
            flex-col
            "
        >

            <h1
                className="
                text-3xl
                font-bold
                mb-10
                "
            >
                OpsMind AI
            </h1>

            {
                menuItems.map(
                    (item) => (

                        <button
                            key={item.id}
                            onClick={() =>
                                setActiveTab(
                                    item.id
                                )
                            }
                            className={`
                            p-4
                            rounded-xl
                            mb-3
                            text-left

                            ${
                                activeTab ===
                                item.id

                                ? "bg-indigo-600"

                                : "hover:bg-slate-800"
                            }
                            `}
                        >
                            {item.label}
                        </button>
                    )
                )
            }

            <div className="mt-auto">

                <div
                    className="
                    bg-green-900
                    text-green-300
                    p-4
                    rounded-xl
                    "
                >
                    AI Powered RAG
                </div>

            </div>

        </div>
    );
};

export default Sidebar;