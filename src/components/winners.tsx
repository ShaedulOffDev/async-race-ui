import { useEffect, useState } from "react";
import WinnerCar from "./winner-car";
import { getTotalWinners, getWinners } from "../service/api.service";

enum sortE {
  id = "id",
  wins = "wins",
  time = "time",
}

enum orderE {
  ASC = "ASC",
  DESC = "DESC",
}

interface carI {
  wins: number;
  id: number;
  time: number;
}

const Winners = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sort, setSort] = useState<sortE>(sortE.id);
  const [order, setOrder] = useState<orderE>(orderE.ASC);
  const [winnerCars, setWinnerCars] = useState<carI[]>([]);
  const [totalCount, setTotalCount] = useState<number>(10);

  useEffect(() => {
    async function get() {
      const winners = await getWinners(page, limit, sort, order);
      setWinnerCars(winners);
      const total = await getTotalWinners();
      setTotalCount(total);
    }
    get();
  }, [page, limit, order, sort]);

  const nextPage = () => {
    if (page < Math.ceil(totalCount / limit)) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(Math.ceil(totalCount / limit));
    }
  };

  const filterHandler = (name: string, value: string) => {
    switch (name) {
      case "order":
        setOrder(value as orderE);
        break;
      case "sort":
        setSort(value as sortE);
        break;
    }
  };
  return (
    <div className="p-3">
      <div className="flex items-center max-[768px]:flex-col justify-between mb-2">
        <h1 className="text-[3.5rem] uppercase text-white" style={{ textShadow: "1px 1px 15px #B833E8" }}>
          winners
        </h1>
        <form className="mb-5 flex">
          <label className="text-white me-3">
            <p className="mb-2">Sort by:</p>
            <select
              name="sort"
              onChange={(e) => filterHandler(e.target.name, e.target.value)}
              className="bg-transparent rounded-md w-[120px] text-[#69B973] outline-none border-white border-2 px-3 py-2"
              style={{ boxShadow: "0 0 5px 1px #69B973", borderColor: "#69B973", color: '#69B973'}}
            >
              <option className="text-black" value="id">
                ID
              </option>
              <option className="text-black" value="wins">
                Wins
              </option>
              <option className="text-black" value="time">
                Time
              </option>
            </select>
          </label>
          <label className="text-white">
            <p className="mb-2">Order by:</p>
            <select
              name="order"
              onChange={(e) => filterHandler(e.target.name, e.target.value)}
              className="bg-transparent rounded-md w-[120px] text-white outline-none border-white border-2 px-3 py-2"
              style={{ boxShadow: "0 0 5px 1px #B846FB", borderColor: "#B846FB", color: '#B846FB'}}
            >
              <option className="text-black" value="ASC">
                A-Z
              </option>
              <option className="text-black" value="DESC">
                Z-A
              </option>
            </select>
          </label>
        </form>
      </div>
      <table className="w-full text-white table-fixed">
        <thead style={{ boxShadow: "0 0 20px #d574ff, inset 0 0 12px #d574ff, 0 0 0 2px #fff", borderRadius: "8px" }}>
          <tr>
            <th className="text-start p-2 uppercase font-light text-lg max-[768px]:text-sm">№</th>
            <th className="text-start p-2 uppercase font-light text-lg max-[768px]:text-sm">car</th>
            <th className="text-start p-2 uppercase font-light text-lg max-[768px]:text-sm">name</th>
            <th className="text-start p-2 uppercase font-light text-[#71CE86] text-lg max-[768px]:text-sm">wins</th>
            <th className="text-start p-2 uppercase font-light text-[#EEEFAB] text-lg max-[768px]:text-sm">best time(seconds)</th>
          </tr>
        </thead>
        <tbody>{winnerCars && winnerCars.map((w) => <WinnerCar car={w} key={w.id} />)}</tbody>
      </table>
      <div className="w-full h-[2px] mt-3 bg-[#d574ff]" style={{ boxShadow: "0 0 15px #d574ff, inset 0 0 5px #d574ff, inset 0 0 0 2px #fff" }}></div>
      <div className="mt-2">
        <div className="flex items-center gap-3 uppercase text-[#D2CDD2] text-3xl" style={{ textShadow: "3px -3px 1px #49164F" }}>
          <i onClick={prevPage} className="fa fa-caret-left cursor-pointer text-4xl"></i>
          <p>PAGE #{page}</p>
          <i onClick={nextPage} className="fa fa-caret-right cursor-pointer text-4xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Winners;
