import React from "react";

const ProfileCard = () => (
  <div className="bg-white rounded-2xl shadow p-6 w-full max-w-xs mx-auto">
 
    <div className="relative h-25 mb-10 rounded-xl  ">
      <img
        src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
        alt="cover"
        className="object-cover w-full h-full rounded-xl"
      />

      <div className="absolute top-[70px] left-[50%] translate-x-[-50%]">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="profile"
          className="w-16 h-16 rounded-full border-4 border-white shadow-md"
        />
      </div>
    </div>
 
    <div className="text-center">
      <div className="font-semibold text-lg">Reinhard Van Zry</div>
      <div className="text-gray-400 text-sm mt-1">@Reinhard_</div>
    </div>
   
    <div className="flex justify-around text-center mt-2">
      <div>
        <div className="font-bold text-gray-900">250</div>
        <div className="text-xs text-gray-400">Post</div>
      </div>
      <div>
        <div className="font-bold text-gray-900">202</div>
        <div className="text-xs text-gray-400">Followers</div>
      </div>
      <div>
        <div className="font-bold text-gray-900">590</div>
        <div className="text-xs text-gray-400">Following</div>
      </div>
    </div>

    {/* <button className=" mt-4 w-full bg-blue-500 text-white rounded-xl py-2 font-semibold hover:bg-blue-600 transition cursor-pointer">
      My Profile
    </button> */}
  </div>
);

export default ProfileCard;
