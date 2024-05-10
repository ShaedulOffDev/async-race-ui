import React, { useState, useRef, useEffect } from "react";
import { CarI } from "../types";
import { toggleEngine } from "../service/api.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setBestTime, setStatus, setWinner } from "../slice";
import { Button } from "../ui";

interface CarProps {
  car: CarI;
  removeHandler: (id: number) => void;
  selectedCarHandler: (id: number) => void;
}
const Car: React.FC<CarProps> = ({ car, removeHandler, selectedCarHandler }) => {
  const [position, setPosition] = useState<number>(0);
  const [transition, setTransition] = useState<number>(0);
  const [engineStatus, setEngineStatus] = useState<string>("stopped");
  const ref = useRef<null | NodeJS.Timeout>(null);
  const {status, winner} = useSelector((state: RootState) => state.cars);
  const dispatch = useDispatch()

  useEffect(() => {
    if(status == 'started'){
      startEngineHandler(car.id)
    }
    if(status == 'reset' && engineStatus == 'started'){
      stopEngineHandler(car.id)
    }
  }, [status])
  
  const drive = async (id: number) => {
    const res = await toggleEngine(id, "drive");
    return res;
  };
  const startEngineHandler = async (id: number) => {
    setEngineStatus('started')
    clearInterval(ref.current as NodeJS.Timeout);
    setTransition(0.1);
    const res = await toggleEngine(id, "started");
    let i = 0;
    ref.current = setInterval(() => {
      if (i <= 96) {
        i++;
        setPosition(i);
      } else {
        clearInterval(ref.current as NodeJS.Timeout);
      }
    }, res.distance / res.velocity / 100);
    try {
      await drive(id);
      toggleEngine(id, "stopped");
      if(winner == null){
        dispatch(setWinner(id))
        dispatch(setStatus('stopped'))
        const bestTime = (res.distance / res.velocity / 1000).toFixed(2)
        dispatch(setBestTime(+bestTime))
      }
    } catch (error) {
      clearInterval(ref.current as NodeJS.Timeout);
      await toggleEngine(id, "stopped");
    }
  };
  const stopEngineHandler = async (id: number) => {
    setPosition(0);
    setTransition(0);
    setEngineStatus('stopped')
    clearInterval(ref.current as NodeJS.Timeout);
    toggleEngine(id, "stopped");
    dispatch(setStatus(null))
  };

  return (
    <div className="py-3 w-full flex">
      <div className="w-[120px] max-[768px]:w-[105px] flex items-center">
        <div>
          <div className="inline-flex gap-2 flex-col me-2">
            <Button color="#BCE4ED" onClick={() => selectedCarHandler(car.id)} classes="text-[12px] px-3 py-1 max-[768px]:text-[10px] max-[768px]:px-2">
              select
            </Button>
            <Button color="#985FB0" onClick={() => removeHandler(car.id)} classes="text-[12px] px-3 py-1 max-[768px]:text-[10px] max-[768px]:px-2">
              remove
            </Button>
          </div>
          <div className="inline-flex flex-col gap-2">
            <Button color="#f0ff6c" disabled={engineStatus == 'started'} onClick={() => startEngineHandler(car.id)} classes="text-[12px] px-2 py-1 max-[768px]:text-[10px] max-[768px]:px-2">
              A
            </Button>
            <Button color="#69B973" disabled={engineStatus == 'stopped'} onClick={() => stopEngineHandler(car.id)} classes="text-[12px] px-2 py-1 max-[768px]:text-[10px] max-[768px]:px-2">
              B
            </Button>
          </div>
        </div>
      </div>
      <div className="ps-[150px] max-[768px]:ps-[120px] relative max-[768px]:pe-[30px] pe-[60px]" style={{ width: "calc(100% - 120px)" }}>
        <div className="absolute top-[50%] translate-y-[-50%] z-[10]" style={{ left: `${position}%`, transition: `left ${transition}s linear` }}>
          <svg
            className="w-[90px] max-[768px]:w-[70px]"
            viewBox="0 0 105 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: `drop-shadow(0 0 1px #fff)` }}
          >
            <rect x="1.5" y="7.5" width="102" height="48" rx="15.5" stroke={car.color} strokeWidth="3" />
            <path d="M73 48C81.5 34.5 78.5 21 73 15L59 18C62.5 27.5 61.5 36.5 59 46.5L73 48Z" stroke={car.color} strokeWidth="3" />
            <path d="M19.5 15C15.5 24.5 14 37 19.5 48L28 46C25.5 37 25.5 27.5 28 17.5L19.5 15Z" stroke={car.color} strokeWidth="3" />
            <line x1="55" y1="18" x2="32" y2="18" stroke={car.color} strokeWidth="3" />
            <line x1="55" y1="46" x2="32" y2="46" stroke={car.color} strokeWidth="3" />
            <ellipse cx="70.1232" cy="3.23233" rx="1.5" ry="3" transform="rotate(-42.0514 70.1232 3.23233)" fill={car.color} />
            <ellipse cx="70.1341" cy="59.7241" rx="1.5" ry="3" transform="rotate(42.57 70.1341 59.7241)" fill={car.color} />
          </svg>
        </div>
        <div className="border-t border-b text-white text-3xl max-[768px]:text-2xl p-5 font-thin uppercase opacity-75">{car.name}</div>
      </div>
    </div>
  );
};

export default Car;
