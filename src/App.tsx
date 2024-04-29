import { Link, Route, Routes } from "react-router-dom";
import { Garage, Winners } from "./components";
import { CyanNextImage, Logo, PinkNextImage } from "./assets";

const App = () => {
  return (
    <div className="container pb-20">
      <div className="flex items-center justify-between py-20">
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
        <div className="flex">
          <div className="flex items-end py-5">
            <img width={400} src={PinkNextImage} alt="Pink next image" />
          </div>
          <div className="mx-5" style={{filter: 'drop-shadow(0 0 30px #985fb0)'}}>
            <img width={400} src={Logo} alt="logo" />
          </div>
          <div className="py-5">
            <img width={400} src={CyanNextImage} alt="Cyan next image" />
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
