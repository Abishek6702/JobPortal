import React from 'react'
import PostList from '../components/PostList'
import FriendSuggestions from '../components/FriendSuggestions'
import ProfileActivity from '../components/ProfileActivity'
import Empty from '../components/Empty'
import Navbar from '../components/Navbar'

const Feeds = () => {
  return (
<>
<Navbar/>
       <div className="grid grid-cols-1 md:grid-cols-12 h-screen bg-gray-100 gap-6 p-4 overflow-hidden">  
        

      <div className="empty-container md:col-span-3 border border-black overflow-auto">
        <Empty/>
      </div>
      
      {/* Main Feed: 7 out of 12 columns on medium+ screens */}
      <div className="md:col-span-6 overflow-y-auto h-[calc(100vh-2rem)] ">
        <PostList />
      </div>

      {/* Sidebar: 5 out of 12 columns on medium+ screens */}
      <div className="md:col-span-3 hidden md:block   ">
        <div className="fixed top-18 space-y-6">
          <FriendSuggestions />
          <ProfileActivity />
        </div>
      </div>

    </div>

</>
   

  )
}

export default Feeds
