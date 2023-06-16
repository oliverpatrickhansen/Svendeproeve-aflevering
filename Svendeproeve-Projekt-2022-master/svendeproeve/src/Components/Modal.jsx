import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleOff } from "../features/modal/ModalSlice";
import Register from "./Register";
import Login from "./Login";
import { FaUser } from "react-icons/fa";

function Modal() {
  const dispatch = useDispatch();

  const { renderRegister } = useSelector((state) => state.modal);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              {renderRegister ? (
                <h3>
                  <FaUser />
                  Register
                </h3>
              ) : (
                <h3 className="text-black">Login</h3>
              )}
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {renderRegister ? (
                <>
                  <Register />
                </>
              ) : (
                <>
                  <Login />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Modal;
