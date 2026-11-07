import React from 'react'
import {SquareMenu,Lightbulb,Timer,CornerRightDown} from 'lucide-react';

const Desc = ({data}) => {
  return (
    <div className='flex flex-col gap-2'>
     <div className="desc title mt-2 flex gap-1 bg-violet-400/20 w-fit border-l-4 border-l-violet-600 px-2">
            <h2 className="font-mono ">Problem description</h2><CornerRightDown className='text-violet-600'/>
         </div>
         <div className="desc bg-page border-border p-2 mt-2 inset-shadow-2xs inset-shadow-border border rounded-lg">
          <p className='text-text/60'>{data?.description}</p>
         </div>
        <div className="testcases flex flex-col gap-3 mt-3">
          {data?.testCases?.map((test,idx)=>(
           <div
    key={test._id || idx}
    className=" border-l-4 border-l-violet-600 bg-violet-400/5 flex flex-col gap-2 p-3 text-wrap h-32 overflow-scroll text-sm"
  >
   <div className="input flex gap-2 text-wrap">
    <h1 className='text-text/50 shrink-0'>Input</h1><h1 className='min-w-0 flex-1 whitespace-pre-wrap break-words'>{test?.input}</h1>
   </div>

    <div className="output flex gap-2 min-w-0">
    <h1 className='text-text/50 shrink-0'>Output</h1><h1 className='min-w-0 flex-1 whitespace-pre-wrap break-words'>{test?.expectedOutput}</h1>
   </div>

   <div className="output flex gap-2 min-w-0">
    <h1 className='text-text/50 shrink-0'>Explanation</h1><h1 className='min-w-0 flex-1 break-words'>{test?.explanation}</h1>
   </div>

  </div>

          ))}
        </div>
        <div className="task bg-[#2D9AC4]/20 border border-[#2DB3C4] rounded-lg p-2 mt-2.5">
         <h1>Task</h1>
        <p className='text-[#47b9c8]'>{data?.task}</p>
        </div>
        <p> Expected time complexity:{data?.timeComplexity}</p>
        <p> Expected space complexity:{data?.spaceComplexity}</p>
        <p> Constraints:{data?.constraints}</p>


    </div>
  
  )
}

export default Desc
