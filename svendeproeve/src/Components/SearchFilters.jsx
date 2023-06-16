import { React,useState } from "react";
import { FaSearch } from "react-icons/fa";


export default function SearchFilters(){

    const[formData, setFormData] = useState(
        {
            searchParameter:"",
            forSale:"",
            houseType:"",
            minPrice:0,
            maxPrice:1000000,
            floorArea:60

        }
    )

    function handleChange(event){
        const{name,value,type,checked} = event.target
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
        console.log(formData)
    }

    function togglePrice(){
        
    }

    return(
        <form className="flex flex-col lg:flex-row pt-3 justify-between w-full lg:border-none border border-slate-300 rounded-md p-1 lg:p-0">
            <div className="flex bg-slate-200 rounded-lg items-center p-1 mr-5 w-full lg:w-1/5">
                <FaSearch className="ml-1"/>
                <input
                className="bg-slate-200 rounded-md w-64"
                type="text"
                placeholder={"Enter an adress, city or ZIP code"}
                onChange={handleChange}
                name="searchParameter"
                value={formData.searchParameter}
                />
            </div>
            <div className=" flex items-center rounded-lg bg-slate-200 mt-2 lg:mt-0 mr-5 w-full lg:w-1/5">
                <p className="font-semibold ml-1">For Sale</p>
                <select 
                    className="bg-slate-200 rounded-lg p-1"
                    id="forSale"
                    value={formData.forSale}
                    onChange={handleChange}
                    name="forSale"
                >
                    <option value="yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
             
             <div className=" flex items-center rounded-lg bg-slate-200 mt-2 lg:mt-0 mr-5 w-full lg:w-1/5">
                <p className="font-semibold ml-1">Type:</p>
                <select
                    className="bg-slate-200 rounded-lg p-1"
                    id="houseType"
                    value={formData.houseType}
                    onChange={handleChange}
                    name="houseType"
                >
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                </select>
             </div>

            <div className=" flex items-center rounded-lg bg-slate-200 mt-2 lg:mt-0 mr-5 w-full lg:w-1/5">
                <p className="font-semibold ml-1">Price:</p>

            </div>
            <div className=" flex items-center rounded-lg bg-slate-200 mt-2 lg:mt-0 w-full lg:w-1/5">
                <p className="font-semibold ml-1">Floor Area</p>
                <select
                    className="bg-slate-200 rounded-lg p-1"
                    id="floorArea"
                    value={formData.floorArea}
                    onChange={handleChange}
                    name="floorArea"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </form>
    )
}