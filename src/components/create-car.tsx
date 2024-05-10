import { useState } from "react";
import { createCar, getCar } from "../service/api.service";
import { setCar } from "../slice";
import { useDispatch } from "react-redux";
import { Button } from "../ui";

interface PropsTypes{
  limit: number,
  carsLength: number,
  totalCount: number,
  setTotalCount: (number: number)=>void,
}

const CreateCar: React.FC<PropsTypes> = ({limit, carsLength, totalCount, setTotalCount}) => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const dispatch = useDispatch()

  const createCarHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createCar(name, color);
    if (carsLength < limit) {
      const fetchCar = await getCar(res.id);
      dispatch(setCar(fetchCar));
    }
    if(carsLength == 7){
      setTotalCount(totalCount + 1)
    }
    setName("");
    setColor("#000000");
  };

  return (
    <form onSubmit={createCarHandler} className="flex items-center gap-3">
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
      <Button color="#985FB0" classes="px-3 py-1">Create</Button>
    </form>
  )
}

export default CreateCar