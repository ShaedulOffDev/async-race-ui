import { Link, Route, Routes } from "react-router-dom";
import { Garage, Winners } from "./components";
import { CyanNextImage, Logo, PinkNextImage } from "./assets";

const App = () => {
  return (
    <div className="max-w-[1920px] px-[200px] max-[1440px]:px-[100px] max-[1023.5px]:px-[50px] max-[768.5px]:px-[20px] pb-20">
      <div className="flex items-center max-[1023.5px]:flex-col-reverse justify-between py-20">
        <div className="inline-flex flex-col">
          <Link
            className="px-4 py-2 border-2 mb-3 border-[#BDFFFF] text-2xl text-[#BDFFFF] rounded-md block uppercase"
            style={{ boxShadow: "0 0 5px 1px #BDFFFF" }}
            to="/"
          >
            Garage
          </Link>
          <Link
            className="px-4 py-2 border-2 border-[#985FB0] text-[#985fb0] text-2xl rounded-md block uppercase"
            style={{ boxShadow: "0 0 5px 1px #985FB0" }}
            to="winners"
          >
            Winners
          </Link>
        </div>
        <div className="grid grid-cols-3 px-[50px]">
          <div className="flex items-end py-5">
            <img className="w-full" src={PinkNextImage} alt="Pink next image" />
          </div>
          <div className="mx-5" style={{filter: 'drop-shadow(0 0 30px #985fb0)'}}>
            <img className="w-full" src={Logo} alt="logo" />
          </div>
          <div className="py-5">
            <img className="w-full" src={CyanNextImage} alt="Cyan next image" />
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </div>
  );
};

export default App;
