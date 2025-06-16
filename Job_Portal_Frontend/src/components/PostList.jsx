import React from "react";
import Post from "./Post";

const posts = [
  {
    user: {
      name: "X_AE_A_13",
      role: "Product Designer, slothUI",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    text: `Habitant morbi tristique senectus et netus et. Suspendisse sed nisi lacus sed viverra. Dolor morbi non arcu risus quis varius. #amazing #great #lifetime #uiux #machinelearning`,
    image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80",
    stats: {
      likes: 12,
      comments: 25,
      shares: 187,
      saved: 8,
    },
     postedAt: "2 hours ago",
  },
  {
    user: {
      name: "Jane_Doe",
      role: "Frontend Developer, techCorp",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    text: `Just launched a new feature! Check out the latest updates. #feature #launch #tech #coding`,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    stats: {
      likes: 45,
      comments: 10,
      shares: 24,
      saved: 3,
    },
     postedAt: "2 hours ago",
  },
   {
    user: {
      name: "Elon_M",
      role: "CEO, SpaceX",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    text: `Making life multi-planetary isn’t optional — it’s a necessity. #Mars #SpaceX #innovation`,
       image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80",
    stats: {
      likes: 150,
      comments: 60,
      shares: 98,
      saved: 20,
    },
     postedAt: "2 hours ago",
  },
  {
    user: {
      name: "Sundar_P",
      role: "CEO, Alphabet",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    text: `Proud of the team’s efforts in pushing the boundaries of AI responsibly. #AI #GoogleIO #techleadership`,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    stats: {
      likes: 80,
      comments: 34,
      shares: 120,
      saved: 15,
    },
     postedAt: "2 hours ago",
  },
  {
    user: {
      name: "Natasha_R",
      role: "UX Researcher, InnovateX",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    },
    text: `User empathy is the most underrated design skill. Deep research = deeper connections. #uxresearch #designthinking`,
       image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80",
    stats: {
      likes: 35,
      comments: 8,
      shares: 22,
      saved: 6,
    },
     postedAt: "2 hours ago",
  },
  {
    user: {
      name: "Dev_Sharma",
      role: "Full Stack Dev, Freelance",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    text: `React, Node.js, and MongoDB — the holy trinity of modern web development. 🔥 #webdev #mernstack #javascript`,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    stats: {
      likes: 58,
      comments: 12,
      shares: 34,
      saved: 9,
    },
     postedAt: "2 hours ago",
  },
  // Add more posts as needed
];

const PostList = () => {
  return (
    <div className="space-y-2">
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default PostList;
