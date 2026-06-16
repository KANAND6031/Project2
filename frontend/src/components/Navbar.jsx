import { Link } from "react-router-dom";

const Navbar = () => {

    return (

        <nav
            className="
            bg-white
            shadow-md
            rounded-2xl
            px-8
            py-4
            mb-8
            flex
            justify-between
            items-center
            "
        >

            <h1
                className="
                text-2xl
                font-bold
                bg-gradient-to-r
                from-blue-600
                to-indigo-700
                bg-clip-text
                text-transparent
                "
            >
                OpsMind AI
            </h1>

            <div className="flex gap-4">

                <Link
                    to="/"
                    className="
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-gray-100
                    "
                >
                    Chat
                </Link>

                <Link
                    to="/admin"
                    className="
                    px-4
                    py-2
                    rounded-lg
                    bg-blue-600
                    text-white
                    "
                >
                    Admin
                </Link>

            </div>

        </nav>
    );
};

export default Navbar;