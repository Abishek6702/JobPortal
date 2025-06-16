import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Book,
  BookOpen,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CircleUser,
  Home,
  Mail,
  Settings,
  User2,
  Users,
} from "lucide-react";
import notification from "../assets/notification.png";
import user from "../assets/user.png";

const Navbar = () => {
  const [showServices, setShowServices] = useState(false);
  const location = useLocation();
  // const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const isServiceActive = [
    "/resumes",
    "/score-checker",
    "/interview-prep",
  ].some((path) => location.pathname.startsWith(path));

  const toggleDropdown = () => {
    setShowServices((prev) => !prev);
  };
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");

  //   localStorage.clear();

  //   navigate("/");
  // };

  return (
    <div className="bg-white shadow-sm px-4 sm:px-6 py-3 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-bold px-10 py-1 rounded-md text-gray-700">
            LOGO
          </div>
        </div>

        <div className="hidden sm:flex gap-6 text-sm font-medium text-gray-600 text-[16px] items-center">
          <NavLink
            to="/employee-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-1 ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <Home />
            Home
          </NavLink>

          <NavLink
            to="/Network"
            className={({ isActive }) =>
              `flex items-center gap-1 ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <Users />
            Network
          </NavLink>

          <NavLink
            to="/Jobs"
            className={({ isActive }) =>
              `flex items-center gap-1 ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <BriefcaseBusiness />
            Jobs
          </NavLink>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className={`flex items-center gap-1 cursor-pointer outline-none`}
            >
              <Settings />

              <p
                className={
                  isServiceActive
                    ? "text-blue-500 font-semibold"
                    : "text-gray-800"
                }
              >
                Services
              </p>

              <svg
                width="16"
                height="16"
                viewBox="0 0 11 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 w-3 mt-1 ${
                  showServices ? "rotate-180" : ""
                } ${isServiceActive ? "text-blue-500" : "text-gray-700"}`}
              >
                <path
                  d="M0.700684 0L5.70068 5L10.7007 0H0.700684Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {showServices && (
              <div className="absolute flex flex-col top-full mt-2 left-0 bg-white rounded-md shadow-lg z-10 min-w-[180px]">
                <Link
                  to="/resumes"
                  className={`px-4 py-2 hover:bg-gray-100 ${
                    location.pathname.startsWith("/resumes")
                      ? "text-blue-500 font-semibold"
                      : ""
                  }`}
                  onClick={() => setShowServices(false)}
                >
                  Resumes
                </Link>
                <Link
                  to="/score-checker"
                  className={`px-4 py-2 hover:bg-gray-100 ${
                    location.pathname.startsWith("/score-checker")
                      ? "text-blue-500 font-medium"
                      : ""
                  }`}
                  onClick={() => setShowServices(false)}
                >
                  Score Checker
                </Link>
                <Link
                  to="/interview-prep"
                  className={`px-4 py-2 hover:bg-gray-100 ${
                    location.pathname.startsWith("/interview-prep")
                      ? "text-blue-500 font-medium"
                      : ""
                  }`}
                  onClick={() => setShowServices(false)}
                >
                  Interview Prep
                </Link>
              </div>
            )}
          </div>

          <NavLink
            to="/companies"
            className={({ isActive }) =>
              `flex items-center gap-1 ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <Building2 />
            Companies
          </NavLink>
          <NavLink
            to="/e-learning"
            className={({ isActive }) =>
              `flex items-center gap-1 ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <BookOpen />
            E-Learning
          </NavLink>
        </div>

        <div className="flex items-center gap-6 text-gray-600">
          <Mail className="cursor-pointer text-gray-600" />

          <Bell/>

          <div className="relative">
            <NavLink to="/profile">
              <CircleUser/>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
