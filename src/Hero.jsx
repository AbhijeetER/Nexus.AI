import './global.css';
import backDrop from "../src/assets/backdrop.mp4";
import { LayoutTextFlip } from './components/layout-text-flip';
import {motion} from 'motion/react';
export default function Hero(){
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
      ];
     

    return(
        <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          src={backDrop}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="
            absolute inset-0 w-full h-full 
            object-cover 
            -z-10 
            brightness-[0.75]
          "
        />
  
        {/* Centered Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
  
        
          <h1 className="text-white text-5xl md:text-[140px] font-bold tracking-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.4)] pointer-events-auto">
             Nexus.Ai
          </h1>
            <br />
            <p></p>

          <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text=""
          words={["Welcome to Our Project","A New Nexus of Intelligence",
             "Autonomous reasoning from scratch",
              "Rooted. Adaptive. Independent",
               
            "Built to think, adapt, and operate without external control.",
        "Indie-built LLM with Indigenous-informed design","Crafted with sovereignty in mind."]}
        />
      </motion.div>
  
          <button className="mt-8 px-7 py-3 rounded-full bg-white/20 text-white text-lg backdrop-blur-md border border-white/30 hover:bg-white/30 transition pointer-events-auto" onClick={"/chat"}>
            Try Out Model
          </button>
  
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-b from-transparent to-[#0B1020] pointer-events-none" />

      </section>
    )
}