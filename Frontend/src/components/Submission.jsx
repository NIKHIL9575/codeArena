import React from 'react'
import {Code,Check,Timer,FileText} from 'lucide-react'
import correct from '../assets/correct.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import skeleton from '../assets/skeleton.png';
import wrong from '../assets/wrong.png'
import API from '../config/api';

const Submission = () => {

  const [isSubmitting, setIsSubmitting] = useState(true);
  const [submissionResults, setSubmissionResults] = useState(null);
  const location = useLocation();
  const { problemId, code, language ,title} = location.state || {};
 

  useEffect(() => {
    const submitCode = async () => {
      try {
        const response = await axios.post(`${API}/api/submissions/submit`, {
          problemId,
          code,
          language
        }, { withCredentials: true });

        console.log(response.data);
        setSubmissionResults(response.data);
      } catch (error) {
        console.log(error);
      } finally {
          setIsSubmitting(false);
      }
    };

    submitCode();
  }, []);

 return (
  <>
    {isSubmitting ? (
      <div className="w-screen absolute top-0 pt-16 px-16 min-h-screen flex justify-center items-center bg-page max-lg:relative max-lg:top-auto max-lg:w-full max-lg:px-4">
        <img
          src={skeleton}
          alt="Loading..."
          className="w-full h-full object-contain animate-pulse"
        />
      </div>
    ) : (
      <div className='bg-page absolute top-0 w-screen min-h-screen flex flex-col overflow-hidden p-2 gap-4 max-lg:relative max-lg:top-auto max-lg:w-full max-lg:overflow-x-hidden'>

        <div className="main w-[90%] mx-auto pl-10 pt-28 flex flex-col gap-7 max-lg:w-full max-lg:px-2 max-lg:pt-24 max-sm:gap-4">

          <div className={`status w-full h-56 ${submissionResults?.status==="Accepted"?"bg-green-500/15 border-green-400 ":"bg-red-500/10 border-red-400"} bg-amber-400/10 rounded-lg border flex gap-3 p-6 border-amber-400 max-lg:h-auto max-sm:flex-col max-sm:p-4`}>
            <div className="left flex justify-center items-center">
              <img className='h-20 w-28' src={submissionResults?.status==="Accepted"?correct:wrong} alt="" />
            </div>
            <div className="right flex flex-col gap-3 items-start">
              <h1 className='font-mono text-amber-400 flex gap-3 justify-center items-center'>
                <span className='h-2 w-2 bg-amber-500 rounded-full'></span>
                SUBMISSION RECORDED. KEEP GOING
              </h1>
              <h1 className={`text-3xl font-Doto ${submissionResults?.status==="Accepted"?"text-green-400":"text-red-400"} font-bold max-sm:text-2xl`}>
                Every attempt moves you forward.
              </h1>
              <p className='text-text/30 text-sm w-96 max-sm:w-full'>
                {submissionResults?.status==="Accepted"?"Congratulations! Your solution passed all hidden test cases. Great work! Your code is correct and successfully meets all the requirements. Keep solving and pushing your limits!":"Your code was submitted,but it needs another look.Review the feedback below,refine your approach,and try again."}
              </p>
              <h1 className='text-text text-2xl font-bold'>{title}</h1>
            </div>
          </div>

          <div className="stats w-full flex gap-3 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">

            <div className="box1 flex-1 bg-section border-border flex flex-col gap-3 rounded-lg border items-start p-6 h-40">
              <h1 className='text-text/30 flex gap-2 items-center justify-center'>
                <Check size={16} strokeWidth={1} />Test cases passed
              </h1>
              <h1 className='font-bold text-4xl text-amber-500'>{submissionResults?.passedTestCases}/{submissionResults?.totalTestCases}</h1>
              <p className='text-text/30 text-sm'>Keep pushing champs.</p>
            </div>

            <div className="box1 flex-1 bg-section border-border flex flex-col gap-3 rounded-lg border items-start p-6 h-40">
              <h1 className='text-text/30 flex gap-2 items-center justify-center'>
                <Timer size={16} strokeWidth={1} />Measured runtime
              </h1>
              <h1 className='font-bold text-4xl text-amber-500'>{"<"}{submissionResults?.runtime}</h1>
              <p className='text-text/30 text-sm'>Across samples,browser-dependent</p>
            </div>

            <div className="box1 flex-1 bg-section border-border flex flex-col gap-3 rounded-lg border items-start p-6 h-40">
              <h1 className='text-text/30 flex gap-2 items-center justify-center'>
                <Code size={16} strokeWidth={1} />Language
              </h1>
              <h1 className='font-bold text-4xl text-amber-500'>{submissionResults?.language}</h1>
              <p className='text-text/30 text-sm'>Local browser execution.</p>
            </div>

            <div className="box1 flex-1 bg-section border-border flex flex-col gap-3 rounded-lg border items-start p-6 h-40">
              <h1 className='text-text/30 flex gap-2 items-center justify-center'>
                <FileText size={16} strokeWidth={1} />Your solution
              </h1>
              <h1 className='font-bold text-4xl text-amber-500'>  {code ? code.split('\n').length : 0} lines</h1>
              <p className='text-text/30 text-sm'>A snapshot of your submitted code.</p>
            </div>

          </div>

          <div className="complexity w-full gap-3 flex max-lg:flex-col">

            <div className="left w-[70%] flex flex-col gap-3 h-72 bg-section rounded-lg p-4 border border-border max-lg:w-full max-lg:h-auto">
              <h1 className='text-purple-500 font-mono font-semibold'>
                UNDERSTAND THE TRADE-OFFS
              </h1>
              <h1 className='text-text font-bold'>Time & space complexity</h1>

              <div className="complex w-full flex gap-3 max-sm:flex-col">

                <div className="tc flex-1 h-40 p-5 flex flex-col gap-4 bg-page rounded-lg border border-border max-sm:h-auto">
                  <h1 className='text-text/40 flex gap-4'>
                    Time complexity<Timer className='text-violet-500'/>
                  </h1>
                  <h1 className='text-3xl font-bold font-mono text-blue-400'>{submissionResults?.timeComplexity}</h1>
                  <p className='text-text/30 mt-2'>How the work grows with input size.</p>
                </div>

                <div className="tc flex-1 h-40 p-5 flex flex-col gap-4 bg-page rounded-lg border border-border max-sm:h-auto">
                  <h1 className='text-text/40 flex gap-4'>
                    Space complexity<Timer className='text-violet-500'/>
                  </h1>
                  <h1 className='text-3xl font-bold font-mono text-blue-400'>{submissionResults?.spaceComplexity}</h1>
                  <p className='text-text/30 mt-2'>Memory used by the reference approach..</p>
                </div>

              </div>
            </div>

            <div className="right flex flex-col items-start w-[30%] p-5 rounded-lg border bg-section border-border max-lg:w-full max-sm:p-4">
              <h1 className='font-bold font-Alumni text-text text-2xl'>Submission details</h1>

              <div className="facts flex justify-between border-b border-b-border py-3 w-full max-sm:flex-col max-sm:gap-1">
                <h1 className='text-text/30'>Status</h1>
                <h1 className={`font-bold text-xl  ${submissionResults?.status==="Accepted"?"text-green-400":"text-red-400"}`}>{submissionResults?.status}</h1>
              </div>

              <div className="facts flex justify-between border-b border-b-border py-3 w-full max-sm:flex-col max-sm:gap-1">
                <h1 className='text-text/30'>Submitted</h1>
                <h1 className='text-amber-500 font-bold'>{new Date().toLocaleString()}</h1>
              </div>

              <div className="facts flex justify-between border-b border-b-border py-3 w-full max-sm:flex-col max-sm:gap-1">
                <h1 className='text-text/30'>Submission ID</h1>
                <h1 className='text-amber-500 font-bold'>Sub-{Date.now().toString(36).toUpperCase()}</h1>
              </div>


              <div className="facts flex justify-between border-b border-b-border py-3 w-full max-sm:flex-col max-sm:gap-1">
                <h1 className='text-text/30'>Memory usage</h1>
                <h1 className='text-amber-500 font-bold'>{submissionResults?.memory}</h1>
              </div>
            </div>

          </div>

        </div>
      </div>
    )}
  </>
);


}

export default Submission
