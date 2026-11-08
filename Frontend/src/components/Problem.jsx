import React from 'react'
import {useState,useEffect} from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import {SquareMenu,Lightbulb,Timer,CornerRightDown,CodeXml,Code,CheckCheck} from 'lucide-react';
import Desc from '../smallcomponents/Desc';
import Sub from '../smallcomponents/Sub';
import Hint from '../smallcomponents/Hint';
import {motion} from 'framer-motion';
import Editor from '../smallcomponents/Editor';
import axios from "axios";
import API from "../config/api"



const Problem = () => {

const navigate=useNavigate();
const [data,setData]=useState(null);
const[button,setButton]=useState("desc");
const [slide,setSlide]=useState("c");
const[test,setTest]=useState("test1");
const [runStatus, setRunStatus] = useState("idle");
const [runResults, setRunResults] = useState([]);
const [hasRun, setHasRun] = useState(false);
const [isRunning, setIsRunning] = useState(false);
const [code, setCode] = useState("");



 const slidesButton=[
  {id:1,item:"c"},
  {id:2,item:"cpp"},
  {id:3,item:"java"},
  {id:4,item:"javascript"},
  {id:5,item:"python"}
 ]

const {id,index}=useParams();


useEffect(() => {
  if (!id) return;

  const fetchProblem = async () => {
    try {
      const res = await fetch(`${API}/api/problems/${id}`, {
        credentials: "include"
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch problem");
      }

      setData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  fetchProblem();
}, [id]);

  const handleRun = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setHasRun(false);
    setRunStatus("running");

    try {
      const response = await axios.post(
        "/api/submissions/run",
        {
          problemId: id,
          code: code,
          language: slide,
        },
        {
          withCredentials: true,
        }
      );

      setRunResults(response.data.results);
      setHasRun(true);
      setRunStatus("completed");
       console.log("data->",runResults);

    } catch (error) {
      console.error(error);
      setHasRun(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = () => {

    console.log(data?.title);

    navigate(`/problems/${id}/submission`, {
      state: {
        problemId: id,
        code,
        language: slide,
        title:data?.title
      }
    });
  };
 


  return (
    <div className='bg-page absolute top-0 w-screen min-h-screen  overflow-hidden px-8 pt-24 pb-3 max-lg:relative max-lg:top-auto max-lg:w-full max-lg:overflow-x-hidden max-lg:px-4 max-sm:px-2 max-lg:pt-24'>
      <div className="main text-amber-50 w-full flex gap-3 max-lg:flex-col">

      <div className="left w-[45%] overflow-y-auto bg-section border border-[#5500FF] rounded-lg h-[650px] max-lg:w-full max-lg:h-auto max-lg:max-h-[70vh] max-lg:overflow-y-auto">
       <div className="top sticky top-0 bg-black/20 backdrop-blur-lg  flex gap-4 h-13 pl-2 border-b border-[#5500FF]">
        <button 
        onClick={()=>setButton("desc")}
        className={`desc flex justify-center items-center p-2 gap-1 hover:cursor-pointer ${button==="desc"?"font-bold text-text border-b-2 border-[#9933FF]":"text-text/60"}`}> 
          <SquareMenu className={`mt-1${button==="desc"?"font-bold text-[#9933FF]":"text-text/60"}`}size={13}/> Description
        </button>

        <button 
        onClick={()=>setButton("hint")}
        className={`desc flex justify-center items-center p-2 gap-1 hover:cursor-pointer ${button==="hint"?"font-bold text-text border-b-2 border-[#9933FF]":"text-text/60"}`}> 
          <Lightbulb className={`mt-1${button==="hint"?"font-bold text-[#9933FF]":"text-text/60"}`}size={13}/> Hint
        </button>

        <button 
        onClick={()=>setButton("submissions")}
        className={`desc flex justify-center items-center p-2 gap-1 hover:cursor-pointer ${button==="submissions"?"font-bold text-text border-b-2 border-[#9933FF]":"text-text/60"}`}> 
          <Timer className={`mt-1${button==="submissions"?"font-bold text-[#9933FF]":"text-text/60"}`}size={13}/> Submissions
        </button>

       </div>
       <div className="bottom p-5 flex flex-col gap-2 max-sm:p-3">
        <h1 className='text-[#9933FF] font-Saira font-semibold text-xl'>THE CHALLENGE</h1>
        <div className="title flex gap-2 items-center w-fit max-sm:items-start">
          <span className='font-bold text-3xl text-text/30 font-patrick pt-1'>{index}.</span><h1 className='text-text font-bold text-3xl max-sm:text-2xl'>{data?.title}</h1>
        </div>
        <div className="topics flex gap-2 mt-2 max-sm:flex-wrap">
          <button className={`px-3 py-1 rounded-lg text-sm font-bold border-2 w-fit
    ${
      data?.difficulty === "EASY"
        ? "text-green-400 bg-green-500/10 border-green-500/30"
        : data?.difficulty === "MEDIUM"
        ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
        : "text-red-400 bg-red-500/10 border-red-500/30"
    }`}>
      {data?.difficulty==="EASY"?"Easy":data?.difficulty==="MEDIUM"?"Medium":"Hard"}
        </button>
        <div className="tags flex gap-1 ">
          {data?.topics.map((tag)=>(
            <div className="box text-text/60 border text-sm border-border px-2 py-1 rounded-lg ">
              {tag}
            </div>
          ))}
        </div>
        </div>

        <div className="main">
           {button === "desc" && (
        <Desc data={data} />
      )}

      {button === "hint" && (
        <Hint data={data} />
      )}

      {button === "submissions" && (
        <Sub data={data} />
      )}
        </div>
      
       </div>
      </div>

      <div className="right w-[55%] overflow-y-scroll flex flex-col gap-2 h-[650px] max-lg:w-full max-lg:h-auto max-lg:overflow-visible">
      <div className="code w-full bg-section border border-[#5500FF] rounded-lg">
       <div className="top flex justify-between items-center p-3 h-8 border-b border-b-[#5500FF]">
        <h1 className='flex gap-1 items-center'><CodeXml className='text-blue-300' size={16} />Code</h1>
        <h1>Draft saved</h1>
       </div>
       <div className="buttons p-2 h-15">
        <div className="slides bg-page border-2 border-border w-85 h-10 rounded-md p-1 flex items-center justify-center max-sm:w-full">
                 {
                    slidesButton.map((item)=>(
                      <div
                      onClick={()=>setSlide(item.item)}
                      key={item.id}
                      className="button  relative p-2 flex-1 h-full flex items-center justify-center cursor-pointer ">
                      <h1 className={`absolute z-50 transition-all text-sm flex p-1 font-semibold ${item.item===slide?" text-text":"text-text/50"}`}>{item.item}</h1>
                      {item.item===slide&&(
                        <motion.span 
                        layoutId='slide'
                        className="absolute inset-0 rounded-md bg-[#5500FF]/40"
                     transition={{ type: "spring", stiffness: 300, damping: 25 }}></motion.span>
                      )}
                      </div>
                    ))
                  }
              </div>
       </div>
       <div className="editor">
              <Editor
                slide={slide}
                starterCode={data?.starterCode?.[slide] || ""}
                onCodeChange={setCode}
              />
       </div>
      </div>
      <div className="testcases w-full bg-section border-[#5500FF] border rounded-lg">
        <div className="top w-full p-4 flex gap-4 border-b border-b-[#5500FF] max-sm:flex-wrap">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className={`flex gap-1 px-2 py-1 hover:-translate-y-0.5 transition-all items-center text-text  bg-blue-500/30 border-2 border-blue-500 w-fit rounded-lg  font-Saira ${isRunning ? "opacity-50 cursor-not-allowed " : "cursor-pointer"}`} >
                <Code />
                {isRunning ? "Running..." : "Run"}
              </button>

             <button
                onClick={handleSubmit}
                className="flex gap-1 px-2 py-1 items-center text-text bg-violet-500/20 border-2 border-violet-600 rounded-lg font-Saira hover:cursor-pointer hover:-translate-y-0.5 transition-all"
              >
                <CheckCheck size={16} strokeWidth={1} />
                Submit
              </button>
             
             
                
             

             
        </div>
        <div className="test gap-1.5 p-4 pb-5 flex flex-col w-full ">
              <h1 className='text-text/60  font-bold text-lg'>{runStatus === "idle" ? (
                <div>Run your code to see results.</div>
              ) : runStatus === "running" ? (
                <div>Running your code...</div>
              ) : runStatus === "completed" ? (
                <div className='text-amber-300'>
                  {test === "test1" ? runResults?.[0]?.status : test === "test2"? runResults?.[1]?.status : runResults?.[2]?.status}
                </div>
              ) : (
                <div>Execution failed</div>
              )}</h1>
        <div className="three flex items-center w-fit gap-2">

          <button
          onClick={()=>setTest("test1")}
                  className={`rounded-lg ${hasRun && runResults?.[0]?.status === "Accepted" ? "hover:bg-green-500/10" : hasRun && runResults?.[0]?.status !== "Accepted"  ? "hover:bg-red-500/10": ""} cursor-pointer px-3 py-2 ${test === "test1"
                      ? hasRun
                        ? runResults?.[0]?.status === "Accepted"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-500 border border-red-500"
                        : "bg-violet-500/20"
                      : ""
                    }`}>
            Case1
          </button>
           <button
          onClick={()=>setTest("test2")}
          className={`rounded-lg ${hasRun && runResults?.[1]?.status === "Accepted" ? "hover:bg-green-500/10" : hasRun && runResults?.[1]?.status !== "Accepted"  ? "hover:bg-red-500/10": ""}  cursor-pointer px-3 py-2 ${test === "test2"
                      ? hasRun
                        ? runResults?.[1]?.status === "Accepted"
                          ? "bg-green-500/20 text-green-400 border border-green-400"
                          : "bg-red-500/20 text-red-500 border border-red-500"
                        : "bg-violet-500/20"
                      : ""
                    }`}>
            Case2
          </button>
           <button
          onClick={()=>setTest("test3")}
         className={`rounded-lg ${hasRun && runResults?.[2]?.status === "Accepted" ? "hover:bg-green-500/10" : hasRun && runResults?.[2]?.status !== "Accepted"  ? "hover:bg-red-500/10": ""} cursor-pointer px-3 py-2 ${test === "test3"
                      ? hasRun
                        ? runResults?.[2]?.status === "Accepted"
                          ? "bg-green-500/20 text-green-400 border border-green-400"
                          : "bg-red-500/20 text-red-500 border border-red-500"
                        : "bg-violet-500/20"
                      : ""
                    }`}>
            Case3
          </button>

        </div>
        <div className="input w-full flex gap-2 max-sm:flex-col">
        <div className="left w-[50%] flex flex-col gap-3 max-sm:w-full">
          <h1>Your output</h1>
          <button className='w-full p-2 bg-gray-600/20 text-start rounded-lg text-text'>
            {test === "test1" ? runResults?.[0]?.actualOutput : test === "test2"? runResults?.[1]?.actualOutput : runResults?.[2]?.actualOutput}
          </button>
        </div>
          <div className="right w-[50%] flex flex-col gap-3 max-sm:w-full">
          <h1>Expected Output</h1>
          <button className='w-full p-2 bg-gray-600/20 text-start rounded-lg text-text'>
           {test === "test1" ? runResults?.[0]?.expectedOutput : test === "test2"? runResults?.[1]?.expectedOutput : runResults?.[2]?.expectedOutput}
          </button>
        </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Problem
