import "./App.css";
import Create from "./components/Create";
import Edit from "./components/Edit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import ItemsTable from "./components/ItemsTable";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemsTable />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
