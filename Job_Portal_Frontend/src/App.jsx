import { Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Navbar from "./components/Navbar";
import Resumes from "./pages/Resumes";
import Companies from "./pages/Companies";
import ELearning from "./pages/ELearning";
import Network from "./pages/Network";
import JobApplicationForm from "./pages/JobApplicationForm";
import SubmitFormSucess from "./components/SubmitFormSucess";
import OnboardingForm from "./components/OnboardingForm";
import UserProfile from "./pages/UserProfile";
import JobBoard from "./pages/JobBoard";
import JobPostForm from "./components/JobPostForm";
import EmployerSideBar from "./components/EmployerSideBar";
import Footer from "./components/Footer";
import JobPostSucess from "./components/JobPostSucess";
import JobList from "./components/JobList";
import CompanyPostForm from "./components/CompanyPostForm";
import DeleteConfirmation from "./components/DeleteConfirmation";
import ExitConfirmation from "./components/ExitConfirmation";
import EmployerNavbar from "./components/EmployerNavbar";
import SignupForm from "./components/Signup";
import AutoCarousel from "./components/AutoCarousel";
import ApplicationListing from "./pages/ApplicationListing";
import AppliedJobs from "./components/AppliedJobs";
import LandingPage from "./pages/LandingPage";
import Profile from "./components/ProfileActivity";
import Feeds from "./pages/Feeds"
// import EmployerProfile from "./pages/EmployerProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<UserDashboard />} />
        <Route path="/employer-dashboard/*" element={<EmployerDashboard />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/e-learning" element={<ELearning />} />
        <Route path="/network" element={<Network />} />
        <Route path="/jobapplicationform" element={<JobApplicationForm />} />
        <Route path="/submitsucess" element={<SubmitFormSucess />} />
        <Route path="/onbordingform" element={<OnboardingForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/job-post" element={<JobPostForm />} />
        <Route path="/Employer-sidebar" element={<EmployerSideBar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/job-sucess" element={<JobPostSucess />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/company-post" element={<CompanyPostForm />} />
        <Route path="/delete-confirm" element={<DeleteConfirmation />} />
        <Route path="/exit-confirm" element={<ExitConfirmation />} />
        <Route path="/employer-navbar" element={<EmployerNavbar />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/curousel" element={<AutoCarousel />} />
        <Route
          path="/job-application/:jobId"
          element={<ApplicationListing />}
        />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feeds" element={<Feeds />} />
      </Routes>
    </>
  );
}

export default App;
