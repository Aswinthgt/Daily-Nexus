import Image from "next/image"
import { UserDetails } from "./userDetails/userDetails"

export default function Profile(){
    return (
        <div className="scale-75">
            <UserDetails></UserDetails>
        </div>
    )
}