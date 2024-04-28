import React from "react";
import { CarI } from "../../types";

interface CarProps {
  car: CarI;
  removeHandler: (id: number) => void;
}

const Car: React.FC<CarProps> = ({ car, removeHandler }) => {
  return (
    <div className="py-3 w-full flex">
      <div className="flex items-center w-[220px]">
        <div className="me-3">
          <div className="inline-flex gap-2 flex-col me-2">
            <button
              className="px-3 py-1 border-2 text-[#BCE4ED] border-[#BCE4ED] text-[12px] rounded-md uppercase"
              style={{ boxShadow: "0 0 5px 1px #BCE4ED" }}
            >
              select
            </button>
            <button
              onClick={() => removeHandler(car.id)}
              className="px-3 py-1 border-2 text-[12px] border-[#985FB0] text-[#985fb0] rounded-md uppercase"
              style={{ boxShadow: "0 0 5px 1px #985FB0" }}
            >
              remove
            </button>
          </div>
          <div className="inline-flex flex-col gap-2">
            <button
              className="px-2 py-1 border-2 text-[#f0ff6c] border-[#f0ff6c] text-[12px] rounded-md uppercase"
              style={{ boxShadow: "0 0 5px 1px #f0ff6c" }}
            >
              A
            </button>
            <button
              onClick={() => removeHandler(car.id)}
              className="px-2 py-1 border-2 text-[12px] border-[#777777] text-[#777777] rounded-md uppercase"
              style={{ boxShadow: "0 0 5px 1px #777777" }}
            >
              B
            </button>
          </div>
        </div>
        <svg width="90" height="48" viewBox="0 0 105 63" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 0 1px #fff)` }}>
          <rect x="1.5" y="7.5" width="102" height="48" rx="15.5" stroke={car.color} strokeWidth="3" />
          <path d="M73 48C81.5 34.5 78.5 21 73 15L59 18C62.5 27.5 61.5 36.5 59 46.5L73 48Z" stroke={car.color} strokeWidth="3" />
          <path d="M19.5 15C15.5 24.5 14 37 19.5 48L28 46C25.5 37 25.5 27.5 28 17.5L19.5 15Z" stroke={car.color} strokeWidth="3" />
          <line x1="55" y1="18" x2="32" y2="18" stroke={car.color} strokeWidth="3" />
          <line x1="55" y1="46" x2="32" y2="46" stroke={car.color} strokeWidth="3" />
          <ellipse cx="70.1232" cy="3.23233" rx="1.5" ry="3" transform="rotate(-42.0514 70.1232 3.23233)" fill={car.color} />
          <ellipse cx="70.1341" cy="59.7241" rx="1.5" ry="3" transform="rotate(42.57 70.1341 59.7241)" fill={car.color} />
        </svg>
      </div>
      <div className="border-t border-b text-white text-3xl p-5 font-thin uppercase ms-[50px]" style={{width: 'calc(100% - 330px)'}}>
        {car.name}
      </div>
    </div>
  );
};

export default Car;
