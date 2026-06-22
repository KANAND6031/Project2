import { useState, useEffect } from "react";

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

    const [darkMode, setDarkMode] =
    useState(localStorage.getItem("theme")=== "dark");

    useEffect(() => {

        if (darkMode) {

            document.documentElement
                .classList.add("dark");

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            document.documentElement
                .classList.remove("dark");

            localStorage.setItem(
                "theme",
                "light"
            );
        }

    }, [darkMode]);

    return (

        <div
            className="
            min-h-screen
            flex
            "
        >

            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            <div
                className="
                flex-1
                p-6
                bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100
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