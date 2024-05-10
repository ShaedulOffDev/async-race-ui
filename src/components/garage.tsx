import { useDispatch, useSelector } from "react-redux";
import { createCar, createWinner, getCar, getCars, getCarsCount, getWinner, removeCar, updateWinner } from "../service/api.service";
import { RootState } from "../store";
import { useCallback, useEffect, useRef, useState } from "react";
import { resetAll, setCars, setPageS, setStatus, setWinner } from "../slice";
import { Car, CreateCar, UpdateCar } from "./";
import { FinishImage, NextImage, StartImage } from "../assets";
import { carNames, colors } from "../constants";
import { Button } from "../ui";

interface winnerI {
  winnerCarName: string;
  time: number;
}

const Garage = () => {
  const dispatch = useDispatch();
  const { cars, winner, bestTime, pageS } = useSelector((state: RootState) => state.cars);
  const [page, setPage] = useState<number>(pageS);
  const [winnerInfo, setWinnerInfo] = useState<winnerI>({
    winnerCarName: "",
    time: 0,
  });
  const [limit] = useState<number>(7);
  const [winnerModal, setWinnerModal] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [raceStatus, setRaceStatus] = useState<boolean>(true);
  const pageRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    async function winnerHandler() {
      if (!raceStatus && winner != null) {
        setRaceStatus(true);
        const res = await getWinner(winner);
        if (res.wins) {
          const wins: number = res.wins + 1;
          updateWinner(winner, wins, Math.min(bestTime, res.time));
        } else {
          createWinner(winner, 1, bestTime);
        }
        const car = await getCar(winner);
        const winnerCar = { winnerCarName: car.name, time: bestTime };
        setWinnerInfo(winnerCar);
        setWinnerModal(true);
      }
    }
    winnerHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  const fetchCars = useCallback(() => {
    clearTimeout(pageRef.current as NodeJS.Timeout);
    pageRef.current = setTimeout(async () => {
      const fetchedCars = await getCars(page, limit);
      dispatch(setCars(fetchedCars));
    }, 350);
  }, [dispatch, limit, page]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const nextPage = () => {
    if (page < Math.ceil(totalCount / limit)) {
      setPage(page + 1);
      dispatch(setPageS(page + 1));
    } else {
      dispatch(setPageS(1));
      setPage(1);
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      dispatch(setPageS(page - 1));
    } else {
      dispatch(setPageS(Math.ceil(totalCount / limit)));
      setPage(Math.ceil(totalCount / limit));
    }
  };

  const selectedCarHandler = (id: number) => {
    setSelectedCar(id);
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
  const randomHandler = async () => {
    const randomCars = generateRandomCars(carNames, []);
    const createCarPromises = randomCars.map(async (r) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      await createCar(r, randomColor);
    });
    await Promise.all(createCarPromises);
    fetchCars();
  };

  const startRace = () => {
    setWinnerModal(false);
    dispatch(setStatus("reset"));
    setRaceStatus(false);
    setTimeout(() => {
      dispatch(setStatus("started"));
      dispatch(setWinner(null));
    }, 1000);
  };
  const resetRace = () => {
    setWinnerModal(false);
    setRaceStatus(true);
    dispatch(resetAll());
  };

  const removeHandler = async (id: number) => {
    await removeCar(id);
    fetchCars();
  };

  useEffect(() => {
    getCarsCount()
      .then((res) => res?.json())
      .then((res) => setTotalCount(res.length));
  }, [cars]);

  return (
    <div className="p-3">
      <div className="flex items-center gap-y-3 justify-between mb-5 max-[1540px]:flex-wrap">
        <div className="max-[1280px]:order-1 max-[470px]:w-full max-[470px]:text-center max-[1280px]:w-1/2">
          <Button color="#69B973" disabled={!raceStatus} onClick={startRace} classes="px-3 py-1 me-2">
            Race
            <i className="fa fa-play ms-2"></i>
          </Button>
          <Button color="#985FB0" onClick={resetRace} classes="px-3 py-1">
            Reset
            <i className="fa fa-undo ms-2"></i>
          </Button>
        </div>
        <div className="max-[850px]:w-full flex max-[850px]:justify-center max-[1280px]:order-3 max-[1280px]:w-1/2">
          <CreateCar limit={limit} totalCount={totalCount} setTotalCount={setTotalCount} carsLength={cars.length} />
        </div>
        <div className="max-[850px]:w-full max-[1280px]:order-4 max-[1280px]:w-1/2 flex max-[850px]:justify-center justify-end">
          <UpdateCar selectedCar={selectedCar} setSelectedCar={setSelectedCar} fetchCars={fetchCars} />
        </div>
        <div className="max-[1280px]:order-2 max-[1280px]:w-1/2 max-[470px]:text-center text-end max-[470px]:w-full">
          <Button color="#69B973" onClick={randomHandler} classes="px-3 py-1">
            Generate cars
          </Button>
        </div>
      </div>
      <div className="relative">
        <img src={NextImage} alt="next image" className="w-full" />
        <div className="relative my-4">
          {cars.length > 0 ? (
            <>
              <ul>
                {cars.map((c) => (
                  <li key={c.id}>
                    <Car car={c} removeHandler={removeHandler} selectedCarHandler={selectedCarHandler} />
                  </li>
                ))}
              </ul>
              <div className="absolute h-full top-0 left-[220px] max-[768px]:left-[185px] py-2">
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
          className={`${
            !winnerModal && "hidden"
          } z-[99999] min-w-[300px] absolute after:border-4 after:border-[#56DBEA] after:absolute after:w-[95%] after:h-[93%] after:top-[3.5%] after:left-[2.5%] after:rounded-xl text-4xl top-[50%] left-[50%] text-center translate-x-[-50%] translate-y-[-50%] border-4 border-[#A04FA9] px-10 py-12  backdrop-blur-sm rounded-2xl`}
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
          <button onClick={prevPage} className="cursor-pointer text-4xl">
            <i className="fa fa-caret-left"></i>
          </button>
          <p>PAGE #{page}</p>
          <button onClick={nextPage} className="cursor-pointer text-4xl">
            <i className="fa fa-caret-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Garage;
