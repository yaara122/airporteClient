import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RequestsProvider } from "./store/RequestsProvider";
import { UserProvider } from "./store/userProvider";
import Header from "./components/UI/Header";
import ProtectedRoute from "./components/ProtectedRoute ";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SginUpPage";
import RequestsPage from "./pages/RequestsPage";
import CreateRequestPage from "./pages/CreateRequestPage";
import OpenRequestsPage from "./pages/OpenRequestsPage";
import RequestsHistoryPage from "./pages/RequestsHistoryPage";
import PageNotFound from "./pages/PageNotFount";

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
            <Route path="/openRequests" element={<ProtectedRoute><OpenRequestsPage /></ProtectedRoute>} />
            <Route path="/requestsHistory" element={<ProtectedRoute><RequestsHistoryPage  /></ProtectedRoute>} />           
            <Route path="*" element={<PageNotFound></PageNotFound>} />
            {/* maybe insdet create a 404? a fallout page cause might not need to log in if in serch for a different page.. */}
          </Routes>
        </RequestsProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
