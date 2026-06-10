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

    useEffect(() => {

        fetchFiles();

    }, []);

    const fetchFiles =
        async () => {

            const res =
                await API.get(
                    "/admin/files"
                );

            setFiles(
                res.data
            );
        };

    const deleteFile =
        async (fileName) => {

            if (
                !window.confirm(
                    "Delete SOP?"
                )
            ) {
                return;
            }

            await API.delete(
                `/admin/file/${fileName}`
            );

            fetchFiles();
        };

    return (

        <div className="p-10">

            <h1 className="text-4xl font-bold mb-6">

                Knowledge Base

            </h1>

            <table className="w-full border">

                <thead>

                    <tr>

                        <th>File</th>

                        <th>Pages</th>

                        <th>Chunks</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        files.map(
                            (file) => (

                                <tr
                                    key={
                                        file._id
                                    }
                                >

                                    <td>
                                        {
                                            file._id
                                        }
                                    </td>

                                    <td>
                                        {
                                            file.pages
                                        }
                                    </td>

                                    <td>
                                        {
                                            file.chunks
                                        }
                                    </td>

                                    <td>

                                        <button

                                            onClick={() =>
                                                deleteFile(
                                                    file._id
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

        </div>
    );
}

export default AdminPage;