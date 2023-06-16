import axios from "axios";
import React, { useState, useEffect } from "react";
import dummyData from "../dummyData";
import Card from "./Card";
import SearchFilters from "./SearchFilters";
import DistanceCalc from "./distanceCalc";
import { FaChevronDown, FaEllipsisV } from "react-icons/fa";
import MinimumDistanceSlider from "./MultiRangeSlider";
import { useDispatch, useSelector } from "react-redux";
import { getAllCases } from "../features/cases/caseSlice";
import FrontpageMap from "./FrontpageMap";

export default function Frontpage() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [showPriceslider, setShowPriceslider] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [mutiRangeCounterVal, setMutiRangeCounterVal] = useState([0, 10000]);

  const dispatch = useDispatch();
  
const { cases } = useSelector((state) => state.case);

  const [filterData, setFilterData] = useState({
    searchParameter: "",
    minPrice: 0,
    maxPrice: 1000000,
    minFloorArea: "",
    location,
    aconto: false,
    petsAllowed: false,
    balcony: false,
    elevator: false,
    rooms: "",
    propertyType: "",
  });

  const fetchAllCases = () => {
    dispatch(getAllCases());
  };

  useEffect(() => {
    fetchAllCases();
  }, [cases]);

  function toggleShowSlider() {
    setShowPriceslider((prevShown) => !prevShown);
  }
  function toggleShowFilter() {
    setShowAdvancedFilter((prevShown) => !prevShown);
  }

  const cardElement = cases.map((caseItem) => {
    return <Card key={caseItem.id} case={caseItem} />;
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFilterData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    // console.log(filterData);
  }

  //aconto, petsAllowed, elevatorAvalible, balcony, rooms, areal
  const advancedSearchFilter = (
    <div className=" p-3 h-auto w-96 bg-white border border-gray rounded-lg">
      <h1>Ameneties</h1>
      <div className="">
        <form>
          <ul className="grid grid-cols-2 pb-3">
            <li className="w-40">
              <div className="flex items-center">
                <input
                  className="mr-1"
                  type="checkbox"
                  name="aconto"
                  checked={filterData.aconto}
                  onChange={handleChange}
                />
                <label>Aconto</label>
              </div>
            </li>
            <li className="w-40">
              <div className="flex items-center pl-3">
                <input
                  className="mr-1"
                  type="checkbox"
                  name="petsAllowed"
                  checked={filterData.petsAllowed}
                  onChange={handleChange}
                />
                <label>Pets allowed</label>
              </div>
            </li>
            <li className="w-40">
              <div className="flex items-center">
                <input
                  className="mr-1"
                  type="checkbox"
                  name="balcony"
                  checked={filterData.balcony}
                  onChange={handleChange}
                />
                <label>Balcony</label>
              </div>
            </li>
            <li className="w-44">
              <div className="flex items-center pl-3">
                <input
                  className="mr-1"
                  type="checkbox"
                  name="elevator"
                  checked={filterData.elevator}
                  onChange={handleChange}
                />
                <label>Elevator available</label>
              </div>
            </li>
          </ul>
          <div className="grid gap-6 grid-cols-2">
            <div className="w-40">
              <input
                className="flex pl-2 h-8  w-36 border border-gray-300 rounded-md items-center focus:outline-none"
                type="text"
                name="rooms"
                placeholder="Rooms"
                value={filterData.rooms}
                onChange={handleChange}
              />
            </div>
            <div className="w-40">
              <input
                className="flex pl-2 h-8 w-36 border border-gray-300 rounded-md items-center focus:outline-none"
                type="text"
                name="minFloorArea"
                placeholder="m3"
                value={filterData.minFloorArea}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="  shadow-inner font-Nunito bg-slate-50">
      <div className="h-screen bg-hero bg-cover select-none flex  w-full">
        {/* <img className="h-full w-full bg-cover select-none" src="src\assets\frontpageImage.jpg"/> */}
        <div className=" flex flex-col justify-center items-center w-screen">
          <div className="lg:h-28"/>
          <div className="flex flex-col items-center mb-8">
            <h1 className="font-bold lg:text-5xl text-4xl text-white pb-2">Find Your Dream Home</h1>
            <h2 className="  lg:text-2xl text-2xl text-white">Boliger i hele danmark</h2>
          </div>
          <div className="flex bg-white-rgba h-auto lg:h-36 w-5/6 lg:w-3/5 rounded-xl justify-center items-center">
            <div className="flex bg-white pt-4 lg:pt-0 h-auto lg:h-32 w-[98%] m-2 rounded-xl  items-center justify-between flex-col lg:flex-row">
              <input
                className="flex lg:ml-6 pl-2 lg:mr-3 h-12 w-11/12 lg:w-1/4 border border-gray-300 rounded-md items-center focus:outline-none"
                placeholder="Enter keyword..."
                type="text"
                name="searchParameter"
                onChange={handleChange}
                value={filterData.searchParameter}
              />
              <div className="flex mt-4 lg:mt-0 lg:mr-3 pl-2 h-12 w-11/12 lg:w-1/5 border border-gray-300 rounded-md items-center relative">
                {/* <label>Property Type</label> */}
                <select
                  className="w-full relative focus:outline-none bg-white"
                  id="propertyType"
                  value={filterData.propertyType}
                  onChange={handleChange}
                  name="propertyType"
                >
                  <option value="">Property Type</option>
                  <option value="Hus">1</option>
                  <option value="Lejlighed">2</option>
                </select>
              </div>
              <div className="w-11/12 mt-4 lg:mt-0 lg:w-1/6">
                <DistanceCalc />
              </div>
              <div className="flex flex-col mt-4 lg:mt-0 w-11/12 lg:w-1/6">
                <button
                  onClick={toggleShowSlider}
                  className="flex mr-3 pl-2 h-12 w-full border border-gray-300 rounded-md items-center focus:outline-none"
                >
                  Price
                </button>
                <div className="absolute mt-14">
                  {showPriceslider && (
                    <MinimumDistanceSlider
                      minVal={filterData.minPrice}
                      maxVal={filterData.maxPrice}
                      handleChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col  lg:w-auto w-11/12">
                <button
                  onClick={toggleShowFilter}
                  className="flex w-full justify-between mt-4 lg:mt-0 mr-3 lg:pl-2 h-12 lg:w-[10%] border lg:border-none border-gray-300  rounded-md items-center focus:outline-none"
                >
                  <p className="flex items-center w-full pl-2 lg:pl-0">
                    Filtre
                  </p>
                  {/* <FaEllipsisV/> */}
                </button>
                <div className="absolute mt-14">
                  {showAdvancedFilter && advancedSearchFilter}
                </div>
              </div>
              <button className="flex justify-center lg:mr-3 h-12 w-11/12 lg:w-1/6 border-2 text-white mt-4 lg:mt-0 mb-4 lg:mb-0 bg-sky-500 border-sky-500 rounded-md items-center transition-all focus:outline-none hover:bg-white hover:text-sky-500 hover:transition-all">
                Søg
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-5">
        <SearchFilters />
        <div className="flex flex-row h-screen w-full mt-5">
          <div className=" h-full w-1/2 flex flex-wrap ">{cardElement}</div>
          <div className=" h-full w-1/2 pl-5 ">
            <div className=" bg-black h-full w-full rounded-3xl lg:flex hidden">
              <FrontpageMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
