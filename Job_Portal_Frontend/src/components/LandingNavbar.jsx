import React from "react";

export default function LandingNavbar() {
  return (
    <div className="absolute z-1 pl-36 pt-5 pb-5 ">
      <div className="flex flex-row justify-evenly items-center gap-105 w-[100%] h-[70px] ">
        <div>
          <h1 className="text-4xl font-bold">Job Portal</h1>
        </div>
        <div className="flex flex-row gap-15">
          <button className="text-white">Home</button>
          <button className="text-white">About</button>
          <button className="text-white">Portfolio</button>
          <button className="text-white">Services</button>
          <div className="flex flex-row items-center gap-3 w-[170px] h-[44px] bg-blue-600 text-white rounded-4xl justify-center">
            <button className="">Contact</button>
            <buttom>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </buttom>
          </div>
        </div>
      </div>
    </div>
  );
}
