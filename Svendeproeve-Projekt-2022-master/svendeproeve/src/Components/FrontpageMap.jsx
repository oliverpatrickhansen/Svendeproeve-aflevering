import {useState,useRef,useEffect,useMemo} from "react";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import dummyData from "../dummyData";
import { FaMapMarkerAlt, FaBed, FaBath, FaRuler } from "react-icons/fa";
import Map, {Marker, Popup} from 'react-map-gl';

import { useDispatch, useSelector } from "react-redux";
import { getAllCases } from "../features/cases/caseSlice";
import cities from "../cities";

export default function FrontpageMap(){
  mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmVyaGFuc2VuIiwiYSI6ImNsYXc3dWdmZDBkZ2wzbm1oZzV6ZTVxOXUifQ.tWutup-cpAISS3niRDRPoA';
  const dispatch = useDispatch();
  const { cases } = useSelector((state) => state.case);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllCases());
      // console.log(cases);
    };
    fetchData();
  }, []);

   const [showPopup, setShowPopup] = useState(null)

  //  function togglePopup(event){
  //   event.preventDefault();
    
  //   setShowPopup(prevShowPopup => !prevShowPopup)
  //   console.log(showPopup)
  // }
// console.log(cases);
  const pins = useMemo(
    () =>
    dummyData.map((city, index) => (
      // cases.map((cases, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          // longitude={cases.longitude}
          // latitude={cases.latitude}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            // setShowPopup(cases);
            setShowPopup(city);
          }}
        >
          <FaMapMarkerAlt className="text-4xl text-sky-900 cursor-pointer"/>
        </Marker>
      )),
    []
  );


    return(
    <Map
      initialViewState={{
        longitude: 11.34409,
        latitude: 55.73320,
        zoom: 7,
        bearing: 0,
        pitch: 10
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"  
    >

    {/* <Marker 
      longitude={12.34} 
      latitude={55.73} 
      anchor="bottom"
      onClick={e =>{
        setShowPopup(true)
      }}
      >
      <FaMapMarkerAlt className="text-xl text-red-600"/>
    </Marker> */}
    {pins}
    {showPopup && 
      <Popup
        anchor="top"
        longitude={Number(showPopup.longitude)}
        latitude={Number(showPopup.latitude)}
        onClose={() => setShowPopup(null)}
      >
      <div className="">
        <button>
          <img className="rounded-t-md" src="https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
          <p className="font-bold text-md">$10</p>
          <div className="flex flex-row mb-3 justify-evenly mt-2 font-semibold">
          <div className="flex flex-row justify-center items-center bg-slate-200 rounded-lg h-8 w-16  mr-2">
            <FaBed className="text-orange-500 mr-2" />
            1
          </div>
          <div className="flex flex-row justify-center items-center bg-slate-200 rounded-lg h-8 w-16 mr-2">
            <FaBath className="text-sky-500 mr-2" />
            2
          </div>
          <div className="flex flex-row justify-center items-center bg-slate-200 rounded-lg h-8 w-20">
            <FaRuler className="text-emerald-500 mr-2" />
            10 m²
          </div>
        </div>
        </button>
      </div>
    </Popup>}
  </Map>
    )
}