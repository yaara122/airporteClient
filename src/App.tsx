import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { RequestsProvider } from "./store/RequestsProvider";
import { UserProvider } from "./store/userProvider";
import Header from "./components/UI/Header";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SginUpPage";
import RequestsPage from "./pages/RequestsPage";
import CreateRequestPage from "./pages/CreateRequestPage";
import OpenRequestsPage from "./pages/OpenRequestsPage";
import RequestsHistoryPage from "./pages/RequestsHistoryPage";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <RequestsProvider>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/createRequest" element={<CreateRequestPage />} />
            <Route path="/userData" element={<RequestsPage />} />
            <Route path="/openRequests" element={<OpenRequestsPage />} />
            <Route path="/requestsHistory" element={<RequestsHistoryPage />} />
            <Route path="*" element={<Navigate to="/signup" replace />} />
            {/* maybe insdet create a home page? a fallout page cause might not need to log in if in serch for a different page.. */}
          </Routes>
        </RequestsProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
