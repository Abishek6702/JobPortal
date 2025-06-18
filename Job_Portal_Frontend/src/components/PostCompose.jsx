import React, { useState } from "react";
import FeedsPost from "./FeedsPost";

const ShareBox = () => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-4 mb-6 sticky top-0 z-10">
        <div className="flex items-center gap-3  py-1">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <input
            className="flex-1 bg-gray-100 rounded-full px-4 py-3  outline-none"
            placeholder="Share something..."
            onClick={() => setShowComponent(true)}
          />
        </div>
      </div>
      {showComponent && (
        <div className="fixed inset-0 tint flex items-center justify-center z-50">
          <FeedsPost onClose={() => setShowComponent(false)} />
        </div>
      )}
    </>
  );
};

export default ShareBox;
