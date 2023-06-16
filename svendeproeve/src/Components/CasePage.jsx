import React, { useState, useEffect } from "react";
import dummyData from "../dummyData";
import ImageCarousel from "./ImageCarousel";
import { getCase } from "../features/cases/caseSlice";
import { useSearchParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhoneAlt,
  FaRegEnvelope,
} from "react-icons/fa";
import MapTest from "./FrontpageMap";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromId } from "../features/auth/authSlice";

export default function CasePage() {
  const [currentCase, setCurrentCase] = useState([]);
  const dispatch = useDispatch();

  const { cases } = useSelector((state) => state.case);
  const { user } = useSelector((state) => state.auth);

  const getCaseIdFromUrl = () => {
    const path = window.location.pathname;
    const splitPath = path.split("/");

    const caseId = splitPath[2];

    return caseId;
  };
  
  const fetchCase = () => {
    dispatch(getCase(getCaseIdFromUrl()));
  };
  
  const fetchCaseUser = () => {
    dispatch(getUserFromId(cases.user));
  }

  useEffect(() => {
    fetchCase();
    fetchCaseUser();
  }, [cases, user]);

  let fillerText =
    "Lorem ipsum dolors sit amet, consectetur adipiscing elit. Aliquam congue magna eu orci gravida, vitae mollis massa fringilla. Morbi eget nulla imperdiet, facilisis lorem nec, porta est. Mauris eleifend ultrices lacinia. In pellentesque ligula velit, sed vulputate arcu sagittis ut. Integer vel est eget magna maximus sodales eget et leo. In quis consectetur tellus. Etiam vestibulum consequat lorem, vitae mollis orci ultricies et. Maecenas lacinia sit amet mauris vel aliquet. Aliquam blandit, sem et ullamcorper viverra, sem ligula finibus sem, sed posuere enim tellus vel tortor. Mauris euismod porttitor ipsum. Nam non justo sit amet ipsum sodales tempus.";

  return (
    <div>
      <div className="font-Nunito bg-sky-500 h-20" />
      <div className="pl-80 pr-80 shadow-inner font-Nunito">
        <div className="bg-white  flex flex-col shadow-lg overflow-hidden">
          <div className=" flex items-center">
            <ImageCarousel slides={dummyData} className="" />
          </div>
          <div className="flex flex-row justify-between">
            <div className=" text-black pl-14 flex flex-col">
              <h1 className="font-semibold text-3xl pb-2">{cases.title}</h1>
              <div className="flex flex-row items-center pb-2">
                <FaMapMarkerAlt className="text-sky-500 text-2xl mr-2" />
                <p className="text-lg">{cases.address}</p>
              </div>
              <div className="flex flex-row items-center pb-2">
                <FaCalendarAlt className="text-sky-500 text-2xl mr-2" />
                <p className="text-lg">Fra: {cases.availableFrom}</p>
              </div>
            </div>

            <div className="flex flex-row shadow-2xl mr-14 bg-white">
              <div className="flex flex-col m-10">
                <h1 className="pb-1 font-semibold">{user && user.name}</h1>
                <h1 className="pb-10 text-sky-500 font-semibold">
                  Udlejningsmægler
                </h1>
     
                <div className="flex flex-row items-center">
                  <FaRegEnvelope className="text-sky-500 text-2xl mr-1" />
                  <p>{user && user.email}</p>
                </div>
              </div>
              <img
                // src="https://thispersondoesnotexist.com/image"
                className="h-56 pl-2"
              />
            </div>
          </div>
          <div className="flex flex-row pt-10 justify-between">
            <div className="pl-14 max-w-2xl flex flex-col pb-10">
              <h1 className="font-bold text-3xl pb-5">General Information</h1>
              <h2 className="font-semibold text-xl pb-1">
                Lejemålsinformation
              </h2>
              <p className="pb-5">{cases.firstDescription}</p>
              <h2 className="font-semibold text-xl pb-1">Områdebeskrivelse</h2>
              <p className="pb-5">{cases.secondDescription}</p>
              <h2 className="font-semibold text-xl pb-1">
                Ejendomsbeskrivelse
              </h2>
              <p className="pb-5">{cases.thirdDescription}</p>
            </div>
            <div className="flex flex-col pr-14">
              <hr />
              <div className="flex flex-row justify-between pb-2 pt-5">
                <p className="text-gray-500 pr-10">Adresse</p>
                <p className="font-bold">{cases.address}</p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">By</p>
                <p className="font-bold">{cases.city}</p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">Værelser</p>
                <p className="font-bold">{cases.rooms}</p>
              </div>
              <div className="flex flex-row justify-between pb-5">
                <p className="text-gray-500 pr-10">Størrelse</p>
                <p className="font-bold">{cases.size}</p>
              </div>
              <hr />
              <div className="flex flex-row justify-between pt-5 pb-2">
                <p className="text-gray-500 pr-10">Tilgængelig fra</p>
                <p className="font-bold">{cases.availableFrom}</p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">Månedlig leje</p>
                <p className="font-bold">{cases.rent} kr.</p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">Depositum</p>
                <p className="font-bold">{cases.deposit} kr.</p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">Forudbetalt husleje</p>
                <p className="font-bold">{cases.prepaidRent} kr.</p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">Varme</p>
                <p className="font-bold">{cases.heatPrice}</p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">Vand</p>
                <p className="font-bold">{cases.waterPrice}</p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">Husdyr tilladt</p>
                <p className="font-bold">{cases.petAllowed ? "Ja" : "Nej"}</p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">Elevator</p>
                <p className="font-bold">
                  {cases.elevatorAvailable ? "Ja" : "Nej"}
                </p>
              </div>
              <div className="flex flex-row justify-between pb-2">
                <p className="text-gray-500 pr-10">Altan</p>
                <p className="font-bold">{cases.balcony ? "Ja" : "Nej"}</p>
              </div>
            </div>
          </div>
  
          <div className="h-96"></div>
        </div>
      </div>
    </div>
  );
}
