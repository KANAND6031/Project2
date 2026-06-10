import {
    useEffect,
    useState
} from "react";

import API
from "../services/api";

function AdminPage() {

    const [files,
        setFiles] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        fetchFiles();

    }, []);

    const fetchFiles =
        async () => {

            try {

                const res =
                    await API.get(
                        "/admin/files"
                    );

                setFiles(
                    res.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(
                    false
                );
            }
        };


    const deleteFile =
        async (fileName) => {

            const confirmDelete =
                window.confirm(
                    `Delete ${fileName}?`
                );

            if (
                !confirmDelete
            ) {
                return;
            }

            try {

                await API.delete(
                    `/admin/file/${fileName}`
                );

                fetchFiles();

            } catch (error) {

                console.log(error);
            }
        };


    const reindexFile =
        async (fileName) => {

            try {

                const res =
                    await API.post(
                        `/admin/reindex/${fileName}`
                    );

                alert(
                    res.data.message
                );

            } catch (error) {

                console.log(error);
            }
        };


    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="bg-white p-8 rounded-xl shadow-lg">

                <h1 className="text-4xl font-bold mb-6">

                    SOP Management Dashboard

                </h1>

                <div className="mb-6">

                    <h2 className="text-xl font-semibold">

                        Total SOPs:
                        {" "}
                        {files.length}

                    </h2>

                </div>

                {
                    loading ? (

                        <p>
                            Loading...
                        </p>

                    ) : (

                        <table className="w-full border">

                            <thead>

                                <tr className="bg-gray-200">

                                    <th className="p-3 border">
                                        File Name
                                    </th>

                                    <th className="p-3 border">
                                        Pages
                                    </th>

                                    <th className="p-3 border">
                                        Chunks
                                    </th>

                                    <th className="p-3 border">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    files.map(
                                        (
                                            file,
                                            index
                                        ) => (

                                            <tr
                                                key={
                                                    index
                                                }
                                            >

                                                <td className="border p-3">
                                                    {
                                                        file.fileName
                                                    }
                                                </td>

                                                <td className="border p-3">
                                                    {
                                                        file.pages
                                                    }
                                                </td>

                                                <td className="border p-3">
                                                    {
                                                        file.chunks
                                                    }
                                                </td>

                                                <td className="border p-3">

                                                    <button

                                                        onClick={() =>
                                                            reindexFile(
                                                                file.fileName
                                                            )
                                                        }

                                                        className="
                                                        bg-blue-500
                                                        text-white
                                                        px-3
                                                        py-1
                                                        rounded
                                                        mr-2
                                                        "
                                                    >

                                                        Reindex

                                                    </button>

                                                    <button

                                                        onClick={() =>
                                                            deleteFile(
                                                                file.fileName
                                                            )
                                                        }

                                                        className="
                                                        bg-red-500
                                                        text-white
                                                        px-3
                                                        py-1
                                                        rounded
                                                        "
                                                    >

                                                        Delete

                                                    </button>

                                                </td>

                                            </tr>
                                        )
                                    )
                                }

                            </tbody>

                        </table>
                    )
                }

            </div>

        </div>
    );
}

export default AdminPage;