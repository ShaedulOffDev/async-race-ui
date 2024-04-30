import { useDispatch, useSelector } from "react-redux";
import { createCar, createWinner, getCar, getCars, getCarsCount, getWinner, removeCar, updateCar, updateWinner } from "../../service/api.service";
import { RootState } from "../../store";
import React, { useCallback, useEffect, useState } from "react";
import { setBestTime, setCar, setCars, setMatch, setStatus, setWinner } from "../../slice";
import { Car } from "../";
import { FinishImage, NextImage, StartImage } from "../../assets";
import { carNames, colors } from "../../constants";

interface winnerI {
  winnerCarName: string;
  time: number;
}

const Garage = () => {
  const dispatch = useDispatch();
  const { cars, winner, bestTime, isMatchEnded } = useSelector((state: RootState) => state.cars);
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [page, setPage] = useState<number>(1);
  const [winnerInfo, setWinnerInfo] = useState<winnerI>({
    winnerCarName: "",
    time: 0,
  });
  const [limit] = useState<number>(7);
  const [updateCarName, setUpdateCarName] = useState<string>("");
  const [winnerModal, setWinnerModal] = useState<boolean>(false);
  const [updateCarColor, setUpdateCarColor] = useState<string>("#000000");
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [raceStatus, setRaceStatus] = useState<boolean>(true);

  useEffect(() => {
    async function winnerHandler() {
      if (!isMatchEnded && winner != null) {
        setRaceStatus(true);
        await getWinner(winner)
          .then((res) => res.json())
          .then(async(res) => {
            if (res.wins) {
              const wins: number = res.wins + 1;
              updateWinner(winner, wins, bestTime);
            } else {
              createWinner(winner, 1, bestTime);
            }
            const car = await getCar(winner)
            const winnerCar = {winnerCarName: car.name, time: bestTime}
            setWinnerInfo(winnerCar)
            setWinnerModal(true)
          });
        dispatch(setStatus(null));
        dispatch(setMatch(true));
        dispatch(setWinner(null));
        dispatch(setBestTime(0));
      }
    }
    winnerHandler();
  }, [winner]);

  const fetchCars = useCallback(async () => {
    const fetchedCars = await getCars(page, limit);
    dispatch(setCars(fetchedCars));
  }, [dispatch, limit, page]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name != "") {
      const res = await createCar(name, color);
      if (cars.length < limit) {
        const fetchCar = await getCar(res.id);
        dispatch(setCar(fetchCar));
      }
      setName("");
      setColor("#000000");
    } else {
      console.log("please enter a car name");
    }
  };

  const removeHandler = async (id: number) => {
    await removeCar(id);
    await fetchCars();
  };
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

  const selectedCarHandler = (id: number) => {
    setSelectedCar(id);
  };
  const updateCarFromSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCar) {
      await updateCar(selectedCar, updateCarName, updateCarColor);
      await fetchCars();
      setUpdateCarColor("#000000");
      setUpdateCarName("");
      setSelectedCar(null);
    }
  };

  const generateRandomCars = (array: string[], randomArray: string[]): string[] => {
    if (randomArray.length === array.length) {
      return randomArray;
    }
    const item = array[Math.floor(Math.random() * array.length)];
    if (!randomArray.includes(item)) {
      return generateRandomCars(array, [...randomArray, item]);
    } else {
      return generateRandomCars(array, randomArray);
    }
  };
  const randomHandler = () => {
    const randomCars = generateRandomCars(carNames, []);
    randomCars.forEach((r) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      createCar(r, randomColor);
    });
    fetchCars()
  };
  const startRace = () => {
    setWinnerModal(false)
    dispatch(setStatus("reset"));
    setTimeout(() => {
      dispatch(setWinner(null));
      dispatch(setStatus("started"));
      dispatch(setMatch(false));
      setRaceStatus(false);
    }, 1000);
  };
  const resetRace = () => {
    setWinnerModal(false)
    setRaceStatus(true);
    dispatch(setWinner(null));
    dispatch(setStatus("reset"));
    dispatch(setMatch(true));
  };
  useEffect(() => {
    getCarsCount()
      .then((res) => res?.json())
      .then((res) => setTotalCount(res.length));
  }, [cars]);
  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-5">
        <div>
          <button
            disabled={!raceStatus}
            onClick={startRace}
            className="px-3 py-1 disabled:opacity-50 border-2 border-[#69B973] me-2 text-[#69B973] rounded-md uppercase"
            style={{ boxShadow: "0 0 5px 1px #69B973" }}
          >
            Race
            <i className="fa fa-play ms-2"></i>
          </button>
          <button
            onClick={resetRace}
            className="px-3 py-1 disabled:opacity-50 border-2 border-[#985FB0] text-[#985fb0] rounded-md uppercase"
            style={{ boxShadow: "0 0 5px 1px #985FB0" }}
          >
            Reset
            <i className="fa fa-undo ms-2"></i>
          </button>
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-3">
          <input
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="border bg-transparent outline-none rounded-md px-2 py-1 text-white max-w-[200px]"
            placeholder="TYPE CAR BRAND"
          />
          <input className="w-[30px]" value={color} onChange={(e) => setColor(e.target.value)} type="color" name="color" />
          <button className="px-3 py-1 border-2 border-[#985FB0] text-[#985fb0] rounded-md uppercase" style={{ boxShadow: "0 0 5px 1px #985FB0" }}>
            Create
          </button>
        </form>
        <form className="flex items-center gap-3" onSubmit={updateCarFromSubmit}>
          <input
            value={updateCarName}
            required
            onChange={(e) => setUpdateCarName(e.target.value)}
            type="text"
            name="updateCarInput"
            className="border bg-transparent outline-none rounded-md px-2 py-1 text-white max-w-[200px]"
            placeholder="TYPE CAR BRAND"
          />
          <input className="w-[30px]" value={updateCarColor} onChange={(e) => setUpdateCarColor(e.target.value)} type="color" name="color" />
          <button className="px-3 py-1 border-2 border-[#985FB0] text-[#985fb0] rounded-md uppercase" style={{ boxShadow: "0 0 5px 1px #985FB0" }}>
            UPDATE
          </button>
        </form>
        <button
          onClick={randomHandler}
          className="px-3 py-1 border-2 border-[#69B973] me-2 text-[#69B973] rounded-md uppercase"
          style={{ boxShadow: "0 0 5px 1px #69B973" }}
        >
          Generate cars
        </button>
      </div>
      <div className="relative">
        <img src={NextImage} alt="next image" className="w-full" />
        <div className="relative my-4">
          {cars ? (
            <>
              <ul>
                {cars.map((c) => (
                  <li key={c.id}>
                    <Car car={c} removeHandler={removeHandler} selectedCarHandler={selectedCarHandler} />
                  </li>
                ))}
              </ul>
              <div className="absolute h-full top-0 left-[220px] py-2">
                <img className="h-full" src={StartImage} alt="start image" />
              </div>
              <div className="absolute h-full top-0 right-[10px] py-2">
                <img className="h-full" src={FinishImage} alt="finish image" />
              </div>
            </>
          ) : (
            <h1 className="text-[#fff] text-center py-4 text-5xl uppercase" style={{ textShadow: "0 0 5px red" }}>
              no car found
            </h1>
          )}
        </div>
        <img src={NextImage} alt="next image" className="w-full" />
        <div
          className={`${!winnerModal && "hidden"} absolute after:border-4 after:border-[#56DBEA] after:absolute after:w-[95%] after:h-[93%] after:top-[3.5%] after:left-[2.5%] after:rounded-xl text-4xl top-[50%] left-[50%] text-center translate-x-[-50%] translate-y-[-50%] border-4 border-[#A04FA9] px-10 py-12  backdrop-blur-sm rounded-2xl`}
          style={{ boxShadow: "0 0 20px 0 #a04fa9" }}
        >
          <span className="block uppercase text-yellow-500 mb-3">winner:</span>
          <span className="block uppercase text-green-500 mb-3">{winnerInfo.winnerCarName}</span>
          <span className="block uppercase text-green-500">Time: {winnerInfo.time} s</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="uppercase text-white text-3xl" style={{ textShadow: "2.5px -2.5px 1px #418490" }}>
          Garage ({totalCount})
        </div>
        <div className="flex items-center gap-3 uppercase text-[#D2CDD2] text-3xl" style={{ textShadow: "3px -3px 1px #49164F" }}>
          <i onClick={prevPage} className="fa fa-caret-left cursor-pointer text-4xl"></i>
          <p>PAGE #{page}</p>
          <i onClick={nextPage} className="fa fa-caret-right cursor-pointer text-4xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Garage;
