import { Fragment } from "react";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import sidebar from "@/store/sidebar";

const SideBar = () => {
  const sidebarState = useSelector((state: any) => state.sideBar);
  const dispatch = useDispatch();

  function opensidebar() {
    dispatch(sidebar.openSideBar());
  }

  return (
    <Fragment>
      <div className="relative">
        <div
          onClick={opensidebar}
          className={`fixed -right-7 p-1 top-0 cursor-pointer rounded-full bg-gradient-to-r from-blue-500 to-sky-500 from-50% to-50% ${sidebarState && 'animate-pulse'} transition duration-700 ease-in-out ${sidebarState ? 'rotate-0' : '-rotate-180'} `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 -960 960 960"
            width="40"
          >
            <path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z" />
          </svg>
        </div>
        <ul>
          <li className="text-center p-3 m-2 rounded hover:bg-sky-300">Home</li>
          <li className="text-center p-3 m-2 rounded hover:bg-sky-300">
            Profile
          </li>
          <li className="text-center p-3 m-2 rounded hover:bg-sky-300">
            Section
          </li>
          <li className="text-center p-3 m-2 rounded hover:bg-sky-300">
            About
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default SideBar;
