import { Link } from 'react-router-dom';

export default function Tabs() {
  return (
    <div
      className="
        w-full 
        flex flex-col md:flex-row 
        md:justify-center
        md:space-x-8 
        space-y-6 md:space-y-0 
        p-5 
      "
      style={{ backgroundColor: '#0F172B' }}
    >
      {[
        {
          title: 'LLM',
          desc: 'Work and customize the LLM built for customization.',
          link: '?model=LLM-1',
          gradient: 'from-[#0a1b3f] via-[#102a5c] to-[#1e3a8a]',
        },
        {
          title: 'Agentic AI',
          desc: 'Get to use and work with advanced indie agents.',
          link: '?model=agentic',
          gradient: 'from-[#0b1220] via-[#1e3a8a] to-[#3b82f6]',
        },
        {
          title: 'AgentAI with Improver',
          desc: 'Get to use and work with complete indie agents.',
          link: '?model=Agent+Improver',
          gradient: 'from-[#0a1f2f] via-[#1e3f5b] to-[#772530]',
        },
      ].map((card, i) => (
        <span
          key={i}
          className={`
            w-full md:w-auto
            max-w-[350px]
            mx-auto
            p-6 
            rounded-2xl
            bg-gradient-to-br ${card.gradient}
            flex flex-col gap-4
            transition-transform duration-300
            hover:scale-105 hover:shadow-xl
          `}
        >
          {/* Title */}
          <h2 className="font-bold font-serif text-3xl text-white">
            {card.title}
          </h2>

          {/* Description (HIDDEN on mobile, visible on md and up) */}
          <p className="text-left text-red-300 hidden md:block">
            {card.desc}
          </p>

          {/* Button */}
          <Link
            to={{ pathname: '/chat', search: card.link }}
            className="px-4 py-2 bg-black text-white rounded-lg shadow-sm hover:opacity-80 w-fit"
          >
            Try Our Model
          </Link>
        </span>
      ))}
    </div>
  );
}
