import React from "react";
import { CiLocationOn } from 'react-icons/ci';



export default function SearchCaseCard(){
    return(
        <div className="font-Nunito h-[360px] w-[22rem] bg-white hover:shadow-2xl transition-all hover:transition-all rounded-lg p-2 shadow-xl m-2">
            {/* <div className="flex flex-col relative">
                <div className="absolute">
                    <img className="rounded-lg max-h-56  z-10" src="https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                </div>
                <div className="flex flex-col absolute h-max">
                    <p className="z-20 m-4 bg-slate-600 rounded-sm text-sm text-white pt-[2px] pb-[2px] pr-3 pl-3">Featured</p>
                    <p className="z-20">Featured</p>
                </div>
                <div>
                    <h1>

                    </h1>
                </div>
            </div> */}
            <div className="w-full h-56 relative">
                <div className="absolute h-full w-full">
                    <img className="rounded-lg max-h-56 object-fill" src="https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                </div>
                <p className="absolute top-3.5 left-3.5 bg-slate-600 rounded-[3px] text-white text-sm pt-[2px] pb-[2px] pr-3 pl-3">Featured</p>
                <p className="absolute bottom-3.5 left-3.5 text-white text-xl font-semibold">$15000/mo</p>
            </div>
            <div className="ml-3 mt-5">
                <h3 className="text-sky-400">Apartment</h3>
                <a href="" className="font-semibold text-gray-700 pt-1">Luxary Family Home</a>
                <div className="flex flex-row text-gray-700 items-center pt-1 text-sm">
                    <p><CiLocationOn/></p>
                    <p>Telegrafvej 9, 2750 Ballerup</p>
                </div>
                <div className="flex flex-row text-gray-700 text-sm pt-1">
                    <p className="pr-6">Beds: 1</p>
                    <p className="pr-6">Rooms: 1</p>
                    <p>SqFt: 82</p>
                </div>
            </div>
        </div>
    )
}
