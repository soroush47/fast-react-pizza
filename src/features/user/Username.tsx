import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsername, updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function Username() {
  const username = useSelector(getUsername);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleClick = () => {
    dispatch(updateName(""));
    navigate("/");
  };

  if (!username.trim()) return null;

  return (
    <div className="hidden md:block group px-3 py-3">
      <div className="hidden text-sm font-semibold md:block">{username}</div>
      <button
        onClick={handleClick}
        className="text-white-100 absolute right-5 top-12 hidden rounded-md bg-yellow-200 px-4 py-2 text-xs font-semibold shadow-md transition-colors duration-300 hover:bg-yellow-100 group-hover:block"
      >
        Logout
      </button>
    </div>
  );
}

export default Username;
