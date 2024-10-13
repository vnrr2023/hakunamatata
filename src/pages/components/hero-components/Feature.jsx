import React from "react";

const Feature = React.memo(({ icon, title, description }) => (
  <div className="rounded-lg bg-neutral-800 bg-opacity-50 p-8 shadow-lg transition-all hover:bg-opacity-70 hover:shadow-xl transform hover:-translate-y-1 relative">
    {icon}
    <h3 className="mb-3 text-2xl font-semibold text-gray-300">{title}</h3>
    <p className="text-gray-400">{description}</p>
    {['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1'].map((position, index) => (
      <div key={index} className={`absolute ${position}`}>
        <div className="pulsating-dot"></div>
      </div>
    ))}
  </div>
));

export default Feature;