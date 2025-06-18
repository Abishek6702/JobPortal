import {
  Paperclip,
  Pen,
  Pencil,
  PencilOff,
  PenIcon,
  Smile,
  X,
} from "lucide-react";
import React from "react";

const FeedsPost = ({ onClose }) => {
  return (
    <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative">
      <div className="head flex items-center justify-between mb-4 ">
        <p className="text-xl font-semibold  ">Create Post</p>
        <button
          className=" text-gray-500 bg-gray-100 rounded-full p-1 cursor-pointer text-xl"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      <div className=" relative">
        <textarea
          rows={5}
          className="w-full border border-gray-300 rounded p-2 mb-4  outline-none"
          placeholder="What's on your mind?"
        />

        <div className="absolute bottom-8 left-4 flex gap-4 ">
          <label className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 p-1.5 cursor-pointer border border-gray-200">
            <input type="file" className="hidden" />
            <Paperclip className="text-gray-600" />
          </label>

          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 p-1.5 cursor-pointer border border-gray-200">
            <Smile className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="buttons flex items-center justify-between">
        <div className="posting_to flex items-center gap-2">
          <p className="text-lg font-medium text-gray-600">Posting To</p>
          <select className="border border-gray-300 rounded px-2 py-2  text-gray-700 outline-none">
            <option value="">Everyone</option>
            <option value="">Followers</option>
          </select>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition">
          Post
        </button>
      </div>
    </div>
  );
};

export default FeedsPost;
