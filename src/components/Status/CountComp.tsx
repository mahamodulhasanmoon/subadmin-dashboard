// Import necessary modules from React and Tailwind CSS


// Countdown component with animation
const CountComp = ({ hours, minutes, seconds, days }: any) => {
  return (

    <div className="grid text-success grid-flow-col gap-5 text-center auto-cols-max">
  <div className="flex flex-col ">
    <span className="countdown font-mono text-2xl">
      <span style={{"--value":days} as any}></span>
    </span>
    days
  </div> 
  <div className="flex flex-col text-success">
    <span className="countdown font-mono text-2xl">
      <span style={{"--value":hours} as any}></span>
    </span>
    hours
  </div> 
  <div className="flex flex-col">
    <span className="countdown font-mono text-2xl">
      <span style={{"--value":minutes} as any}></span>
    </span>
    min
  </div> 
  <div className="flex flex-col">
    <span className="countdown font-mono text-2xl">
    <span style={{ "--value" : seconds } as any}></span>
    </span>
    sec
  </div>

</div>
  );
};

// Export the animated component
export default CountComp;
