import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import { toggleOff } from "../features/modal/ModalSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const formLabelClass = "block mb-2 text-sm font-medium text-gray-900";
  const formInputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use useSelector to select the different states from the global state auth, so we can use them
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    // isSuccess is true because in the authSlice, we set isSuccess to true if register was fulfilled. *Look in addCase()*
    if (isSuccess || user) {
      navigate("/");
    }
    // dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // e.target.name is the name keyword in input fields
      // e.target.value is the value of the name keyword.
      // this means whenever we type into the different fields
      // we only update for the field we're currently in
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
    dispatch(toggleOff());
  };
  return (
    <>
      <section className="mb-5 text-lg">
        <p className="text-black">Login and start setting goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label className={formLabelClass} htmlFor="email">
              Your email
            </label>
            <input
              type="email"
              className={formInputClass}
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="mb-6">
            <label className={formLabelClass} htmlFor="password">
              Your password
            </label>
            <input
              type="password"
              className={formInputClass}
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="text-white bg-sky-400 border-2 border-sky-400 transition-all hover:transition-all hover:bg-white hover:border-2  hover:text-black hover:border-sky-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
            <button
              type="submit"
              className="text-white bg-red-700 hover:bg-white border-2 border-red-700 hover:border-2 hover:text-black hover:transition-all transition-all hover:border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={() => dispatch(toggleOff())}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
