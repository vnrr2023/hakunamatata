import React from "react";

const Limitation = React.memo(({ icon, title, description }) => (
  <div className="rounded-lg bg-neutral-800 bg-opacity-50 p-6 shadow-lg transition-all hover:bg-opacity-70 hover:shadow-xl transform hover:-translate-y-1 relative h-64 flex flex-col justify-between">
    <div>
      {icon}
      <h3 className="mb-2 text-xl font-semibold text-gray-300">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
    {['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1'].map((position, index) => (
      <div key={index} className={`absolute ${position}`}>
        <div className="pulsating-dot"></div>
      </div>
    ))}
  </div>
));

export default Limitation;