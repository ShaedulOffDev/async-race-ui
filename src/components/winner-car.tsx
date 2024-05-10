import { useEffect, useState } from "react";
import { getCar } from "../service/api.service";
import { CarI } from "../types";

interface carI {
  wins: number,
  id: number,
  time: number,
}

interface CarProps {
  car: carI;
}

const WinnerCar: React.FC<CarProps> = ({car}) => {
  const [carInfo, setCarInfo] = useState<CarI>()

  useEffect(() => {
    async function get() {
      const res = await getCar(car.id)
      setCarInfo(res)
    }
    get()
  }, [])
  return (
    <tr className="uppercase text-lg">
      <td className="p-2">{car.id}</td>
      <td className="py-3">
        <svg
            className="w-[90px] max-[768px]:w-[70px]"
            viewBox="0 0 105 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: `drop-shadow(0 0 1px #fff)` }}
          >
            <rect x="1.5" y="7.5" width="102" height="48" rx="15.5" stroke={carInfo && carInfo.color} strokeWidth="3" />
            <path d="M73 48C81.5 34.5 78.5 21 73 15L59 18C62.5 27.5 61.5 36.5 59 46.5L73 48Z" stroke={carInfo && carInfo.color} strokeWidth="3" />
            <path d="M19.5 15C15.5 24.5 14 37 19.5 48L28 46C25.5 37 25.5 27.5 28 17.5L19.5 15Z" stroke={carInfo && carInfo.color} strokeWidth="3" />
            <line x1="55" y1="18" x2="32" y2="18" stroke={carInfo && carInfo.color} strokeWidth="3" />
            <line x1="55" y1="46" x2="32" y2="46" stroke={carInfo && carInfo.color} strokeWidth="3" />
            <ellipse cx="70.1232" cy="3.23233" rx="1.5" ry="3" transform="rotate(-42.0514 70.1232 3.23233)" fill={carInfo && carInfo.color} />
            <ellipse cx="70.1341" cy="59.7241" rx="1.5" ry="3" transform="rotate(42.57 70.1341 59.7241)" fill={carInfo && carInfo.color} />
          </svg>
      </td>
      <td className="p-2 max-[768px]:text-sm">{carInfo && carInfo.name}</td>
      <td className="p-2">{car.wins}</td>
      <td className="p-2">{car.time}</td>
    </tr>
  );
};

export default WinnerCar;
