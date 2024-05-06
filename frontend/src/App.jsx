import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/home";
import SignInPage from "./pages/SignIn/signInForm";
import Profile from "./pages/Profile/profile";
import CreateGig from "./pages/CreateGig/createGig";
import ViewGig from "./pages/ShowGigs/showGigs";
import GigDetails from "./pages/GigDetails/gigDetails";
import RegisterationPage from "./pages/Register/registerationForm";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={HomePage} />} />
          <Route path="/signIn" element={<PublicRoute element= {SignInPage} />} />
          <Route path="/register" element={<PublicRoute element={RegisterationPage} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile}/>}/>
          <Route path="/create_gig" element={<ProtectedRoute element={CreateGig}/>}/>
          <Route path="/gigs" element={<ProtectedRoute element={ViewGig}/>}/>
          <Route path="/gig/:gigId" element={<ProtectedRoute element={GigDetails} />}/>

          {/* <Route path="/work" element={<ProtectedRoute element={ProjectsPage} />} /> */}
          {/* <Route path="/projectDetails" element={<ProjectDetailsPage />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
