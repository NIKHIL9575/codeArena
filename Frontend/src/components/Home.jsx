import React, { useState } from 'react'
import cartoon from "../assets/cartoon.png"
import heroBg from '../assets/heroBg.png'
import create from '../assets/create.png'

import { SquareChevronRight,User,UserShield,UserRoundPlus,MonitorUp,ChartLine} from "lucide-react";


const Home = () => {

 const problems=[
  {
    "id": 1,
    "title": "Two Sum",
    "difficulty": "EASY",
    "tags": ["Array", "Hash Map"]
  },
  {
    "id": 2,
    "title": "Add Two Numbers",
    "difficulty": "MEDIUM",
    "tags": ["Linked List", "Math"]
  },
  {
    "id": 3,
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "MEDIUM",
    "tags": ["Sliding Window", "String"]
  },
  {
    "id": 4,
    "title": "Median of Two Sorted Arrays",
    "difficulty": "HARD",
    "tags": ["Binary Search", "Array"]
  },
  {
    "id": 5,
    "title": "Search Insert Position",
    "difficulty": "EASY",
    "tags": ["Array", "Binary Search"]
  },
  {
    "id": 6,
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "EASY",
    "tags": ["Array", "Two Pointers"]
  },
  {
    "id": 7,
    "title": "Merge Two Sorted Lists",
    "difficulty": "EASY",
    "tags": ["Linked List", "Recursion"]
  },
  {
    "id": 8,
    "title": "Delete the Middle Node of a Linked List",
    "difficulty": "MEDIUM",
    "tags": ["Linked List", "Two Pointers"]
  },
  {
    "id": 9,
    "title": "Reverse Nodes in k-Group",
    "difficulty": "HARD",
    "tags": ["Linked List", "Recursion"]
  },
  {
    "id": 10,
    "title": "Counting Bits",
    "difficulty": "EASY",
    "tags": ["Dynamic Programming", "Bit Manipulation"]
  }
];

const features = [
  {
    img: "⚡",
    title: "Real-Time Judge",
    description:
      "Sub-100ms verdict on over 40 languages. Your code runs on dedicated bare-metal, not sandboxed VMs."
  },
  {
    img: "🧠",
    title: "AI-Powered Hints",
    description:
      "Stuck? Get Socratic hints that guide your thinking without spoiling the solution."
  },
  {
    img: "📊",
    title: "Progress Analytics",
    description:
      "Topic-level heatmaps, time-per-problem charts, and weak-spot detection across 350+ patterns."
  }
];

// const [level,setLevel]=useState("ALL");
const [selected, setSelected] = useState("ALL");

const filteredProblems=problems.filter((problem)=>{
  return selected==="ALL"||problem.difficulty===selected;
});


  return (
    <div 
      className=" w-screen  bg-cover bg-center h-full absolute top-0 overflow-x-hidden max-lg:relative max-lg:top-auto max-lg:w-full max-lg:h-auto max-lg:min-h-screen "
      style={{ backgroundImage: `url(${heroBg})` }}
    >
     
<div className="hero flex justify-around gap-8 px-12 py-44  mx-auto h-full max-lg:flex-col max-lg:gap-10 max-lg:px-6 max-lg:py-28 max-sm:px-4 max-sm:py-20">

<div className="left text-start flex flex-col gap-5 w-[50%] max-lg:w-full">

<div className="top bg-card border-border border flex gap-2 items-center p-1 rounded-md w-fit max-sm:max-w-full">
  <div className="dot w-3 h-3 bg-green-400 rounded-full"></div>
  <p className='text-text font-Doto max-sm:text-sm'> currently debugging something obvious</p>
</div>

<div className="code flex flex-col gap-2">
  <h1 className='text-text text-8xl font-bebas font-semibold drop-shadow-xs drop-shadow-amber-50 relative max-lg:text-7xl max-sm:text-5xl'>
    <div className="days absolute h-6 w-20 bg-amber-300 rounded-md -top-2">
    <h1 className='text-sm text-amber-950'>12 days streak</h1>
    
    </div>
    Code.Break things.</h1>
  <h1 className='text-violet-500 font-semibold text-8xl font-bebas shadow-2xs shadow-violet-500 max-lg:text-7xl max-sm:text-5xl'>Figure it out.</h1>
  
</div>

<p className='text-text/50 font-Saira text-xl max-sm:text-lg'>A chill place to  practice algorithms,make mistakes,and get a little better every day.No pressure,just code and vibe.</p>

<div className="button flex gap-3">
  <button className='bg-violet-600 text-text p-3 rounded-md flex gap-2 items-center hover:cursor-pointer font-semibold'>Pick a problem <SquareChevronRight/> </button>
</div>

<div className="bottom flex max-sm:items-start max-sm:text-sm">
<User className='text-amber-50'/><UserShield className='text-amber-500'/><UserRoundPlus className='text-cyan-400'/>
<p className='text-gray-600 font-bold'><span className='text-text/70 font-bold px-2'>1,000 coders</span>are stuck on something right now</p>
</div>

</div>

<div className="right flex justify-center  w-[50%] max-lg:w-full">
  <div className="image">
    <img 
    className='w-full  max-w-2xl object-contain max-lg:max-h-[420px]'
    src={cartoon} alt="" />
  </div>
</div>

</div>

<div className="stats w-full p-6 bg-section border-y-2 border-border flex gap-3 justify-around max-lg:grid max-lg:grid-cols-2 max-lg:gap-5 max-sm:p-4">
<div className="problems">
  <h1 className='font-bold font-roboto text-4xl text-text bg-violet-400/20 border-l-4 border-l-violet-700 px-3'>300+</h1>
  <h3 className='text-text/50'>Coding problems</h3>
</div>

<div className="problems">
  <h1 className='font-bold font-roboto text-4xl text-text bg-violet-400/20 border-l-4 border-l-violet-700 px-3'>3</h1>
  <h3 className='text-text/50'>Difficulty levels</h3>
</div>

<div className="problems">
  <h1 className='font-bold font-roboto text-4xl text-text bg-violet-400/20 border-l-4 border-l-violet-700 px-3 '>20+</h1>
  <h3 className='text-text/50'>Practice topics</h3>
</div>

<div className="problems">
  <h1 className='font-bold font-roboto text-4xl text-text bg-violet-400/20 border-l-4 border-l-violet-700 px-3'>5</h1>
  <h3 className='text-text/50'>Languages</h3>
</div>
  
    </div>

    <div className="snippet bg-page  w-full py-16 flex flex-col gap-12">

    <div className="box w-[80%] mx-auto flex flex-col gap-3 max-lg:w-[92%] max-sm:w-full max-sm:px-4">

      <h1 className='font-Saira text-violet-600 text-xl '>PROBLEM SET</h1>
   <div className="heading  flex justify-between items-center mt-3 max-sm:flex-col max-sm:items-start max-sm:gap-4">

    <h1 className='font-bold font-patrick text-text text-2xl'>Start solving today</h1>
     <div className="buttons flex gap-2 max-sm:w-full max-sm:flex-wrap">


      <button
        onClick={() => setSelected("ALL")}
       className={ selected === "ALL" ? "text-violet-400 bg-violet-700/30 h-10 w-12 flex justify-center items-center border-2 border-violet-500 rounded-md hover:cursor-pointer": "bg-transparent text-text/50 border-2 border-border h-10 w-12 flex justify-center items-center rounded-md hover:cursor-pointer"
      }
>
  All
      </button>

      <button
        onClick={() => setSelected("EASY")}
       className={ selected === "EASY" ? "text-violet-400 bg-violet-700/20 h-10 w-16 flex justify-center items-center border-2 hover:cursor-pointer border-violet-500 rounded-md": "bg-transparent text-text/50 border-2 border-border h-10 w-16 flex justify-center hover:cursor-pointer items-center rounded-md"}> Easy </button>

       <button
        onClick={() => setSelected("MEDIUM")}
       className={ selected === "MEDIUM" ? "text-violet-400 bg-violet-700/20 h-10 w-20 flex hover:cursor-pointer justify-center items-center border-2 border-violet-500 rounded-md p-2": "bg-transparent text-text/50 border-2 border-border h-10 hover:cursor-pointer w-20 flex justify-center items-center rounded-md p-2 "
      }
>
  Medium
      </button>

       <button
        onClick={() => setSelected("HARD")}
       className={ selected === "HARD" ? "text-violet-400 hover:cursor-pointer bg-violet-700/20 h-10 w-14 flex justify-center items-center border-2 border-violet-500 rounded-md": "bg-transparent text-text/50 border-2 border-border hover:cursor-pointer h-10 w-14 flex justify-center items-center rounded-md"
      }
>
  Hard
      </button>

     </div>

    </div>

    <div className="problems w-full mt-3 flex flex-col">
      <div className="head bg-section p-3 pr-28 font-Saira font-semibold flex justify-between border border-border rounded-md max-lg:hidden">
      <div className="title flex gap-10">
        <h1 className='text-text/30'>#</h1>
        <h1 className='text-text/30'>Title</h1>
      </div>
      <div className="tags flex gap-18 font-semibold">
        <h1 className='text-text/30'>Difficulty</h1>
        <h1 className='text-text/30'>Tags</h1>
      </div>
      </div>
        {
        filteredProblems.map((problem)=>(
              <div 
              key={problem.id}
              className="content p-3 font-Saira font-semibold flex justify-between border border-border hover:bg-violet-500/10 rounded-md pr-18 max-lg:flex-col max-lg:gap-2 max-lg:pr-3">
               <div className="title flex gap-10 text-start max-lg:gap-3">
               <h1 className='text-text/30'>{problem.id}</h1>
               <h1 className=' font-Alumni text-text text-lg'>{problem.title}</h1>
               </div>
               <div className="tags flex gap-5 max-lg:flex-wrap max-lg:gap-2">
                <button 
                className={problem.difficulty === "EASY" ? "bg-green-500/20 text-green-400 border border-green-400 px-2 py-1 rounded-md" : problem.difficulty === "MEDIUM"  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-600 px-2 py-1 rounded-md" : "bg-red-500/20 text-red-400 border border-red-800 px-2 py-1 rounded-md"}
                >
               {problem.difficulty}
                </button>
               {
                  problem.tags.map((tag)=>(
                    <>
                    <div className="tags flex gap-3 justify-between">
                      <button className='text-text/30 bg-gray-500/10 p-2 rounded-md  text-xs'>{tag}</button>
                    </div>
                    </>
                  ))
                }
              </div>

              </div>
        ))
      }
      

    </div>
    
   </div>

   <button className='px-3 py-2 text-violet-400 rounded-md border border-violet-500/50 hover:bg-violet-400/5 w-fit mx-auto flex gap-2 hover:cursor-pointer'>Browse all 299+ problems <MonitorUp/></button>

    </div>

    <div className="features bg-section w-full p-10 max-sm:px-4 max-sm:py-10">

      <div className="box flex flex-col mx-auto items-center justify-center gap-10">
        <h1 className='text-violet-400 font-bebas text-2xl border-l-2 border-l-violet-700 px-3'>WHY CODEARENA</h1>
         <h1 className='text-text font-bold font-Alumni text-5xl text-center max-sm:text-3xl'>Every tool you need to reach the top 1%</h1>
         <div className="content flex gap-16 justify-between max-lg:flex-wrap max-lg:justify-center max-lg:gap-5">
          {features.map((feature) => (
  <div className='flex flex-col gap-3 text-start w-80 border border-border p-3 rounded-lg hover:bg-violet-400/5 hover:border-violet-500 max-lg:w-full max-lg:max-w-80'>
    <div>{feature.img}</div>
    <h2 className='text-text font-roboto'>{feature.title}</h2>
    <p className='text-text/30'>{feature.description}</p>
  </div>
))}
         </div>
      </div>

    </div>

    <div className="leaderboard w-full p-20 bg-page flex justify-around max-lg:flex-col max-lg:items-center max-lg:gap-10 max-lg:p-8 max-sm:px-4">

   <div className="leaders flex flex-col gap-6 justify-center max-lg:w-full">
    <h1 className='font-Saira font-bold text-violet-500 text-2xl'>GLOBAL RANKINGS</h1>
    <h2 className='font-Alumni text-5xl text-text max-sm:text-3xl'>Where legends compete</h2>
    <div className="name w-96 max-lg:w-full">
      <div className="p1 w-full p-3 flex gap-3 border border-violet-600 rounded-lg hover:bg-violet-400/10 max-sm:gap-2">
      <span className='text-text'>1.</span> <User className='bg-green-600 rounded-lg text-white p-1'/> <h1 className='text-text'>Virat kohli</h1>
      <h3 className='text-violet-500 ml-40 max-sm:ml-auto'>2322</h3>
      </div>
      <div className="p1 hover:bg-violet-400/10 w-full p-3 flex gap-3 border border-violet-600 rounded-lg max-sm:gap-2">
      <span className='text-text'>2.</span> <User className='bg-green-600 rounded-lg text-white p-1'/> <h1 className='text-text'>Jasprit bumrah</h1>
      <h3 className='text-violet-500 ml-32 max-sm:ml-auto'>2022</h3>
      </div>
      <div className="p1 hover:bg-violet-400/10 w-full p-3 flex gap-3 border border-violet-600 rounded-lg max-sm:gap-2">
      <span className='text-text'>3.</span> <User className='bg-green-600 rounded-lg text-white p-1'/> <h1 className='text-text'>hardik pandya</h1>
      <h3 className='text-violet-500 ml-32 max-sm:ml-auto'>2002</h3>
      </div>
    </div>
    <button className='text-text/50 border-border border w-fit ml-24 p-2 rounded-lg hover:bg-green-300/20 hover:border-green-600 hover:text-green-500 hover:cursor-pointer flex gap-2 max-lg:ml-0'>View leaderboard<ChartLine/></button>
   </div>

   <div className="create border-l-4 relative border-l-green-600 p-4 h-[600px] w-[400px] max-lg:h-[420px] max-lg:w-full max-lg:max-w-[400px]">
    <img className='h-full w-full object-contain' src={create} alt="" />
   </div>

    </div>



  
</div>


  )
}

export default Home
