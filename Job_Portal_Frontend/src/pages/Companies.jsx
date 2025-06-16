import React, { useEffect, useState, useTransition, useMemo } from "react";
import Navbar from "../components/Navbar";
import CompanyListing from "../components/CompanyListing";
import CompanyDetails from "../components/CompanyDetails";
import JobApplicationForm from "./JobApplicationForm";

const Companies = () => {
  const [fullScreen, setFullScreeen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({});

  const [nameFilter, setNameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/api/companies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }

        const data = await response.json();
        setCompany(data);
        if (data.length > 0) {
          setCompanyDetails(data[0]);
        }
      } catch (error) {
        console.error("Error fetching companies:", error.message);
      }
    };

    fetchCompanies();
  }, []);
  console.log("fetched company:", company);

  const filteredCompanies = company.filter((c) => {
    const matchesName = c.company_name
      ?.toLowerCase()
      .includes(nameFilter.toLowerCase());
    const matchesLocation = c.location
      ?.toLowerCase()
      .includes(locationFilter.toLowerCase());
  
    return matchesName && matchesLocation;
  });
  

  const isCompanySelected = Object.keys(companyDetails).length > 0;

  return (
    <>
      <Navbar />
      <div className="w-[90%] m-auto mt-4 ">
        <div className=" flex w-[60%] m-auto items-center border border-gray-300 rounded-full px-4 py-2 gap-4 mb-4 ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 36 36"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.875 4.5H21.0938C21.87 4.5 22.5 5.13 22.5 5.90625V15.75C22.5 16.0484 22.6185 16.3345 22.8295 16.5455C23.0405 16.7565 23.3266 16.875 23.625 16.875H27.8438C28.62 16.875 29.25 17.505 29.25 18.2812V31.5H25.875V27.5625C25.875 27.1149 25.6972 26.6857 25.3807 26.3693C25.0643 26.0528 24.6351 25.875 24.1875 25.875H11.8125C11.3649 25.875 10.9357 26.0528 10.6193 26.3693C10.3028 26.6857 10.125 27.1149 10.125 27.5625V31.5H6.75V5.625C6.75 5.32663 6.86853 5.04048 7.0795 4.8295C7.29048 4.61853 7.57663 4.5 7.875 4.5ZM23.625 31.5H19.125V28.125H23.625V31.5ZM16.875 31.5H12.375V28.125H16.875V31.5ZM30.375 33.75C30.6734 33.75 30.9595 33.6315 31.1705 33.4205C31.3815 33.2095 31.5 32.9234 31.5 32.625V18.2812C31.5 17.8011 31.4054 17.3257 31.2217 16.8821C31.0379 16.4385 30.7686 16.0354 30.4291 15.6959C30.0896 15.3564 29.6865 15.0871 29.2429 14.9033C28.7993 14.7196 28.3239 14.625 27.8438 14.625H24.75V5.90625C24.75 5.4261 24.6554 4.95066 24.4717 4.50706C24.2879 4.06347 24.0186 3.6604 23.6791 3.32089C23.3396 2.98138 22.9365 2.71206 22.4929 2.52832C22.0493 2.34457 21.5739 2.25 21.0938 2.25H7.875C6.97989 2.25 6.12145 2.60558 5.48851 3.23851C4.85558 3.87145 4.5 4.72989 4.5 5.625V32.625C4.5 32.9234 4.61853 33.2095 4.82951 33.4205C5.04048 33.6315 5.32663 33.75 5.625 33.75H30.375ZM11.8125 11.25C12.2601 11.25 12.6893 11.0722 13.0057 10.7557C13.3222 10.4393 13.5 10.0101 13.5 9.5625C13.5 9.11495 13.3222 8.68572 13.0057 8.36926C12.6893 8.05279 12.2601 7.875 11.8125 7.875C11.3649 7.875 10.9357 8.05279 10.6193 8.36926C10.3028 8.68572 10.125 9.11495 10.125 9.5625C10.125 10.0101 10.3028 10.4393 10.6193 10.7557C10.9357 11.0722 11.3649 11.25 11.8125 11.25ZM11.8125 16.875C12.2601 16.875 12.6893 16.6972 13.0057 16.3807C13.3222 16.0643 13.5 15.6351 13.5 15.1875C13.5 14.7399 13.3222 14.3107 13.0057 13.9943C12.6893 13.6778 12.2601 13.5 11.8125 13.5C11.3649 13.5 10.9357 13.6778 10.6193 13.9943C10.3028 14.3107 10.125 14.7399 10.125 15.1875C10.125 15.6351 10.3028 16.0643 10.6193 16.3807C10.9357 16.6972 11.3649 16.875 11.8125 16.875ZM13.5 20.8125C13.5 21.2601 13.3222 21.6893 13.0057 22.0057C12.6893 22.3222 12.2601 22.5 11.8125 22.5C11.3649 22.5 10.9357 22.3222 10.6193 22.0057C10.3028 21.6893 10.125 21.2601 10.125 20.8125C10.125 20.3649 10.3028 19.9357 10.6193 19.6193C10.9357 19.3028 11.3649 19.125 11.8125 19.125C12.2601 19.125 12.6893 19.3028 13.0057 19.6193C13.3222 19.9357 13.5 20.3649 13.5 20.8125ZM17.4375 11.25C17.8851 11.25 18.3143 11.0722 18.6307 10.7557C18.9472 10.4393 19.125 10.0101 19.125 9.5625C19.125 9.11495 18.9472 8.68572 18.6307 8.36926C18.3143 8.05279 17.8851 7.875 17.4375 7.875C16.9899 7.875 16.5607 8.05279 16.2443 8.36926C15.9278 8.68572 15.75 9.11495 15.75 9.5625C15.75 10.0101 15.9278 10.4393 16.2443 10.7557C16.5607 11.0722 16.9899 11.25 17.4375 11.25ZM19.125 15.1875C19.125 15.6351 18.9472 16.0643 18.6307 16.3807C18.3143 16.6972 17.8851 16.875 17.4375 16.875C16.9899 16.875 16.5607 16.6972 16.2443 16.3807C15.9278 16.0643 15.75 15.6351 15.75 15.1875C15.75 14.7399 15.9278 14.3107 16.2443 13.9943C16.5607 13.6778 16.9899 13.5 17.4375 13.5C17.8851 13.5 18.3143 13.6778 18.6307 13.9943C18.9472 14.3107 19.125 14.7399 19.125 15.1875ZM17.4375 22.5C17.8851 22.5 18.3143 22.3222 18.6307 22.0057C18.9472 21.6893 19.125 21.2601 19.125 20.8125C19.125 20.3649 18.9472 19.9357 18.6307 19.6193C18.3143 19.3028 17.8851 19.125 17.4375 19.125C16.9899 19.125 16.5607 19.3028 16.2443 19.6193C15.9278 19.9357 15.75 20.3649 15.75 20.8125C15.75 21.2601 15.9278 21.6893 16.2443 22.0057C16.5607 22.3222 16.9899 22.5 17.4375 22.5ZM24.75 20.8125C24.75 21.2601 24.5722 21.6893 24.2557 22.0057C23.9393 22.3222 23.5101 22.5 23.0625 22.5C22.6149 22.5 22.1857 22.3222 21.8693 22.0057C21.5528 21.6893 21.375 21.2601 21.375 20.8125C21.375 20.3649 21.5528 19.9357 21.8693 19.6193C22.1857 19.3028 22.6149 19.125 23.0625 19.125C23.5101 19.125 23.9393 19.3028 24.2557 19.6193C24.5722 19.9357 24.75 20.3649 24.75 20.8125Z"
              fill="gray"
            />
          </svg>
          <input
            type="text"
            placeholder="Company Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="flex-1 outline-none "
          />
          <div className="w-px h-6 bg-gray-300" />
          <div className="flex items-center flex-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.25C7.175 2.25 3.25 6.175 3.25 11C3.25 16.118 7.94699 19.2199 11.055 21.2729L11.584 21.624C11.71 21.708 11.855 21.75 12 21.75C12.145 21.75 12.29 21.708 12.416 21.624L12.945 21.2729C16.053 19.2199 20.75 16.118 20.75 11C20.75 6.175 16.825 2.25 12 2.25ZM12.119 20.021L12 20.1001L11.881 20.021C8.871 18.033 4.75 15.311 4.75 11C4.75 7.002 8.002 3.75 12 3.75C15.998 3.75 19.25 7.002 19.25 11C19.25 15.311 15.128 18.034 12.119 20.021ZM12 7.75C10.208 7.75 8.75 9.208 8.75 11C8.75 12.792 10.208 14.25 12 14.25C13.792 14.25 15.25 12.792 15.25 11C15.25 9.208 13.792 7.75 12 7.75ZM12 12.75C11.035 12.75 10.25 11.965 10.25 11C10.25 10.035 11.035 9.25 12 9.25C12.965 9.25 13.75 10.035 13.75 11C13.75 11.965 12.965 12.75 12 12.75Z"
                fill="gray"
              />
            </svg>

            <input
              type="text"
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full outline-none ml-4"
            />
          </div>
          <div className="ml-auto">
            <button className="rounded-full bg-green-100 p-2">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" />
              </svg>
            </button>
          </div>
        </div>

        {/* <div className="block lg:hidden ">
          {!isCompanySelected ? (
            <CompanyListing
              company_props={filteredCompanies}
              setCompanyDetails={setCompanyDetails}
            />
          ) : (
            <CompanyDetails
              companyDetails={companyDetails}
              setFullScreeen={setFullScreeen}
              fullScreen={fullScreen}
              setCompanyDetails={setCompanyDetails}
            />
          )}
        </div> */}

        <div className="grid grid-cols-12 gap-6">
          {!fullScreen && (
            <CompanyListing
              company_props={filteredCompanies}
              setCompanyDetails={setCompanyDetails}
            />
          )}
          <CompanyDetails
            companyDetails={companyDetails}
            setFullScreeen={setFullScreeen}
            fullScreen={fullScreen}
          />
        </div>
      </div>
    </>
  );
};

export default Companies;
