import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/tabs/ProfileHeader";
import ProfileTabs from "../components/tabs/ProfileTabs";
import AboutTab from "../components/tabs/AboutTab";
import EducationTab from "../components/tabs/EducationTab";
import ExperienceTab from "../components/tabs/ExperienceTab";
import ResumeTab from "../components/tabs/ResumeTab";
import JobsTab from "../components/tabs/JobsTab";
import AppliedJobsTab from "../components/tabs/AppliedJobsTab";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useAppContext } from "../context/AppProvider";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [appliedJob, setAppliedJob] = useState([]);
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState(null);
const { savedJobs, toggleSaveJob, appliedJobs } = useAppContext();
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:3000/api/auth/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [userId, token]);

  useEffect(() => {
    if (!userId || !token) return;
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/applications/${userId}/applied-jobs`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const applications = Array.isArray(response.data.appliedJobs)
          ? response.data.appliedJobs
          : [];
        if (applications.length === 0) {
          setAppliedJob([]);
          return;
        }
        const jobDetails = await Promise.all(
          applications.map(async (app) => {
            const jobRes = await axios.get(
              `http://localhost:3000/api/jobs/${app}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            return { ...jobRes.data, applicationData: app };
          })
        );
        const validJobs = jobDetails.filter((job) => job && job._id);
        setAppliedJob(validJobs);
      } catch (error) {
        console.error("Error fetching applied jobs", error);
      }
    };
    fetchAppliedJobs();
  }, [userId, token, setAppliedJob]);

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="main_container">
          <div className="profile_container w-[70%] m-auto mt-6 border border-gray-300 rounded-md">
            <div className="p-10 text-center text-gray-500">
              Loading profile...
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="main_container">
        <div className="profile_container w-[70%] m-auto mt-6 border border-gray-300 rounded-md">
          <ProfileHeader profile={profile} />
          <ProfileTabs
            tabs={[
              { label: "About", content: <AboutTab profile={profile} /> },
              {
                label: "Education",
                content: (
                  <EducationTab education={profile.onboarding?.education || []} />
                ),
              },
              {
                label: "Experience",
                content: (
                  <ExperienceTab experience={profile.onboarding?.experience || []} />
                ),
              },
              {
                label: "Resumes",
                content: <ResumeTab onboarding={profile.onboarding} />,
              },
              {
                label: "Saved Jobs",
                content: (
                  <JobsTab
                    jobs={profile.savedJobs || []}
                    savedJobs={savedJobs || []}
                    appliedJobs={appliedJobs || []}
                    toggleSaveJob={toggleSaveJob}
                    onApply={(job) => {
                      
                      navigate("/jobapplicationform", { state: { job } });
                    }}
                  />
                ),
              },
              {label: "Applied Jobs",
                content: (
                  <AppliedJobsTab
                    jobs={appliedJob || []}
                    savedJobs={savedJobs || []}
                    toggleSaveJob={toggleSaveJob}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
