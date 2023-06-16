import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createCase } from "../features/cases/caseSlice";
import CaseMap from './caseMap';
import mapboxgl from 'mapbox-gl';
import { format } from "date-fns";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Map } from 'react-map-gl';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function CreateCase() {

  mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmVyaGFuc2VuIiwiYSI6ImNsYXc3dWdmZDBkZ2wzbm1oZzV6ZTVxOXUifQ.tWutup-cpAISS3niRDRPoA';

  const [formData, setFormData] = useState({
    title: "ass",
    address: "asd",
    city: "asdd",
    firstDescription: "asd",
    secondDescription: "asd",
    thirdDescription: "asd",
    propertyType:"",
    rooms: "2",
    size: "1",
    availableFrom: "",
    deposit: "123",
    rent: "1212",
    prepaidRent: "123",
    isAconto: false,
    heatPrice: "12312",
    waterPrice: "123123",
    longitude: "1231",
    latitude: "12312",
    petsAllowed: false,
    elevatorAvailable: false,
    balcony: false,
    isReserved: false,
    image: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [imageUpload, setImageUpload] = useState("");
  // This is an array that retrieves all images in the cloud storage
  const [imageList, setImageList] = useState([]);

  const imageTypes = ["image/png", "image/jpeg"];
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false)

  const imageListRef = ref(storage, "caseImages");


  const {
    title,
    address,
    city,
    firstDescription,
    secondDescription,
    thirdDescription,
    rooms,
    size,
    availableFrom,
    deposit,
    rent,
    prepaidRent,
    isAconto,
    heatPrice,
    waterPrice,
    longitude,
    latitude,
    petsAllowed,
    elevatorAvailable,
    balcony,
    isReserved,
    image,
  } = formData;

  useEffect(() => {
    if (imageUpload) {
      if (imageTypes.includes(imageUpload.type)) {
        const functionImageUpload = async () => {
          const imageRef = ref(
            storage,
            `caseImages/${imageUpload.name + uuidv4()}`
          );
          const snapshot = await uploadBytes(imageRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);
          setImageList((current) => [...current, url]);
        };
        setError("");
        functionImageUpload();
      } else {
        setImageUpload(null);
        setError("Please select an image file (png or jpeg)");
      }
    }
  }, [imageUpload]);

  const imageHandling = (e) => {
    setImageUpload(e.target.files[0]);
  };

  function handleChange(event){
    const{name,value,type,checked} = event.target
    setFormData(prevFormData => {

        return{
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
    
}
const onSubmit = (e) => {
  e.preventDefault();
  if(title.length==0 || address.length==0 || city.length==0 || firstDescription.length==0 ||secondDescription.length==0 ||thirdDescription.length==0 ||rooms.length==0 ||heatPrice.length==0 ||
    waterPrice.length==0 ||prepaidRent.length==0 ||size.length==0 ||availableFrom.length==0 ||rooms.length==0 ||longitude.length==0 ||latitude.length==0){
    setIsError(true)
    // console.log("error");
  }else{
    setIsError(false)
    const caseData = {
      title,
      address,
      city,
      firstDescription,
      secondDescription,
      thirdDescription,
      rooms,
      size,
      availableFrom: format(new Date(availableFrom), "dd/MM/yyyy"),
      deposit,
      rent,
      prepaidRent,
      isAconto,
      heatPrice,
      waterPrice,
      longitude,
      latitude,
      petsAllowed,
      elevatorAvailable,
      balcony,
      isReserved,
      image: imageList,
    };
    document.querySelector(".file-upload").value = "";
    dispatch(createCase(caseData));
    navigate('/Dashboard')
  }
};

if(user.role =="Admin"){
  return (
    <form onSubmit={onSubmit} className='flex flex-col'>  
      <div className='font-Nunito bg-sky-500 h-20'/>
      <div className='w-11/12 self-center pt-20'>
        <label className='font-bold text-2xl text-slate-800'>Add New Property</label>
        <div className='flex flex-col h-auto w-full bg-white rounded-md self-center pt-4 pl-16 pr-16 pb-4'>
          <label className='font-bold text-xl text-slate-800'>Create Listing</label>
            <div>
              <p className='pt-5 font-semibold text-lg'>Property Title</p>
              <input
                className='flex items-center text-lg pl-2 w-full h-14 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500'
                type="text"
                placeholder=''
                onChange={handleChange}
                name="title"
                value={title}
                />
                {isError&&title.length<=0?
                <p className="text-red-500">Indtast title</p>:""}
                
            </div>
            <div>
              <p className='pt-5 font-semibold text-lg'>Lejemålsinformation</p>
              <textarea
                className='flex items-center text-lg pl-2 w-full h-28 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500'
                placeholder=''
                onChange={handleChange}
                name="firstDescription"
                value={firstDescription}
                />
                {isError&&firstDescription.length<=0?
                <p className="text-red-500">Indtast Lejemålsinformation</p>:""}
            </div>
            <div>
              <p className='pt-5 font-semibold text-lg'>Områdebeskrivelse</p>
              <textarea
                className='flex items-center text-lg pl-2 w-full h-28 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500'
                placeholder=''
                onChange={handleChange}
                name="secondDescription"
                value={secondDescription}
                />
                {isError&&secondDescription.length<=0?
                <p className="text-red-500">Indtast Områdebeskrivelse</p>:""}
            </div>
            <div>
              <p className='pt-5 font-semibold text-lg'>Ejendomsbeskrivelse</p>
              <textarea
                className='flex items-center text-lg pl-2 w-full h-28 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500'
                placeholder=''
                onChange={handleChange}
                name="thirdDescription"
                value={thirdDescription}
                />
                {isError&&thirdDescription.length<=0?
                <p className="text-red-500">Indtast Ejendomsbeskrivelse</p>:""}
            </div>
            
            <div className='flex flex-row justify-between '>
              
              <div className='flex border w-1/6 mr-2 border-gray-300 items-center rounded-lg justify-between pr-10 pl-10'>
                <label>Pets allowed?</label>             
                <input
                  className='h-5 w-5'
                  type="checkbox"
                  name="petsAllowed"
                  checked={petsAllowed}
                  onChange={handleChange}
                  />
                </div>
                <div className='flex border w-1/6 mr-2 border-gray-300 items-center rounded-lg justify-between pr-10 pl-10'>
                  <label>Elevator available?</label>               
                  <input
                    className='h-5 w-5'
                    type="checkbox"
                    id="elevatorAvailable"
                    checked={elevatorAvailable}
                    onChange={handleChange}
                    name="elevatorAvailable"
                  />
                </div>
                <div className='flex border w-1/6  border-gray-300 items-center rounded-lg justify-between pr-10 pl-10'>
                  <label>Balcony?</label>
                  <input
                    className='h-5 w-5'
                    type="checkbox"
                    id="balcony"
                    checked={balcony}
                    onChange={handleChange}
                    name="balcony"
                  />
                </div>
                <div className='flex border w-1/6 ml-2 border-gray-300 items-center rounded-lg justify-between pr-10 pl-10'>
                  <label>Aconto?</label>
                  <input
                    className='h-5 w-5'
                    type="checkbox"
                    checked={isAconto}
                    onChange={handleChange}
                    name="isAconto"
                  />
                </div>
            </div>
            <div className='flex flex-row pt-5'>
              <div className='w-1/2 mr-2'>
                <label className='font-semibold text-lg'>Heat price</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  type="number"
                  value={heatPrice}
                  onChange={handleChange}
                  name="heatPrice"
                />
                {isError&&heatPrice.length<=0?
                <p className="text-red-500">Indtast varme pris</p>:""}
              </div>
              <div className='w-1/2 mr-2'>
                <label className='font-semibold text-lg'>Water price</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  type="number"
                  value={waterPrice}
                  onChange={handleChange}
                  name="waterPrice"
                />
                {isError&&waterPrice.length<=0?
                <p className="text-red-500">Indtast vand pris</p>:""}
              </div>

            </div>
            <div className='flex flex-row pt-5'>
              <div className='w-1/3 mr-2'>
                <label className='font-semibold text-lg'>Deposit</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  type='number'
                  value={deposit}
                  onChange={handleChange}
                  name="deposit"
                />
                {isError&&deposit.length<=0?
                <p className="text-red-500">Indtast deposit</p>:""}
              </div>
              <div className='w-1/3 mr-2'>
                <label className='font-semibold text-lg'>Rent</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  type='number'
                  value={rent}
                  onChange={handleChange}
                  name="rent"
                />
                {isError&&rent.length<=0?
                <p className="text-red-500">Indtast husleje</p>:""}

              </div>
              <div className='w-1/3'>
                <label className='font-semibold text-lg'>Prepaid Rent</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  type='number'
                  value={prepaidRent}
                  onChange={handleChange}
                  name="prepaidRent"
                />
                {isError&&prepaidRent.length<=0?
                <p className="text-red-500">Indtast prepaid rent</p>:""}
              </div>

            </div>
            
            <div className='flex flex-row pt-5'>
              <div className='w-1/3 mr-2'>
                <label className='font-semibold text-lg'>Size</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  type='number'
                  value={size}
                  onChange={handleChange}
                  name="size"
                />
                {isError&&size.length<=0?
                <p className="text-red-500">Indtast Størelse</p>:""}
              </div>
              <div className='w-1/3 mr-2'>
                <label className='font-semibold text-lg'>Available from</label>
                <input
                  type="date"
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  value={availableFrom}
                  onChange={handleChange}
                  name="availableFrom"
                />
                {isError&&availableFrom.length<=0?
                <p className="text-red-500">Indtast Indflytnings dato</p>:""}
              </div>
              <div className='w-1/3'>
                <label className='font-semibold text-lg'>Rooms</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  type='number'
                  value={rooms}
                  onChange={handleChange}
                  name="rooms"
                />
                {isError&&rooms.length<=0?
                <p className="text-red-500">Indtast antal af værelser</p>:""}
              </div>
            </div>
            <div className='mt-1'>
            <div className='w-1/3 mr-2'>
                <label className='font-semibold text-lg'>Longitude</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  value={longitude}
                  onChange={handleChange}
                  name="longitude"
                />
                {isError&&longitude.length<=0?
                <p className="text-red-500">Indtast longitude</p>:""}
              </div>
              <div className='w-1/3 mr-2'>
                <label className='font-semibold text-lg'>Latitude</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  value={latitude}
                  onChange={handleChange}
                  name="latitude"
                />
                {isError&&latitude.length<=0?
                <p className="text-red-500">Indtast latitude</p>:""}
                <label className='font-semibold text-lg'>City</label>
                <input
                  className='w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none'
                  value={city}
                  onChange={handleChange}
                  name="city"
                />
                {isError&&city.length<=0?
                <p className="text-red-500">Indtast by</p>:""}
              </div>
            </div>
            <div className="form-group mb-4">
              <label
                className="form-check-label text-gray-800"
                htmlFor="caseImage"
              >
                Tilføj billede(r) til ejendommen én ad gangen.
              </label>
              <input
                type="file"
                name="image"
                className="file-upload form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="caseImage"
                accept="image/*"
                onChange={imageHandling}
              />
            </div>
            <div className="image-output">
              {error && <div className="error">{error}</div>}
              {imageUpload && <div>{imageUpload.name}</div>}
            </div>
            <section className=" text-gray-700">
            <h2>Valgte billeder:</h2>
            <div className="p-4 container px-5 py-2 border border-gray-300 rounded-lg">
              <div className="grid gap-2 grid-cols-3">
                {imageList.map((imageUrl) => {
                  return (
                    <img
                      key={imageUrl}
                      className="border-2 bg-cover w-full h-full rounded-lg"
                      src={imageUrl}
                    />
                  );
                })}
              </div>
            </div>
          </section>
          <button type='submit' className="flex justify-center mr-3 h-12 w-1/6 border-2 text-white  bg-sky-500 border-sky-500 rounded-md items-center transition-all focus:outline-none hover:bg-white hover:text-sky-500 hover:transition-all">Tilføj bolig</button>
        </div>
      </div>
    </form>
  )
} else {
  return (
    <h2 className="text-center text-5xl text-red-500 decoration underline">
      You are not authorized to view the content on this page.
    </h2>
  );
}
}

export default CreateCase;