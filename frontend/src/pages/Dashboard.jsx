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

                <div className={activeTab === "chat" ? "block" : "hidden"}>
    <ChatSection />
</div>

<div className={activeTab === "upload" ? "block" : "hidden"}>
    <UploadSection />
</div>

<div className={activeTab === "admin" ? "block" : "hidden"}>
    <AdminPage />
</div>

            </div>

        </div>
    );
}

export default Dashboard;