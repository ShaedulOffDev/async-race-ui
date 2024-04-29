import { useDispatch, useSelector } from "react-redux";
import { createCar, getCar, getCars, removeCar, updateCar } from "../../service/api.service";
import { RootState } from "../../store";
import React, { useCallback, useEffect, useState } from "react";
import { setCar, setCars } from "../../slice";
import { CarI } from "../../types";
import { Car } from "../";
import { FinishImage, NextImage, StartImage } from "../../assets";

const Garage = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state: RootState) => state.cars) as CarI[];
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(7);
  const [updateCarName, setUpdateCarName] = useState<string>('');
  const [updateCarColor, setUpdateCarColor] = useState<string>('#000000');
  const [selectedCar, setSelectedCar] = useState<number|null>(null)

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
      if(cars.length < limit){
        const fetchCar = await getCar(res.id);
        dispatch(setCar(fetchCar));
      }
      setName('')
      setColor('#000000')
    } else {
      console.log("please enter a car name");
    }
  };

  const removeHandler = async (id: number) => {
    await removeCar(id);
    await fetchCars();
  };
  const nextPage = () => {
    if(cars.length >= limit)
    setPage(page + 1)
  }
  const prevPage = () => {
    if(page > 1){
      setPage(page - 1)
    }
  }

  const selectedCarHandler = (id: number) => {
    setSelectedCar(id)
  }
  const updateCarFromSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(selectedCar){
      await updateCar(selectedCar, updateCarName, updateCarColor)
      await fetchCars();
      setUpdateCarColor('#000000')
      setUpdateCarName('')
    }
  }
  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-5">
        <div>
          <button
            className="px-3 py-1 border-2 border-[#69B973] me-2 text-[#69B973] rounded-md uppercase"
            style={{ boxShadow: "0 0 5px 1px #69B973" }}
          >
            Race
            <i className="fa fa-play ms-2"></i>
          </button>
          <button className="px-3 py-1 border-2 border-[#985FB0] text-[#985fb0] rounded-md uppercase" style={{ boxShadow: "0 0 5px 1px #985FB0" }}>
            Reset
            <i className="fa fa-undo ms-2"></i>
          </button>
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-3">
          <input
            value={name}
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
        <button className="px-3 py-1 border-2 border-[#69B973] me-2 text-[#69B973] rounded-md uppercase" style={{ boxShadow: "0 0 5px 1px #69B973" }}>
          Generate cars
        </button>
      </div>
      <div>
        <img src={NextImage} alt="next image" className="w-full" />
        <div className="relative my-4">
          {cars ? (
            <>
              <ul>
                {cars.map((c) => (
                  <li key={c.id}>
                    <Car car={c} removeHandler={removeHandler} selectedCarHandler={selectedCarHandler}/>
                  </li>
                ))}
              </ul>
              <div className="absolute h-full top-0 left-[220px]">
                <img className="h-full" src={StartImage} alt="start image" />
              </div>
              <div className="absolute h-full top-0 right-[10px]">
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
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="uppercase text-white text-3xl" style={{ textShadow: "2.5px -2.5px 1px #418490" }}>
          Garage (107)
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
