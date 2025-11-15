import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
export default function Tabs(){


    return(
        <div className='h-100vh w-full flex  space-x-10 p-5 '  style={{ backgroundColor: "#0F172B" }}>



<span className="w-full h-[80%] relative p-5 bg-gradient-to-br from-[#0a1b3f] via-[#102a5c] to-[#1e3a8a]
rounded-2xl m-3 flex flex-col gap-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
  
  <h2 className="font-bold font-serif text-3xl text-white">
    LLM
  </h2>

  <div className="flex justify-between w-full items-center">
    <p className="text-left flex-1 text-red-300">
      Work and customize the LLM built for customization.
    </p>

    <Link 
      to={{ pathname: '/chat', search: '?model=LLM-1' }}
      className="px-4 py-2 bg-black text-white rounded-lg shadow-sm hover:opacity-80"
    >
      Try Our Model
    </Link>
  </div>

</span>



<span className="w-full h-[80%] relative p-5 bg-gradient-to-br from-[#0b1220] via-[#1e3a8a] to-[#3b82f6]
rounded-2xl m-3 flex flex-col gap-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
  
  <h2 className="font-bold font-serif text-3xl text-white">
    Agentic AI
  </h2>

  <div className="flex justify-between w-full items-center">
    <p className="text-left flex-1 text-red-300">
      Get to use and work with advanced indie agents.
    </p>

    <Link 
      to={{ pathname: '/chat', search: '?model=agentic' }}
      className="px-4 py-2 bg-black text-white rounded-lg shadow-sm hover:opacity-80"
    >
      Try Our Model
    </Link>
  </div>

</span>



<span className="w-full h-[80%] relative p-5 bg-gradient-to-br from-[#0a1f2f] via-[#1e3f5b] to-[#772530]
 rounded-2xl m-3 flex flex-col gap-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
  
  <h2 className="font-bold font-serif text-3xl text-white">
    AgentAI with Improver
  </h2>

  <div className="flex justify-between w-full items-center">
    <p className="text-left flex-1 text-red-300">
      Get to use and work with a complete indie agents.
    </p>

    <Link 
      to={{ pathname: '/chat', search: '?model=Agent+Imrpover' }}
      className="px-4 py-2 bg-black text-white rounded-lg shadow-sm hover:opacity-80"
    >
      Try Our Model
    </Link>
  </div>

</span>

</div>

        
    )
}