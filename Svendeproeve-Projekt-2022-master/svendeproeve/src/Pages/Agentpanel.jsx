import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCase } from "../features/cases/caseSlice";
import { format } from "date-fns";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function Agentpanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [imageUpload, setImageUpload] = useState("");
  // This is an array that retrieves all images in the cloud storage
  const [imageList, setImageList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const imageTypes = ["image/png", "image/jpeg"];
  const [error, setError] = useState("");

  const imageListRef = ref(storage, "caseImages");

  // TODO:
  // getDownloadURL and the {url} variable gets my downloadlink / display link of the image
  // I need to push this link to the image array of my mongoose model
  // map the image array and display case images

  const [formData, setFormData] = useState({
    title: "ass",
    address: "asd",
    city: "asdd",
    firstDescription: "asd",
    secondDescription: "asd",
    thirdDescription: "asd",
    rooms: "2",
    size: "1",
    availableFrom: "",
    deposit: "123",
    rent: "1212",
    prepaidRent: "123",
    isAconto: false,
    heatPrice: "123",
    waterPrice: "123123",
    longitude: "1231",
    latitude: "12312",
    petsAllowed: false,
    elevatorAvailable: false,
    balcony: false,
    isReserved: false,
    image: [],
  });

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
  }, [imageUpload]);

  const imageHandling = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: e.target.type === "checkbox" ? checked : value,
      };
    });
  };

  // useEffect(() => {
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       console.log(items);
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  // uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //   getDownloadURL(snapshot.ref).then((url) => {
  //     setImageList((prev) => [...prev, url]);
  //     // If logged shows download URL. If put as src it'll show the actual image.
  //   });
  // });

  // TODO: Security check, file allowance etc
  // TODO: #help-react help from Abstractless and ortunado. <---- Look

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
    dispatch(createCase(caseData));
  };

  if (user) {
    return (
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-medium">
          Velkommen til mægler panelet, {user.name}
        </h1>
        <p className="text-lg font-light mt-3 underline underline-offset-2">
          Her kan du tilføje eller opdatere boliger
        </p>
        <div className="p-6 flex rounded-lg shadow-lg bg-white max-1/2">
          <form onSubmit={onSubmit}>
            <div className="form-group mb-6">
              <label
                className="form-check-label text-gray-800"
                htmlFor="caseTitle"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="caseTitle"
                placeholder="Case title"
                value={title}
                onChange={onChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseAddress"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseAddress"
                  placeholder="Address"
                  value={address}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseCity"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseCity"
                  placeholder="City"
                  value={city}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="form-group mb-6 w-[7rem]">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseRooms"
                >
                  Rooms
                </label>
                <input
                  type="number"
                  name="rooms"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseRooms"
                  placeholder="Rooms"
                  value={rooms}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-6 w-[7rem]">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseSize"
                >
                  Size
                </label>
                <input
                  type="number"
                  name="size"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseSize"
                  placeholder="Size"
                  value={size}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseAvailableFrom"
                >
                  Available From
                </label>
                <input
                  type="date"
                  name="availableFrom"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseAvailableFrom"
                  value={availableFrom}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseDeposit"
                >
                  Deposit
                </label>
                <input
                  type="number"
                  name="deposit"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseDeposit"
                  placeholder="Deposit"
                  value={deposit}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseRent"
                >
                  Rent
                </label>
                <input
                  type="number"
                  name="rent"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseRent"
                  placeholder="Rent"
                  value={rent}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="casePrepaidRent"
                >
                  Prepaid Rent
                </label>
                <input
                  type="number"
                  name="prepaidRent"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="casePrepaidRent"
                  placeholder="Prepaid rent"
                  value={prepaidRent}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseLatitude"
                >
                  Latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseLatitude"
                  placeholder="12.3424169"
                  value={latitude}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseLongitude"
                >
                  Longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseLongitude"
                  placeholder="55.732542"
                  value={longitude}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseWaterPrice"
                >
                  Water Price
                </label>
                <input
                  type="number"
                  name="waterPrice"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseWaterPrice"
                  placeholder="Water"
                  value={waterPrice}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-check-label text-gray-800"
                  htmlFor="caseHeatPrice"
                >
                  Heating Price
                </label>
                <input
                  type="number"
                  name="heatPrice"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="caseHeatPrice"
                  placeholder="Heating"
                  value={heatPrice}
                  onChange={onChange}
                />
              </div>

              <div className="form-group mb-6">
                <label
                  className="form-check-label inline-block text-gray-800 mr-2"
                  htmlFor="caseIsAconto"
                >
                  Aconto
                </label>
                <input
                  type="checkbox"
                  name="isAconto"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                  id="caseIsAconto"
                  value={isAconto}
                  checked={isAconto}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-group mb-6">
                <label
                  className="form-check-label inline-block text-gray-800 mr-2"
                  htmlFor="casePetsAllowed"
                >
                  Pets Allowed
                </label>
                <input
                  type="checkbox"
                  name="petsAllowed"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                  id="casePestAllowed"
                  checked={petsAllowed}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-check-label inline-block text-gray-800 mr-2"
                  htmlFor="caseElevatorAvailable"
                >
                  Elevator
                </label>
                <input
                  type="checkbox"
                  name="elevatorAvailable"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                  id="caseElevatorAvailable"
                  checked={elevatorAvailable}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-check-label inline-block text-gray-800 mr-2"
                  htmlFor="caseBalcony"
                >
                  Balcony
                </label>
                <input
                  type="checkbox"
                  name="balcony"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                  id="caseBalcony"
                  checked={balcony}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group mb-6">
              <label
                className="form-check-label inline-block text-gray-800 mr-2"
                htmlFor="caseIsReserved"
              >
                Reserved
              </label>
              <input
                type="checkbox"
                name="isReserved"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                id="caseIsReserved"
                checked={isReserved}
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-check-label text-gray-800"
                htmlFor="caseFirstDesc"
              >
                Lejemålsinformation
              </label>
              <textarea
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="caseFirstDesc"
                name="firstDescription"
                placeholder="Lejemålsinformation..."
                value={firstDescription}
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-check-label text-gray-800"
                htmlFor="caseSecondDesc"
              >
                Områdebeskrivelse
              </label>
              <textarea
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="caseSecondDesc"
                name="secondDescription"
                placeholder="Områdebeskrivelse..."
                value={secondDescription}
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-check-label text-gray-800"
                htmlFor="caseThirdDesc"
              >
                Ejendomsbeskrivelse
              </label>
              <textarea
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="caseThirdDesc"
                name="thirdDescription"
                placeholder="Ejendomsbeskrivelse..."
                value={thirdDescription}
                onChange={onChange}
              />
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
            <button
              type="submit"
              className="w-full px-6 mt-2 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 
              hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150
              ease-in-out"
            >
              Add Case
            </button>
          </form>
          <section className=" text-gray-700">
            <h2>Valgte billeder:</h2>
            <div className="p-4 container px-5 py-2">
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
        </div>
      </div>
    );
  } else {
    return (
      <h2 className="text-center text-5xl text-red-500 decoration underline">
        You are not authorized to view the content on this page.
      </h2>
    );
  }
}

export default Agentpanel;
