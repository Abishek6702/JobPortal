import {
  Bookmark,
  Heart,
  MessageCircle,
  SendHorizonal,
  Share2,
} from "lucide-react";
import React, { useState } from "react";
const Post = ({ post }) => {
  const [likes, setLikes] = useState(post?.stats?.likes || 0);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedCount, setSavedCount] = useState(post.stats.saved);

  const [comments, setComments] = useState(post.stats.comments);
  const [commentInput, setCommentInput] = useState("");
  const [shares, setShares] = useState(post.stats.shares);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;
    setComments(comments + 1);
    setCommentInput("");
  };

  const handleShare = () => {
    setShares(shares + 1);
    // Optionally: Copy link or open share dialog
    navigator.clipboard?.writeText(window.location.href).catch(console.error);
    // Or: window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`);
  };

  return (
    <div className="w-[100%] mx-auto  bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="profile-container flex items-center justify-between">
        <div className="flex items-center gap-3 p-4">
          <img
            src={post.user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">{post.user.name}</div>
            <div className="text-xs text-gray-500">{post.user.role}</div>
          </div>
        </div>
        <div className="posted-date">
          <p className="text-md  mr-5"> {post.postedAt}</p>
        </div>
      </div>
      {/* Post Text */}
      <div className="px-4 pb-2 text-gray-700 text-sm">
        {post.text.split(" ").map((word, i) =>
          word.startsWith("#") ? (
            <span
              key={i}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {word + " "}
            </span>
          ) : (
            word + " "
          )
        )}
      </div>
      {/* Post Image */}
      <div className="px-4">
        <img
          src={post.image}
          alt="post"
          className="w-full h-56 object-cover rounded-xl"
        />
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 text-gray-500">
        <div className="flex gap-6 ">
          <button
            className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
            onClick={() => {
              setLiked(!liked);
              setLikes(likes + (liked ? -1 : 1));
            }}
          >
            <Heart />
            <span className="text-sm">{likes} Likes</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageCircle />
            <span className="text-sm">{comments} Comments</span>
          </div>
          <button onClick={handleShare} className="flex items-center gap-1">
            <Share2 />
            <span className="text-sm">{shares} Share</span>
          </button>
        </div>
        {/* <button
          className={`flex items-center gap-1 ${saved ? "text-blue-600" : ""}`}
          onClick={() => {
            setSaved(!saved);
            setSavedCount(savedCount + (saved ? -1 : 1));
          }}
        >
          <Bookmark />
          <span className="text-sm">{savedCount} Saved</span>
        </button> */}
      </div>
      {/* Comment Box */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-center border-t border-gray-300 px-4 py-2"
      >
        <img
          src={post.user.avatar}
          alt="user"
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className="flex-1 border border-gray-400 outline-none p-2 rounded-xl text-sm relative "
          placeholder="Write your comment..."
        />
        {/* <MessageCircle className="absolute"/> */}
        <button type="submit" className="ml-2 text-blue-600">
          <SendHorizonal />
        </button>
      </form>
    </div>
  );
};

export default Post;
