import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/home";
import SignInPage from "./pages/SignIn/signInForm";
import CurrentUserProfile from "./pages/Profile/currentUserProfile";
import UserProfile from "./pages/UserProfile/userProfile";
import Inbox from "./pages/Inbox/inboxChatProvider";
import CreateGig from "./pages/CreateGig/createGig";
import CategoryGigResults from "./pages/CategoryGigResults/categoryGigResults";
import ViewGig from "./pages/ShowGigs/showGigs";
import CUGigDetails from "./pages/cuGigDetails/cuGigDetails";
import RegisterationPage from "./pages/Register/registerationForm";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";
import EditGig from "./pages/EditGig/editGig";
import NewGigDetails from "./pages/newGigDetails/newGigDetailsChatProvider";
import ProposalsSection from "./pages/Proposals/proposals";
import Navigation from "../src/components/navigation/navigation";
import Footer from "../src/components/footer/footer";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={HomePage} />} />
          <Route
            path="/signIn"
            element={<PublicRoute element={SignInPage} />}
          />
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
            path="/create_gig"
            element={<ProtectedRoute element={CreateGig} />}
          />
          <Route
            path="/category/:mainCategory/:subCategory"
            element={<ProtectedRoute element={CategoryGigResults} />}
          />
          <Route
            path="/gig/:gigId/edit"
            element={<ProtectedRoute element={EditGig} />}
          />
          <Route path="/gigs" element={<ProtectedRoute element={ViewGig} />} />
          <Route
            path="/gig/:gigId/cu"
            element={<ProtectedRoute element={CUGigDetails} />}
          />
          <Route
            path="/gig/:gigId"
            element={<ProtectedRoute element={NewGigDetails} />}
          />
          <Route
            path="/gig/newGigDetails"
            element={<ProtectedRoute element={NewGigDetails} />}
          />
          <Route
            path="/proposals"
            element={<ProtectedRoute element={ProposalsSection} />}
          />
          <Route
            path="/user/:userId"
            element={<ProtectedRoute element={UserProfile} />}
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
