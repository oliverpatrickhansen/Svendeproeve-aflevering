import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCase, getCase, editCase } from "../features/cases/caseSlice";
import CaseMap from "./caseMap";
import mapboxgl from "mapbox-gl";
import { format } from "date-fns";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Map } from "react-map-gl";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function EditCase() {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoib2xpdmVyaGFuc2VuIiwiYSI6ImNsYXc3dWdmZDBkZ2wzbm1oZzV6ZTVxOXUifQ.tWutup-cpAISS3niRDRPoA";

  const { cases } = useSelector((state) => state.case);

  const [formData, setFormData] = useState({
    title: cases.title || "",
    address: cases.address || "",
    city: cases.city || "",
    firstDescription: cases.firstDescription || "",
    secondDescription: cases.secondDescription || "",
    thirdDescription: cases.thirdDescription || "",
    rooms: cases.rooms || 0,
    size: cases.size || 0,
    availableFrom: cases.availableFrom || "",
    deposit: cases.deposit || 0,
    rent: cases.rent || 0,
    prepaidRent: cases.prepaidRent || 0,
    isAconto: cases.isAconto || false,
    heatPrice: cases.heatPrice || 0,
    waterPrice: cases.waterPrice || 0,
    longitude: cases.longitude || 0,
    latitude: cases.latitude || 0,
    petsAllowed: cases.petsAllowed || false,
    elevatorAvailable: cases.elevatorAvailable || false,
    balcony: cases.balcony || false,
    isReserved: cases.isReserved || false,
    image: cases.image || null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [imageUpload, setImageUpload] = useState("");
  // This is an array that retrieves all images in the cloud storage
  const [imageList, setImageList] = useState([]);

  const imageTypes = ["image/png", "image/jpeg"];
  const [error, setError] = useState("");

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

  const getCaseIdFromUrl = () => {
    const path = window.location.pathname;
    const splitPath = path.split("/");

    const caseId = splitPath[2];

    return caseId;
  };

  const fetchCaseToEdit = () => {
    dispatch(getCase(getCaseIdFromUrl()));
    console.log(cases);
  };

  useEffect(() => {
    if (imageUpload) {
      if (imageTypes.includes(imageUpload.type)) {
        const functionSomething = async () => {
          const imageRef = ref(
            storage,
            `caseImages/${imageUpload.name + uuidv4()}`
          );
          const snapshot = await uploadBytes(imageRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);
          setImageList((current) => [...current, url]);
        };
        setError("");
        functionSomething();
      } else {
        setImageUpload(null);
        setError("Please select an image file (png or jpeg)");
      }
    }
    fetchCaseToEdit();
  }, [imageUpload]);

  const imageHandling = (e) => {
    setImageUpload(e.target.files[0]);
  };

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  const onSubmit = (e) => {
    e.preventDefault();

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
    dispatch(editCase({ caseId: cases._id, caseData }));
  };

  if (user) {
    return (
      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="font-Nunito bg-sky-500 h-20" />
        <div className="w-11/12 self-center pt-20">
          <label className="font-bold text-2xl text-slate-800">
            Edit Propesrty
          </label>
          <div className="flex flex-col h-auto w-full bg-white rounded-md self-center pt-4 pl-16 pr-16 pb-4">
            <label className="font-bold text-xl text-slate-800">
              Edit Listing
            </label>
            <div>
              <p className="pt-5 font-semibold text-lg">Property Title</p>
              <input
                className="flex items-center text-lg pl-2 w-full h-14 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
                type="text"
                placeholder=""
                onChange={handleChange}
                name="title"
                value={title}
              />
            </div>
            <div>
              <p className="pt-5 font-semibold text-lg">Lejemålsinformation</p>
              <textarea
                className="flex items-center text-lg pl-2 w-full h-28 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
                placeholder=""
                onChange={handleChange}
                name="firstDescription"
                value={firstDescription}
              />
            </div>
            <div>
              <p className="pt-5 font-semibold text-lg">Områdebeskrivelse</p>
              <textarea
                className="flex items-center text-lg pl-2 w-full h-28 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
                placeholder=""
                onChange={handleChange}
                name="secondDescription"
                value={secondDescription}
              />
            </div>
            <div>
              <p className="pt-5 font-semibold text-lg">Ejendomsbeskrivelse</p>
              <textarea
                className="flex items-center text-lg pl-2 w-full h-28 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
                placeholder=""
                onChange={handleChange}
                name="thirdDescription"
                value={thirdDescription}
              />
            </div>

            <div className="flex flex-row justify-between ">
              <div className="flex border w-1/6 mr-2 border-gray-300 items-center rounded-lg justify-between pr-10 pl-10">
                <label>Pets allowed?</label>
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  name="petsAllowed"
                  checked={petsAllowed}
                  onChange={handleChange}
                />
              </div>
              <div className="flex border w-1/6 mr-2 border-gray-300 items-center rounded-lg justify-between pr-10 pl-10">
                <label>Elevator available?</label>
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  id="elevatorAvailable"
                  checked={elevatorAvailable}
                  onChange={handleChange}
                  name="elevatorAvailable"
                />
              </div>
              <div className="flex border w-1/6  border-gray-300 items-center rounded-lg justify-between pr-10 pl-10">
                <label>Balcony?</label>
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  id="balcony"
                  checked={balcony}
                  onChange={handleChange}
                  name="balcony"
                />
              </div>
              <div className="flex border w-1/6 ml-2 border-gray-300 items-center rounded-lg justify-between pr-10 pl-10">
                <label>Aconto?</label>
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  checked={isAconto}
                  onChange={handleChange}
                  name="isAconto"
                />
              </div>
            </div>
            <div className="flex flex-row pt-5">
              <div className="w-1/2 mr-2">
                <label className="font-semibold text-lg">Heat price</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  type="number"
                  value={heatPrice}
                  onChange={handleChange}
                  name="heatPrice"
                />
              </div>
              <div className="w-1/2 mr-2">
                <label className="font-semibold text-lg">Water price</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  type="number"
                  value={waterPrice}
                  onChange={handleChange}
                  name="waterPrice"
                />
              </div>
            </div>
            <div className="flex flex-row pt-5">
              <div className="w-1/3 mr-2">
                <label className="font-semibold text-lg">Deposit</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  type="number"
                  value={deposit}
                  onChange={handleChange}
                  name="deposit"
                />
              </div>
              <div className="w-1/3 mr-2">
                <label className="font-semibold text-lg">Rent</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  type="number"
                  value={rent}
                  onChange={handleChange}
                  name="rent"
                />
              </div>
              <div className="w-1/3">
                <label className="font-semibold text-lg">Prepaid Rent</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  type="number"
                  value={prepaidRent}
                  onChange={handleChange}
                  name="prepaidRent"
                />
              </div>
            </div>

            <div className="flex flex-row pt-5">
              <div className="w-1/3 mr-2">
                <label className="font-semibold text-lg">Size</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  type="number"
                  value={size}
                  onChange={handleChange}
                  name="size"
                />
              </div>
              <div className="w-1/3 mr-2">
                <label className="font-semibold text-lg">Available from</label>
                <input
                  type="date"
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  value={availableFrom}
                  onChange={handleChange}
                  name="availableFrom"
                />
              </div>
              <div className="w-1/3">
                <label className="font-semibold text-lg">Rooms</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  type="number"
                  value={rooms}
                  onChange={handleChange}
                  name="rooms"
                />
              </div>
            </div>
            <div className="mt-1">
              <div className="w-1/3 mr-2">
                <label className="font-semibold text-lg">Longitude</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  value={longitude}
                  onChange={handleChange}
                  name="longitude"
                />
              </div>
              <div className="w-1/3 mr-2">
                <label className="font-semibold text-lg">Latitude</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  value={latitude}
                  onChange={handleChange}
                  name="latitude"
                />
                <label className="font-semibold text-lg">City</label>
                <input
                  className="w-full pl-2 border border-gray-300 rounded-lg h-14 focus:outline-none"
                  value={city}
                  onChange={handleChange}
                  name="city"
                />
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
            <button
              type="submit"
              className="flex justify-center mr-3 h-12 w-1/6 border-2 text-white  bg-sky-500 border-sky-500 rounded-md items-center transition-all focus:outline-none hover:bg-white hover:text-sky-500 hover:transition-all"
            >
              Tilføj bolig
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <h2 className="text-center text-5xl text-red-500 decoration underline">
        You are not authorized to view the content on this page.
      </h2>
    );
  }
}

export default EditCase;
