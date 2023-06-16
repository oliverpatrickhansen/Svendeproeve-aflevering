import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { FaUser } from "react-icons/fa";
import { toggleOff } from "../features/modal/ModalSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const formLabelClass = "block mb-2 text-sm font-medium text-gray-900";
  const formInputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { toggleModal } = useSelector((state) => state.modal);

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
    dispatch(reset());
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

    if (password !== password2) {
      alert("Passwords do not match - use toast here later");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      // Here we basically dispatch the register function. Dispatch is used to trigger a state change.
      // Essentially we're updating the state with the dispatch function. So now the state is changed globally
      dispatch(register(userData));
      dispatch(toggleOff());
    }
  };

  return (
    <>
      <div>
        <p className="mb-5 text-lg">Please create an account</p>
      </div>
      <div className="w-full">
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label className={formLabelClass} htmlFor="name">
              Your full name
            </label>
            <input
              type="text"
              className={formInputClass}
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
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
          <div className="mb-6">
            <label className={formLabelClass} htmlFor="password2">
              Confirm Password
            </label>
            <input
              type="password"
              className={formInputClass}
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm your password"
              onChange={onChange}
            />
          </div>
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
            <button
              type="submit"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={() => dispatch(toggleOff())}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
