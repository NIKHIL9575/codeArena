import React from 'react'
import {useState,useEffect} from 'react'
import {motion} from 'framer-motion'
import {SearchCode} from 'lucide-react'
import silver from '../assets/silver.png'
import gold from '../assets/gold.png'
import bronze from '../assets/bronze.png'
import codeArena from '../assets/codeArena.png'
import axios from 'axios';
import { NavLink } from 'react-router-dom'

const Leaderboard = () => {

  const [slide, setSlide] = useState("All Time");
  const [selected, setSelected] = useState("ALL");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const leaderboard = async () => {
      try {
        const response = await axios.get("/api/leaderboard");

        console.log(response.data);
        setData(response.data.result || []);

      } catch (error) {
        console.log(error);
      }
    };

    leaderboard();
  }, []);


  const slidesButton = [
    { id: 1, item: "All Time" },
    { id: 2, item: "This Month" },
    { id: 3, item: "This Week" }
  ];

 const ranks = [
  { id: 1, name: "All", value: "ALL", active: "text-violet-500 bg-violet-600/10 border-violet-600" },
  { id: 2, name: "Newbie", value: "Newbie", active: "text-gray-500 bg-gray-600/10 border-gray-600" },
  { id: 3, name: "Pupil", value: "Pupil", active: "text-green-500 bg-green-600/10 border-green-600" },
  { id: 4, name: "Specialist", value: "Specialist", active: "text-blue-500 bg-blue-600/10 border-blue-600" },
  { id: 5, name: "Expert", value: "Expert", active: "text-purple-500 bg-purple-600/10 border-purple-600" },
  { id: 6, name: "Master", value: "Master", active: "text-orange-500 bg-orange-600/10 border-orange-600" },
  { id: 7, name: "Grandmaster", value: "Grandmaster", active: "text-red-500 bg-red-600/10 border-red-600" },
  { id: 8, name: "Legendary", value: "Legendary", active: "text-yellow-500 bg-yellow-600/10 border-yellow-600" }
];

const rankColors = {
  Newbie: "text-gray-500 bg-gray-600/10 border border-gray-600",
  Pupil: "text-green-500 bg-green-600/10 border border-green-600",
  Specialist: "text-blue-500 bg-blue-600/10 border border-blue-600",
  Expert: "text-purple-500 bg-purple-600/10 border border-purple-600",
  Master: "text-orange-500 bg-orange-600/10 border border-orange-600",
  Grandmaster: "text-red-500 bg-red-600/10 border border-red-600",
  Legendary: "text-yellow-500 bg-yellow-600/10 border border-yellow-600"
};

  const filteredArray = data.filter((user) => {

    const matchesBadge =
      selected === "ALL" ||
      user?.Badge === selected;

    const matchesSearch =
      user?.username?.toLowerCase().includes(search.toLowerCase()) ||
      user?.displayName?.toLowerCase().includes(search.toLowerCase());

    return matchesBadge && matchesSearch;
  });


  return (
    <div className='bg-page absolute top-0 w-screen min-h-screen flex flex-col overflow-scroll p-2 max-lg:relative max-lg:top-auto max-lg:w-full max-lg:overflow-x-hidden'>

      <div className="upper text-text w-full h-90
         bg-[radial-gradient(ellipse_90%_100%_at_50%_0%,rgba(234,179,8,0.16)_0%,rgba(234,179,8,0.07)_40%,transparent_100%)]
           pt-32 pl-16 border-b border-b-border max-lg:h-auto max-lg:pt-28 max-lg:px-4 max-lg:pb-8">

        <div className='border-t-yellow-600 bg-yellow-600/10 border-t-4 flex flex-col gap-3 w-7xl pl-5 pt-5 pb-4 max-lg:w-full max-lg:pl-4 max-sm:px-3'>
          <h1 className='text-[#FF5C1B] font-Alumni text-2xl font-semibold'>RANKINGS</h1>
          <h2 className='text-text font-Saira font-semibold text-5xl relative w-fit max-sm:text-4xl'>Global Leaderboard</h2>
          <p className='text-text/40'>🏆 See where you stand among fellow coders.</p>

          <div className="slides bg-page border-2 border-border w-64 h-10 rounded-md p-1 flex items-center justify-center">
            {
              slidesButton.map((item) => (
                <div
                  onClick={() => setSlide(item.item)}
                  key={item.id}
                  className="button relative p-2 flex-1 h-full flex items-center justify-center hover:cursor-pointer">

                  <h1 className={`absolute z-50 transition-all text-sm flex p-1 ${item.item === slide ? "text-text" : "text-text/50"}`}>
                    {item.item}
                  </h1>

                  {item.item === slide && (
                    <motion.span
                      layoutId='leaderboard-slide'
                      className="absolute inset-0 pointer-events-none rounded-md bg-[#FF5C1B]/50"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                    </motion.span>
                  )}
                </div>
              ))
            }
          </div>
        </div>
      </div>


      {/* TOP 3 LEADERBOARD */}

      <div className="three w-full px-5 py-13 max-sm:px-2 max-sm:py-8">

        <div className="main mx-auto w-[40%] flex gap-3 max-lg:w-full max-lg:max-w-xl max-sm:gap-1">

          {/* SECOND POSITION */}

          {data[1] && (
            <div className="second flex flex-col gap-2 pt-6 flex-1">
              <div className="top flex flex-col gap-2 items-center">

                <img
                  className='rounded-full h-16 w-16 object-cover border-2 border-text'
                  src={data[1].avatar || codeArena}
                  onError={(e) => e.currentTarget.src = codeArena}
                  alt=""
                />

                <img className='h-8 w-8' src={silver} alt="" />

                <h1 className='text-text'>{data[1].displayName || data[1].username}</h1>
                <h1 className='text-gray-600'>{data[1].ratings}</h1>
                <h1 className='text-xs text-text/20'>@{data[1].username}</h1>

              </div>

              <div className="bottom w-full bg-[linear-gradient(to_bottom,rgba(156,163,175,0.2)_0%,rgba(156,163,175,0.15)_50%,rgba(156,163,175,0.1)_100%)] border-x border-x-white border-t border-t-white flex justify-center items-center text-3xl font-bold text-gray-500 rounded-t-lg h-32">
                #2
              </div>
            </div>
          )}


          {/* FIRST POSITION */}

          {data[0] && (
            <div className="second flex flex-col gap-2 flex-1 mb-6">
              <div className="top flex flex-col gap-2 items-center">

                <img
                  className='rounded-full h-16 w-16 object-cover border-2 border-text'
                  src={data[0].avatar || codeArena}
                  onError={(e) => e.currentTarget.src = codeArena}
                  alt=""
                />

                <img className='h-8 w-8' src={gold} alt="" />

                <h1 className='text-text'>{data[0].displayName || data[0].username}</h1>
                <h1 className='text-gray-600'>{data[0].ratings}</h1>
                <h1 className='text-xs text-text/20'>@{data[0].username}</h1>

              </div>

              <div className="bottom w-full bg-[linear-gradient(to_bottom,rgba(234,179,8,0.2)_0%,rgba(234,179,8,0.12)_50%,rgba(234,179,8,0.05)_100%)] border-x border-x-white border-t border-t-white flex justify-center items-center text-3xl font-bold text-gray-500 rounded-t-lg h-40 mb-3">
                #1
              </div>
            </div>
          )}


          {/* THIRD POSITION */}

          {data[2] && (
            <div className="second flex flex-col gap-2 flex-1 pt-9">
              <div className="top flex flex-col gap-2 items-center">

                <img
                  className='rounded-full h-16 w-16 object-cover border-2 border-text'
                  src={data[2].avatar || codeArena}
                  onError={(e) => e.currentTarget.src = codeArena}
                  alt=""
                />

                <img className='h-8 w-8' src={bronze} alt="" />

                <h1 className='text-text'>{data[2].displayName || data[2].username}</h1>
                <h1 className='text-gray-600'>{data[2].ratings}</h1>
                <h1 className='text-xs text-text/20'>@{data[2].username}</h1>

              </div>

              <div className="bottom w-full bg-[linear-gradient(to_bottom,rgba(236,72,153,0.2)_0%,rgba(236,72,153,0.15)_50%,rgba(236,72,153,0.1)_100%)] border-x border-x-white border-t border-t-white flex justify-center items-center text-3xl font-bold text-gray-500 rounded-t-lg h-28">
                #3
              </div>
            </div>
          )}

        </div>
      </div>


      {/* LEADERBOARD TABLE */}

      <div className="leaderboard w-[75%] mx-auto flex flex-col gap-3 max-lg:w-full max-lg:px-2">

        <div className="top flex gap-3 w-full max-lg:flex-col">

          <div className="input flex flex-1 items-center gap-3 border border-border rounded-lg px-3 focus-within:border-violet-500 transition-all duration-300 w-96 h-10 bg-section max-lg:w-full">

            <SearchCode className="text-text" size={20} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by userName..."
              className="w-full bg-transparent outline-none text-text"
            />
          </div>


          <div className="button flex gap-2 items-center overflow-x-auto max-lg:pb-2">

            {ranks.map((rank) => (
              <button
                key={rank.id}
                onClick={() => setSelected(rank.value)}
                className={`hover:cursor-pointer rounded-lg border px-4 py-2 text-sm transition-all duration-200 ${
                  selected === rank.value
                    ? rank.active
                    : "text-gray-400 border-gray-800 bg-transparent"
                }`}
              >
                {rank.name}
              </button>
            ))}

          </div>
        </div>


        <div className="bottom w-full flex flex-col rounded-lg overflow-x-auto">

          <div className="heading w-full min-w-[620px] h-12 flex p-3 pl-3 justify-between items-center bg-section rounded-t-lg">

            <div className="left flex gap-10 w-[60%]">
              <h1 className='text-text/30 text-sm'>Rank</h1>
              <h1 className='text-text/30 text-sm'>Coder</h1>
            </div>

            <div className="right w-[40%] grid grid-cols-3">
              <h1 className='text-text/30 text-sm'>Badge</h1>
              <h1 className='text-text/30 text-sm'>Rating</h1>
              <h1 className='text-text/30 text-sm'>Solved</h1>
            </div>

          </div>


          <div className="users w-full flex flex-col border border-border">

            {filteredArray.map((user, idx) => {

              const bg = user.Badge || "Newbie";

              return (
                <NavLink to={`/profile/${user.userId}`}>
                  <div
                  key={user._id}
                  className="content w-full min-w-[620px] hover:cursor-pointer hover:bg-violet-600/5 h-15 flex p-3 pl-3 justify-between items-center bg-page border-b border-b-border">

                  <div className="left flex items-center gap-10 w-[60%]">

                    <h1 className='text-text/30 text-sm'>{idx + 1}</h1>

                    <div className='text-text/30 text-sm flex gap-2 items-center justify-center pl-5'>

                      <div className="img">
                        <img
                          className='h-10 w-10 rounded-full object-cover'
                          src={user.avatar || codeArena}
                          onError={(e) => e.currentTarget.src = codeArena}
                          alt=""
                        />
                      </div>

                      <div className="name flex flex-col">
                        <h1 className='text-text'>{user?.displayName || user?.username}</h1>
                        <h1 className='text-text/30 text-xs'>@{user?.username}</h1>
                      </div>

                    </div>
                  </div>


                  <div className="right flex w-[40%] grid grid-cols-3 items-center">

                    <button className={`w-fit h-7 py-1.5 px-4 font-mono text-sm flex justify-center items-center rounded-lg ${rankColors[bg] || ""}`}>
                      {bg}
                    </button>

                    <h1 className='text-text/30 text-sm'>{user.ratings}</h1>

                    <h1 className='text-text/30 text-sm'>{user.problemsSolved}</h1>

                  </div>

                </div>
                </NavLink>
              );
            })}

          </div>

        </div>
      </div>

    </div>
  );
};

export default Leaderboard
