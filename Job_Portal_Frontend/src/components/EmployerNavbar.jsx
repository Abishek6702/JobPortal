import React, { useEffect, useState } from "react";
import { Bell, HelpCircle, Mail, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const EmployerNavbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstTimeLogin, setFirstTimeLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email || "User");
        setFirstTimeLogin(decoded.firstTimeLogin || false);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);
  const handleProfileClick = () => {
    if (!firstTimeLogin) {
      // If it's not first time login, navigate to employer profile
      navigate("/employer-dashboard/employer-profile");

    }
   else{
    alert("Complete Your Company Profile")
   }
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 bg-white drop-shadow-sm">
      <div className="flex items-center gap-2">
        <img src="{cz}" alt="Job Portal" className="h-6 md:h-8" />
      </div>
      <div className="flex items-center gap-6 text-gray-700 text-sm md:text-base">
        <div className="flex items-center gap-1 cursor-pointer">
          <HelpCircle size={18} />
          <span className="hidden sm:inline">Help</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <Bell size={18} />
          <span className="hidden sm:inline">Notifications</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <Mail size={18} />
          <span className="hidden sm:inline">Messages</span>
        </div>
        <div className=" profile_container flex items-center gap-2 " onClick={handleProfileClick}>
          <div className="flex items-center gap-1 cursor-pointer border-l pl-4 ">
            <User size={18} />
            <span className="text-xs md:text-sm truncate max-w-[100px]">
              {email}
            </span>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 10 6"
            fill="gray"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.99978 5.74978C4.80778 5.74978 4.61575 5.67681 4.46975 5.52981L0.46975 1.52981C0.17675 1.23681 0.17675 0.761773 0.46975 0.468773C0.76275 0.175773 1.23779 0.175773 1.53079 0.468773L5.00076 3.93874L8.47073 0.468773C8.76373 0.175773 9.23876 0.175773 9.53176 0.468773C9.82476 0.761773 9.82476 1.23681 9.53176 1.52981L5.53176 5.52981C5.38376 5.67681 5.19178 5.74978 4.99978 5.74978Z"
              fill="#141514"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default EmployerNavbar;
