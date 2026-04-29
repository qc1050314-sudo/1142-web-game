"use client"
import { useState } from 'react'
import Image from "next/image"
import Link from "next/link";
import { div } from 'framer-motion/client';


export default function Ending() {

  const [counter, setCounter] = useState(0);

  function ending1() {
    setCounter(counter + 1);
  }
  function ending2() {
    setCounter(counter + 2);
  }

  return (
    <>
      {
        (counter == 0) &&
        <div className='bg-black text-[#e8c870] font-[serif] tracking-widest flex justify-center items-center w-full h-full relative'>
          <div className='text-[32px] absolute top-8'>最終提問</div>
          <div className='flex flex-col justify-center items-center gap-6'>
            <div className='text-[32px]'>請問娟娟殺人的動機是什麼？</div>
            <div className='flex justify-around items-center w-full gap-2 p-1'>
              <div onClick={ending1} className='border-1 border-[#e8c870] hover:bg-[#e8c870] hover:text-black p-2'>
                A. 蓄意謀殺
              </div>
              <div onClick={ending1} className='border-1 border-[#e8c870] hover:bg-[#e8c870] hover:text-black p-2'>
                B. 毒品失控
              </div>
              <div onClick={ending2} className='border-1 border-[#e8c870] hover:bg-[#e8c870] hover:text-black p-2'>
                C. 自我防衛
              </div>

            </div>
          </div>
        </div>
      }


      {
        (counter == 1) &&
        <div className='text-white bg-black flex flex-col justify-center items-center w-full h-full relative'>
          <div className='flex flex-col items-center w-full h-full text-[32px] absolute top-8'>
            <div>
              結局：瘋人院
            </div>
            <div className='text-[16px]'>
              瘋人院中的病房一角，夜夜唱響孤戀花。
            </div>
          </div>
          
          <div className='flex justify-center items-center w-full h-full'>
            <img src="/ending_sin.png" alt="She was caught" />
          </div>
        </div>
      }

      {
        (counter == 2) &&

        <div className='text-white bg-black flex flex-col justify-center items-center w-full h-full relative'>
          <div className='flex flex-col items-center w-full h-full text-[32px] absolute top-8'>
            <div>
              結局：隱瞞真相
            </div>
            <div className='text-[16px]'>
              你同情她的遭遇，而她繼續著不變的生活
            </div>
          </div>
          
          <div className='flex justify-center items-center w-full h-full'>
            <img src="ending_letGo.png" alt="You let her go." />
          </div>
        </div>

        
      }

    </>

  )
}