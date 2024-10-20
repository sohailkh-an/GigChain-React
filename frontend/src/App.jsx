import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage/home";
import SignInPage from "./pages/Authentication/SignIn/signInForm";
import CurrentUserProfile from "./pages/Profile/currentUserProfile";
import UserProfile from "./pages/UserProfile/userProfile";
import Inbox from "./pages/Inbox/inboxChatProvider";
import CategoryGigResults from "./pages/CategoryGigResults/categoryGigResults";
import CUGigDetails from "./pages/cuGigDetails/cuGigDetails";
import RegisterationPage from "./pages/Authentication/Register/registerationForm";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";
import ListServices from "./pages/Service/ListServices/listServices";
import EditService from "./pages/Service/EditService/editService";
import ViewServiceDetails from "./pages/Service/ViewServiceDetails/viewServiceDetailsChatProvider";
import CreateService from "./pages/Service/CreateNewService/createNewService";
import Navigation from "../src/components/navigation/navigation";
import Footer from "../src/components/footer/footer";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isAuthPage = ["/signIn", "/register"].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navigation />}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={HomePage} />} />
        <Route path="/signIn" element={<PublicRoute element={SignInPage} />} />
        <Route
          path="/register"
          element={<PublicRoute element={RegisterationPage} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={CurrentUserProfile} />}
        />
        <Route path="/inbox" element={<ProtectedRoute element={Inbox} />} />
        <Route
          path="/create_service"
          element={<ProtectedRoute element={CreateService} />}
        />
        <Route
          path="/category/:mainCategory/:subCategory"
          element={<ProtectedRoute element={CategoryGigResults} />}
        />
        <Route
          path="/gig/:gigId/edit"
          element={<ProtectedRoute element={EditService} />}
        />
        <Route
          path="/services"
          element={<ProtectedRoute element={ListServices} />}
        />
        <Route
          path="/gig/:gigId/cu"
          element={<ProtectedRoute element={CUGigDetails} />}
        />
        <Route
          path="/gig/:gigId"
          element={<ProtectedRoute element={ViewServiceDetails} />}
        />
        <Route
          path="/user/:userId"
          element={<ProtectedRoute element={UserProfile} />}
        />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
