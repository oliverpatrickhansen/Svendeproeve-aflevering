import React from "react";
import DistanceCalc from "./distanceCalc";
import MinimumDistanceSlider from "./MultiRangeSlider";


export default function About(){
    return(
        <h1 className="flex justify-center items-center h-screen bg-slate-700">
            <div>
            {/* {DistanceCalc()} */}
            <MinimumDistanceSlider/>
            </div>
        </h1>
    )
}
