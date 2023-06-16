import React from "react";
import { FaBed, FaBath, FaRuler } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <div className="flex flex-col max-w-[30em] w-[27rem]  mr-5 grow-0 shrink-0 relative h-max bg-white rounded-t-3xl rounded-b-2xl shadow-sm mb-5">
      <img
        src={`${props.case.image}`}
        className="object-cover rounded-t-2xl grow-0 w-full h-52"
      ></img>
      <p className="ml-5 font-bold text-xl max-w-sm">
        ${" "}
        <Link to={`/case/${props.case._id}`} state={props.case._id}>
          {props.case.title}
        </Link>
      </p>
      <p className="ml-5 max-w-sm"> {props.case.address}</p>
      <div className="flex flex-row mb-3 justify-evenly mt-2 font-semibold">
        <div className="flex flex-row justify-center items-center bg-slate-200 rounded-lg h-8 w-16  mr-2">
          <FaBed className="text-orange-500 mr-2" />
          {props.case.rooms}
        </div>
        <div className="flex flex-row justify-center items-center bg-slate-200 rounded-lg h-8 w-20">
          <FaRuler className="text-emerald-500 mr-2" />
          {props.case.size} m²
        </div>
      </div>
    </div>
  );
}
