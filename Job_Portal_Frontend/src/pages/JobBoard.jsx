import React, { useState, useEffect } from "react";
import JobCardList from "../components/JobCardList";
import JobDetails from "../components/JobDetails";
import Navbar from "../components/Navbar";

const filterOptions = {
  jobType: ["Full-time", "Freelance", "Internship", "Volunteer"],
  remote: ["On-site", "Remote", "Hybrid"],
  datePosted: ["Anytime", "Last 24 hours", "Last 7 days", "Last 30 days"],
};

const JobBoard = () => {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: [],
    remote: [],
    datePosted: "Anytime",
    // Add more as needed
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from API
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/api/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    // Filtering logic
    setFilteredJobs(
      jobs.filter((job) => {
        const matchPosition =
          !position ||
          job.position?.toLowerCase().includes(position.toLowerCase());
        const matchLocation =
          !location ||
          job.location?.toLowerCase().includes(location.toLowerCase());
        const matchJobType =
          filters.jobType.length === 0 ||
          filters.jobType.includes(job.workplace);
        const matchRemote =
          filters.remote.length === 0 || filters.remote.includes(job.workplace);
        // Date posted filter logic as needed
        return matchPosition && matchLocation && matchJobType && matchRemote;
      })
    );
  }, [jobs, position, location, filters]);

  // Filter checkbox handler
  const handleCheckbox = (name, value) => {
    setFilters((prev) => {
      const arr = prev[name];
      return {
        ...prev,
        [name]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  // Date posted select handler
  const handleSelect = (e) => {
    setFilters((prev) => ({ ...prev, datePosted: e.target.value }));
  };

  const slidingPanelStyles = {
    position: "fixed",
    top: 0,
    right: 0,
    width: "50%",
    maxWidth: "95vw",
    height: "100vh",
    background: "#fff",
    boxShadow: "-2px 0 16px rgba(0,0,0,0.08)", // shadow to the left
    zIndex: 50,
    transform: selectedJob ? "translateX(0)" : "translateX(110%)", // <-- positive value for right
    transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
    overflowY: "auto",
  };

  return (
    <>
      <Navbar />
      <div className="w-[95%] mx-auto mt-8">
        <div className="">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6 justify-center">
            <input
              type="text"
              placeholder="Search job title or keyword"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="flex-2 px-4 py-2 border rounded-xl border-gray-300 outline-none"
            />
            <input
              type="text"
              placeholder="Country or timezone"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-xl border-gray-300 outline-none"
            />
            <button className="bg-green-600 text-white px-8 py-2 rounded-xl font-semibold">
              Find jobs
            </button>
          </div>
        </div>
        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6 relative">
         
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white border rounded-lg p-6 sticky top-10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg">Filter</span>
                <button
                  className="text-red-500 text-sm"
                  onClick={() =>
                    setFilters({
                      jobType: [],
                      remote: [],
                      datePosted: "Anytime",
                    })
                  }
                >
                  Clear all
                </button>
              </div>
              {/* Date Posted */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Date Post
                </label>
                <select
                  value={filters.datePosted}
                  onChange={handleSelect}
                  className="w-full border rounded px-2 py-1"
                >
                  {filterOptions.datePosted.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              {/* Job Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Job type
                </label>
                {filterOptions.jobType.map((type) => (
                  <div key={type} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={filters.jobType.includes(type)}
                      onChange={() => handleCheckbox("jobType", type)}
                      className="mr-2"
                    />
                    <span>{type}</span>
                  </div>
                ))}
              </div>
              {/* On-site/Remote */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  On-site/remote
                </label>
                {filterOptions.remote.map((type) => (
                  <div key={type} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={filters.remote.includes(type)}
                      onChange={() => handleCheckbox("remote", type)}
                      className="mr-2"
                    />
                    <span>{type}</span>
                  </div>
                ))}
              </div>
              {/* Range Salary (placeholder, implement as needed) */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Range Salary
                </label>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="500"
                  className="w-full"
                  // Implement salary filter logic as needed
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$1,000</span>
                  <span>$5,000+</span>
                </div>
              </div>
            </div>
          </div>
          {/* Job Cards List */}
          <div className="col-span-12 md:col-span-9">
            <div className="mb-2 font-semibold text-gray-700">
              {filteredJobs.length} Jobs results
            </div>
            <JobCardList
              jobs={filteredJobs}
              onSelectJob={setSelectedJob}
              selectedJob={selectedJob}
            />
          </div>
          {/* Sliding Job Details Panel */}
          <div style={slidingPanelStyles}>
            {selectedJob && (
              <JobDetails
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
              />
            )}
          </div>
        </div>
        {/* Overlay when panel is open */}
        {selectedJob && (
          <div
            className="fixed inset-0 tint z-40 "
            onClick={() => setSelectedJob(null)}
          />
        )}
      </div>
    </>
  );
};

export default JobBoard;
