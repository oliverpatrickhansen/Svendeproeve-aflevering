import React from "react";
import SearchCaseCard from "./searchCaseCard";



export default function SearchPage(){
    return(
        // <div className="flex justify-center items-center h-screen bg-slate-700">
        //     <SearchCaseCard/>
        // </div>
        <div className="font-Nunito">
            <div className="h-20 bg-sky-400 shadow-md"/>
            <div className="flex flex-col ">
                <div className="flex flex-col items-center">
                    <h3 className="text-gray-600 font-semibold text-2xl pt-2 pb-2">Listings</h3>
                    <div className="flex flex-row">
                        <div className="lg:flex flex-col hidden lg:d h-fit w-auto border border-slate-300 rounded-lg shadow-lg mr-5">
                            <form className="flex flex-col">
                                <input className="w-64 rounded-md border border-slate-300 h-10 mt-5 ml-5 mr-5 p-1" placeholder="Keyword"/>
                                <select className="rounded-md border border-slate-300 h-10 mt-3 ml-5 mr-5 p-1">
                                    <option value="">Property Type</option>
                                    <option value="Hus">1</option>
                                    <option value="Lejlighed">2</option>
                                </select>
                                <input className="rounded-md border border-slate-300 h-10 mt-3 ml-5 mr-5 p-1" placeholder="Location"/>
                                <input className="rounded-md border border-slate-300 h-10 mt-3 ml-5 mr-5 mb-5 p-1" placeholder="price"/>

                            </form>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row h-20 border items-center pl-5 border-slate-300 rounded-lg shadow-lg">
                                <p>x Search results</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                            <SearchCaseCard/>
                            <SearchCaseCard/>
                            <SearchCaseCard/>
                            <SearchCaseCard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
