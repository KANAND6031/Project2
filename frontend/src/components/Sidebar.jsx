const Sidebar = ({
    activeTab,
    setActiveTab,
    darkMode,
    setDarkMode
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
                            className={`group flex items-center gap-3 w-full p-4 rounded-xl transition-all duration-300 cursor-pointer

                                ${activeTab === item.id
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl"
                                    : "hover:bg-indigo-600 hover:translate-x-2 hover:shadow-lg"
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