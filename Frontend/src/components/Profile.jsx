
import {useState,useEffect} from 'react'
import profilebg from '../assets/profilebg.png'
import Difficulty from '../smallcomponents/Difficulty'
import TopicsMastery from '../smallcomponents/TopicsMastery'
import LanguagesUsed from '../smallcomponents/LanguagesUsed'
import Activity from '../smallcomponents/Activity';
import Badges from '../smallcomponents/Badges'
import { NavLink,useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import axios from "axios";
import codeArena from '../assets/codeArena.png';

const Profile = () => {

  const [otherUserData, setOtherUserData] = useState(null);
  const { id: paramId } = useParams();
  const myProfile = useSelector((state) => state.profile.profile);
  const isMyProfile = !paramId;

  useEffect(() => {
    if (isMyProfile) return;

    const fetchOtherUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${paramId}`,
          { withCredentials: true }
        );

        setOtherUserData(response.data.profile);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOtherUser();
  }, [paramId]);

  const profileData = isMyProfile ? myProfile : otherUserData;
  const totalSolved =
  (profileData?.solvedProblems?.easy || 0) +
  (profileData?.solvedProblems?.medium || 0) +
  (profileData?.solvedProblems?.hard || 0);
 

  return (
    <div className='bg-page absolute top-0 w-screen min-h-screen flex flex-col  overflow-hidden max-lg:relative max-lg:top-auto max-lg:w-full max-lg:overflow-x-hidden'>
      <div
        style={{ backgroundImage: `url(${profilebg})` }}
       className={`upperbg min-h-[230px] relative bg-cover bg-center max-lg:min-h-0`}>
      <div className="details relative top-30 left-40 h-40 flex gap-3 max-lg:top-auto max-lg:left-auto max-lg:h-auto max-lg:px-6 max-lg:pt-28 max-lg:pb-6 max-sm:px-4 max-sm:flex-col">
      <div className="left flex flex-col justify-end ">
            <img
              src={profileData?.avatar || codeArena}
              alt="Profile picture"
              className="h-20 w-20 rounded-full object-cover"
            />
      </div>
      <div className="right flex flex-col gap-1 items-start">
       <div className="top flex gap-2 justify-center items-center max-sm:flex-wrap max-sm:justify-start">
        <h1 className='font-bold text-3xl text-text font-Alumni max-sm:text-2xl'>{profileData?.displayName}</h1><button className='bg-violet-600/20 text-amber-500 p-2 text-sm rounded-lg '>{profileData?.badge} </button> <h3 className='text-md text-text/40'>{profileData?.country}</h3>
       </div>
     <div className="username flex gap-3"><h2 className='text-text/30 font-Saira'>{profileData?.userName}</h2>
     </div>
     <div className="bio w-96 max-w-full whitespace-normal break-words"><h3 className='text-text/40 text-xs'>{profileData?.bio}</h3></div>
     <h3 className='text-text/40'>{profileData?.location}</h3>
            <div className="bottom flex items-center gap-3 flex-wrap">
              <h1 className="text-text/40">
                Joined{" "}
                {new Date(profileData?.joinedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h1>

              {profileData?.github && (
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text/40 hover:text-violet-400"
                >
                  GitHub
                </a>
              )}

              {profileData?.linkedin && (
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text/40 hover:text-violet-400"
                >
                  LinkedIn
                </a>
              )}
            </div>
      </div>
      </div>
      
      </div>

      <div className="stats w-full border-b border-b-border p-2 h-58 max-lg:h-auto">
      <div className="main w-[80%] mx-auto pt-3 flex flex-col gap-4 max-lg:w-full max-lg:px-4">
        <div className="top flex justify-end">
        <div className="box flex gap-2 relative z-10">
          {isMyProfile? <NavLink to="/profile/edit" ><button className='text-text/60 rounded-lg px-3 py-2 bg-section border border-border hover:cursor-pointer hover:bg-white hover:text-border'>Edit Profile</button></NavLink>:<button
          className='bg-violet-500 px-3 py-2 rounded-lg text-text cursor-pointer'>Follow</button>}
        </div>
        </div>
        <div className="bottom w-full flex gap-2 max-sm:flex-col">
         <div className="first p-3 flex-1 bg-section flex border-2 hover:cursor-pointer border-border hover:scale-95 transition-all ease-in-out flex-col gap-2 rounded-lg">
          <h1 className='text-text/40 font-bebas text-2xl'>Rating</h1>
          <h1 className='text-violet-500 font-bold text-2xl'>{profileData?.rating}</h1>
          
         </div>
         <div className="first p-3 flex-1 border-2  hover:cursor-pointer border-border hover:scale-95 transition-all ease-in-out bg-section flex flex-col gap-2 rounded-lg">
          <h1 className='text-text/40 font-bebas text-2xl'>Problem Solved</h1>
          <h1 className='text-blue-400 font-bold text-2xl' > {totalSolved}</h1>
          
         </div>
         <div className="first p-3 flex-1 border-2  hover:cursor-pointer border-border hover:scale-95 transition-all ease-in-out bg-section flex flex-col gap-2 rounded-lg">
          <h1 className='text-text/40 font-bebas text-2xl'>Global Rank</h1>
          <h1 className='text-amber-500 font-bold text-2xl'>#{profileData?.rank}</h1>
          
         </div>
         
        </div>
      </div>
      </div>

      <div className="activity w-full py-7 ">
        <div className="main w-[80%] mx-auto flex gap-4 max-lg:w-full max-lg:flex-col max-lg:px-4">
         <div className="left w-[30%] flex flex-col gap-3 max-lg:w-full">
          <div className="difficult w-full  rounded-2xl border border-border bg-section p-5 text-text">
          <Difficulty solvedProblems={profileData?.solvedProblems} />
          </div>
          <TopicsMastery topicsMastery={profileData?.topicsMastery} />
          <LanguagesUsed languagesUsed={profileData?.languagesUsed} />
         </div>
         <div className="right w-[70%] flex flex-col gap-4 max-lg:w-full">
          <Activity activityDates={profileData?.activityDates} />
           <div className="buttons flex gap-3 w-full border-b border-border h-10">
              <h1 className='text-text flex items-center'>Badges</h1>
           </div>
           <Badges/>
         </div>
        </div>
      </div>

    </div>
  )
}

export default Profile
