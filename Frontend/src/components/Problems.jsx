import React from 'react'
import {SearchCode,FileBracesCorner,MoveDown,CircleSmall,CircleCheckBig,ChevronRight,Boxes, Undo2,Search, Binary, GitBranch, Brain, Network,TrendingUp, Hash,Layers,Link,Calculator, ListOrdered, RotateCcw, PanelsTopLeft, ArrowDownUp, GalleryVerticalEnd, CaseSensitive, Trees, Waypoints, ArrowLeftRight,CodeXml} from 'lucide-react'
import { useState,useEffect } from 'react';
import { fetchProblems } from "../Redux/problemSlice";
import problemsChar from '../assets/problemsChar.png'
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Problems = () => {

  const topics = [
        { key: 1, topic: "Array", icon: Boxes },
  { key: 2, topic: "Backtracking", icon: Undo2 },
  { key: 3, topic: "Binary Search", icon: Search },
  { key: 4, topic: "Bit Manipulation", icon: Binary },
  { key: 5, topic: "BST", icon: GitBranch },
  { key: 6, topic: "Dynamic Programming", icon: Brain },
  { key: 7, topic: "Graph", icon: Network },
  { key: 8, topic: "Greedy", icon: TrendingUp },
  { key: 9, topic: "Hashing", icon: Hash },
  { key: 10, topic: "Heap", icon: Layers },
  { key: 11, topic: "Linked List", icon: Link },
  { key: 12, topic: "Math", icon: Calculator },
  { key: 13, topic: "Queue", icon: ListOrdered },
  { key: 14, topic: "Recursion", icon: RotateCcw },
  { key: 15, topic: "Sliding Window", icon: PanelsTopLeft },
  { key: 16, topic: "Sorting", icon: ArrowDownUp },
  { key: 17, topic: "Stack", icon: GalleryVerticalEnd },
  { key: 18, topic: "String", icon: CaseSensitive },
  { key: 19, topic: "Tree", icon: Trees },
  { key: 20, topic: "Trie", icon: Waypoints },
  { key: 21, topic: "Two Pointers", icon: ArrowLeftRight },
           ];
  
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [topic, setTopics] = useState("ALL");
  const [selected, setSelected] = useState("ALL");
  const dispatch = useDispatch();
  const problems = useSelector((state) => state.problems.problems);
  const { isLoggedIn } = useContext(AuthContext);

   function isLogin(problem_id,index){
    //   if (!isLoggedIn) {
    //   toast.error("Login required to access this problem!");
    //   navigate("/login");
    //   return;
    // }

    navigate(`/problems/${problem_id}/${index}`);
   }

  useEffect(() => {
  dispatch(fetchProblems());
}, [dispatch]);

const filteredArray=problems.filter((problem)=>{
   const matchesDifficulty =
        selected === "ALL" ||
        problem.difficulty === selected;

    const matchesSearch =
        problem.title?.toLowerCase().includes(search.toLowerCase());

    const matchesTopic =
  topic === "ALL" ||
  problem.tags?.includes(topic);

    return matchesDifficulty && matchesSearch && matchesTopic;
})

  return (
    <div className='bg-page absolute top-0 w-screen min-h-screen flex flex-col  overflow-hidden p-2 max-lg:relative max-lg:top-auto max-lg:w-full max-lg:overflow-x-hidden max-lg:pb-6'>

    <div className="upper text-text  w-full h-90
    bg-[radial-gradient(ellipse_90%_100%_at_50%_0%,rgba(124,58,237,0.16)_0%,rgba(124,58,237,0.07)_40%,transparent_100%)]
    pointer-events-none pt-32 pl-16 max-lg:h-auto max-lg:pt-28 max-lg:px-4 max-lg:pb-8">

    <div className='border-t-violet-600 bg-violet-600/10 border-t-4 flex flex-col gap-3 w-7xl  pl-5 pt-5 pb-4 max-lg:w-full max-lg:pl-4 max-sm:px-3'>
     <h1 className='text-[#635BFF] font-Alumni text-2xl font-semibold'>PRACTICE</h1>
      <h2 className='text-text font-Saira font-semibold text-5xl relative w-fit max-sm:text-4xl'>Problem Set
        <img
        className='absolute left-[72%] bottom-3 w-14 h-auto object-contain '
        src={problemsChar} alt="" />
      </h2>
       <div className="buttons flex justify-around gap-3 w-64 max-w-full max-sm:flex-wrap max-sm:justify-start">
        <div className="button bg-section w-25 h-10 p-3 px-2 border-2 border-border flex gap-2 rounded-lg justify-center items-center">
          <span className='text-text font-bold text-xl'>{problems[0]?.total ?? 0}</span> <h2 className='text-text/30'>Total</h2>
        </div>
        <div className="button bg-section w-25 h-10 p-3 border-2 border-border flex gap-2 rounded-lg justify-center items-center">
          <span className=' font-bold text-xl text-green-400'> {problems[0]?.easy ?? 0}</span> <h2 className='text-text/30'>Easy</h2>
        </div>
        <div className="button bg-section w-35 h-10 p-3 border-2 border-border flex gap-2 rounded-lg justify-center items-center ">
          <span className=' font-bold text-xl text-yellow-400'>{problems[0]?.medium ?? 0}</span> <h2 className='text-text/30'>Medium</h2>
        </div>
        <div className="button bg-section w-20 h-10 p-3 border-2 border-border flex gap-2 rounded-lg justify-center items-center">
          <span className=' font-bold text-xl text-red-600'>{problems[0]?.hard ?? 0}</span> <h2 className='text-text/30'>Hard</h2>
        </div>
        
       </div>
    </div>


    </div>

    <div className="line bg-border border border-border">

    </div>

    <div className="main w-full pt-12 pl-16 flex flex-col gap-4 max-lg:pt-8 max-lg:px-4">

      <div className="top flex gap-3 max-lg:flex-wrap">

        <div className="flex items-center gap-3 border border-border rounded-lg px-3 focus-within:border-violet-500   transition-all duration-300 w-96 h-10 bg-section max-sm:w-full">

         <SearchCode className="text-text" size={20} />

        <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
         type="text"
         placeholder="Search problems..."
         className="w-full bg-transparent outline-none text-text"
         />
      </div>
      <div className="buttons flex gap-2">


      <button
        onClick={() => setSelected("ALL")}
       className={ selected === "ALL" ? "text-violet-400 bg-violet-700/30 h-10 w-12 flex justify-center items-center border-2 border-violet-500 rounded-md hover:cursor-pointer": "bg-transparent text-text/50 border-2 border-border h-10 w-12 flex justify-center items-center rounded-md hover:cursor-pointer"
      }
>
  All
      </button>

      <button
        onClick={() => setSelected("EASY")}
       className={ selected === "EASY" ? "text-green-400 bg-green-700/20 h-10 w-16 flex justify-center items-center border-2 hover:cursor-pointer border-green-500 rounded-md": "bg-transparent text-text/50 border-2 border-border h-10 w-16 flex justify-center hover:cursor-pointer items-center rounded-md"}> Easy </button>

       <button
        onClick={() => setSelected("MEDIUM")}
       className={ selected === "MEDIUM" ? "text-yellow-400 bg-yellow-700/20 h-10 w-20 flex hover:cursor-pointer justify-center items-center border-2 border-yellow-500 rounded-md p-2": "bg-transparent text-text/50 border-2 border-border h-10 hover:cursor-pointer w-20 flex justify-center items-center rounded-md p-2 "
      }
>
  Medium
      </button>

       <button
        onClick={() => setSelected("HARD")}
       className={ selected === "HARD" ? "text-red-400 hover:cursor-pointer bg-red-700/20 h-10 w-14 flex justify-center items-center border-2 border-red-500 rounded-md": "bg-transparent text-text/50 border-2 border-border hover:cursor-pointer h-10 w-14 flex justify-center items-center rounded-md"
      }
>
  Hard
      </button>

     </div>

      </div>

      <div className="bottom w-full mt-3 flex gap-5 pr-2 max-lg:flex-col max-lg:pr-0">

        <div className="left w-[60%] max-lg:w-full">

        <div className="top bg-section border border-border p-2 rounded-t-lg flex gap-5 max-sm:hidden">

         <div className="left flex justify-between w-[50%] items-center">
         <div className="title flex  gap-4 items-center">
         <FileBracesCorner className='text-text/20 w-4'/>
          <h2 className='text-text/30'>Title</h2>
         </div>
         <h1 className='text-text/30'>Difficulty</h1>
         </div>
         <div className="right flex justify-between items-center w-[50%]">
          <h1 className='text-text/30 '>Tags</h1>
          <h1 className='text-text/30'>Status</h1>
        </div>

        </div>

        <div className="bottom border-border  overflow-scroll h-[600px] max-lg:h-[520px]">
        {filteredArray.map((problem,index) => (
          <div
          key={problem._id}
          onClick={()=>isLogin(problem._id,index+1)}
          className="component border border-border p-2 flex gap-5 h-14 hover:bg-violet-400/10 hover:cursor-pointer overflow-x-scroll max-sm:h-auto max-sm:flex-col max-sm:gap-2">
           <div className="left flex justify-between w-[50%] items-center max-sm:w-full max-sm:gap-2">
         <div className="title flex  gap-4 items-center">
         <h1 className='text-text/25 border-l-3 border-l-violet-500 pl-1'>{problem.index}</h1>
          <h2 className='text-text font-mono'>{problem.title}</h2>
         </div>
         <h1 className={`${ problem.difficulty=== "EASY"   ? "bg-green-500/10 text-green-500 border-green-500 border text-xs ": problem.difficulty === "MEDIUM"    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500 text-xs": "bg-red-500/10 text-red-500 border border-red-500 text-sm"} px-2 py-2 rounded-lg`}>{problem.difficulty}</h1>
         </div>
         <div className="right flex justify-between items-center w-[50%] max-sm:w-full max-sm:gap-2">
          <h1 className=' flex gap-2'>{problem.tags.map((tag)=>(
           <button className='bg-section text-text/80 text-xs border border-border rounded-lg p-1'>{tag}</button>
          ))}</h1>
          <h1 className='text-text/30 flex gap-1'>
          {problem.status===""?<CircleSmall className='w-3'/>:<CircleCheckBig />}<ChevronRight/>
          </h1>
        </div>
          </div>
          ))}
        </div>

        </div>

        <div className="right border border-violet-600 shadow-md shadow-violet-500/60 w-[40%] rounded-lg p-3 flex flex-col gap-2 max-lg:w-full">

        <div className="top flex gap-2 items-center max-sm:flex-wrap">
          <div className="first">
           <CodeXml className='text-[#AA00FF] drop-shadow-md drop-shadow-[#AA00FF]  font-bold' size={43}/>
          </div>
          <div className="second flex flex-col gap-1">
           <h1 className='text-4xl font-Alumni text-text max-sm:text-3xl'>Explore topics</h1>
           <h4 className='text-text/50'>problems by concept</h4>
          </div>
          <div className="third text-[#FE00FF] bg-[#AA00FF]/50 border-2 border-violet-600 h-10 p-2 rounded-lg ">
            21 topics
          </div>
        </div>

        <div className="bottom w-full flex flex-wrap gap-2 pl-2 max-sm:pl-0" >
        {topics.map((item) => {
  const Icon = item.icon;

  return (
    <button
    onClick={()=>setTopics(item.topic)}
      key={item.key}
      className="flex items-center gap-3 rounded-lg border-2 border-white/10
                 bg-section px-3 py-2 text-text
                 transition hover:border-[#FE00FF]
                 hover:bg-violet-500/30  shadow-md w-[45%] hover:cursor-pointer hover:scale-95 max-sm:w-full"
    >
      <Icon size={18} className="text-blue-300" />

      <span className='font-Doto'>{item.topic}</span>
    </button>
  );
            })}
            <button
  onClick={() => {
    setSelected("ALL");
    setTopics("ALL");
    setSearch("");
  }}
  className=" bg-yellow-400/10 items-center p-2 rounded-lg hover:cursor-pointer hover:scale-95 text-yellow-500 border-2 border-yellow-500 flex"
>
  <RotateCcw size={20} />
  Clear Filter
</button>
        </div>

        </div>

    

      </div>

    </div>
      
    </div>
  )
}

export default Problems
