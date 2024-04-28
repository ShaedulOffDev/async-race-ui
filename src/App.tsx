import { Link, Route, Routes } from "react-router-dom";
import { Garage, Winners } from "./components";

const App = () => {
  return (
    <div className="container">
      <Link className="border px-3 py-2 rounded ms-2 mt-2 inline-block" to="/">
        Garage
      </Link>
      <Link className="border px-3 py-2 rounded ms-2 mt-2 inline-block" to="winners">
        Winners
      </Link>
      <Routes>
        <Route path="/" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </div>
  );
};

export default App;
