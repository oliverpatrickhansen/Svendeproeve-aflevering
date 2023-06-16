import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCases } from "../Features/cases/caseSlice";

function TestingPurposes() {
  const dispatch = useDispatch();
  const { cases } = useSelector((state) => state.case);

  useEffect(() => {
    dispatch(getAllCases());
    console.log(cases);
  }, []);

  return (
    <div className="flex justify-center item-center h-screen w-full">
      {cases.map((item) => {
        return (
          <div className="ml-2 m-32" key={item._id}>
            <h1>{item.title}</h1>
            <h1>{item.latitude}</h1>
            <img src={item.image} alt="" />
          </div>
        );
      })}
    </div>
  );
}

export default TestingPurposes;
