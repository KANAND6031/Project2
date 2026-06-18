import { useState } from "react";

import Sidebar
from "../components/Sidebar";

import UploadSection
from "../components/UploadSection";

import ChatSection
from "../components/ChatSection";

import AdminPage
from "./AdminPage";

function Dashboard() {

    const [
        activeTab,
        setActiveTab
    ] =
    useState("chat");

    return (

        <div
            className="
            min-h-screen
            flex
            "
        >

            <Sidebar
                activeTab={
                    activeTab
                }
                setActiveTab={
                    setActiveTab
                }
            />

            <div
                className="
                flex-1
                p-6
                bg-slate-100
                "
            >

                {
                    activeTab ===
                    "chat"

                    &&

                    <ChatSection />
                }

                {
                    activeTab ===
                    "upload"

                    &&

                    <UploadSection />
                }

                {
                    activeTab ===
                    "admin"

                    &&

                    <AdminPage />
                }

            </div>

        </div>
    );
}

export default Dashboard;