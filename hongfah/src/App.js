import './App.css';
import AppRouter from "./AppRouter"
import Navbar from "./components/Navbar"
import Drawer from './components/Drawer';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider } from "antd";
import Thai from "antd/lib/locale/th_TH";


function App() {
  const urlpath = useLocation().pathname
  return (
    <ConfigProvider locale={Thai}>
    <div className='app' >

      {urlpath !== "/login" && urlpath !== "/" ? (
      <div className="grid grid-cols-12">
      <div className="bg-[#D3EDFD] col-span-3 flex flex-col ">
        <Drawer/>
      </div>
      {/* navbar end */}
      <div className="col-span-9 bg-[#fff] mt-[3%] mb-10">
      <div className="text-right mr-[5%]">
          <Navbar/>
        </div>
      <AppRouter/>
      </div>
    </div>
      ):<AppRouter/>}

    </div>
    </ConfigProvider>
    );
}

export default App;
