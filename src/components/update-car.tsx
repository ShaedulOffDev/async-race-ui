import { useState } from "react";
import { updateCar } from "../service/api.service";
import { Button } from "../ui";

interface PropsTypes {
  selectedCar: number | null,
  setSelectedCar: (car: number | null) => void,
  fetchCars: () => void,
}

const UpdateCar: React.FC<PropsTypes> = ({selectedCar, setSelectedCar, fetchCars}) => {
  const [updateCarName, setUpdateCarName] = useState<string>("");
  const [updateCarColor, setUpdateCarColor] = useState<string>("#000000");

  const updateCarFromSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCar) {
      await updateCar(selectedCar, updateCarName, updateCarColor);
      fetchCars();
      setUpdateCarColor("#000000");
      setUpdateCarName("");
      setSelectedCar(null);
    }
  };

  return (
    <form className="flex items-center gap-3" onSubmit={updateCarFromSubmit}>
      <input
        value={updateCarName}
        required
        onChange={(e) => setUpdateCarName(e.target.value)}
        type="text"
        name="updateCarInput"
        className="border disabled:opacity-50 bg-transparent outline-none rounded-md px-2 py-1 text-white max-w-[200px]"
        placeholder="TYPE CAR BRAND"
        disabled={selectedCar == null}
      />
      <input
        className="w-[30px] disabled:opacity-50"
        disabled={selectedCar == null}
        value={updateCarColor}
        onChange={(e) => setUpdateCarColor(e.target.value)}
        type="color"
        name="color"
      />
      <Button classes="px-3 py-1" disabled={selectedCar == null} color="#985FB0">UPDATE</Button>
    </form>
  );
};

export default UpdateCar;
