import React from "react";

const Subject = React.memo(({ subject, color }) => (
  <div className="relative group h-24">
    <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
    <div className="relative h-full px-4 py-3 bg-neutral-900 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center">
      <p className="text-slate-300 group-hover:text-white transition duration-200 text-sm">{subject}</p>
      <div className="absolute bottom-1 right-1">
        <div className="pulsating-dot"></div>
      </div>
    </div>
  </div>
));

export default Subject;