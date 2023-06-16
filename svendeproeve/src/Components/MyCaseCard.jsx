import React from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCase } from "../features/cases/caseSlice";

export default function MyCaseCard(props) {
  const dispatch = useDispatch();

  return (
    <div className="font-Nunito h-40  border-b border-slate-300">
      <div className="flex flex-row justify-between items-center h-full">
        <div className="itm">
          <div className="flex flex-row pl-4">
            <div>
              <img
                className="h-32 max-w-lg object-contain rounded-3xl"
                src={`${props.case.image}`}
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <p>{props.case.title}</p>
              <p>{props.case.address}</p>
              <p>${props.case.rent}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="pr-40">
            <p>{props.case.availableFrom}</p>
          </div>
          <div className="pr-32">
            <div className="bg-sky-500 text-white rounded-md p-1">
              <p>Pending</p>
            </div>
          </div>
          <div className="flex pr-32">
            <div className="flex items-center">
              <button
                onClick={() => dispatch(deleteCase(props.case._id))}
                className="text-lg bg-slate-200 rounded-md p-1 mr-2 text-sky-500"
              >
                <FaTrash />
              </button>

              <Link to={`/editcase/${props.case._id}`}>
                <button className="text-lg bg-slate-200 rounded-md p-1 text-sky-500">
                  <FaPencilAlt />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
