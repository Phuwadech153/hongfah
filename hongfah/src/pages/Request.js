import React, { useEffect } from "react";
import RequestStudent from "../components/RequestStudent";
import { connect } from "react-redux";
import axios from "axios";

function Request() {
  

  return (
      <div className="col-span-9 bg-[#fff] mt-[3%]">
        <RequestStudent/>


      </div>

  );
}

export default Request;
