import AdminPage from "./pages/AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UploadPage from "./pages/UploadPage";
import ChatPage from "./pages/ChatPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UploadPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/admin" element={<AdminPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;