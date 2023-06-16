import React from "react";
import { FaHouseUser } from "react-icons/fa";

export default function Footer(){
    return(
        <div className="bg-sky-200 w-full p-5 shadow-inner font-Nunito pr-14 pl-14 h-44">
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-row items-center">         
                    <FaHouseUser className="hr-6 text-sky-500 text-3xl"/>
                    <span className="text-black font-semibold text-3xl ">SvendePrøve</span>
                </div>
                <div className="flex flex-col text-2xl">
                    <h2>Find bolig</h2>
                </div>
                <div className="flex flex-col text-2xl">
                    <h2>Om os</h2>
                </div>
                <div className="flex flex-col text-2xl">
                    <h2>Kontakt</h2>
                </div>
            </div>
        </div>
    )
}