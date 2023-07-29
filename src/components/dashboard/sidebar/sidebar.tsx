import { Fragment } from "react";
import "./sidebar.css"

const SideBar = () => {
  return <Fragment>
     <div className="drop-shadow-xl">
        <ul>
            <li className="text-center p-3 m-2 rounded hover:bg-sky-300">Home</li>
            <li className="text-center p-3 m-2 rounded hover:bg-sky-300">Profile</li>
            <li className="text-center p-3 m-2 rounded hover:bg-sky-300">Section</li>
            <li className="text-center p-3 m-2 rounded hover:bg-sky-300">About</li>
        </ul>
     </div>
  </Fragment>;
};

export default SideBar;
