import { useEffect, useState } from "react";
import { Menu } from "../menu/menu"
import NavBar from "../navBar/nav-bar";
import { Navbar } from "../navBar/navbar";
import axios from "axios";

interface Props {
    breadcrumb: Navbar[];
}




export const Header = ({ breadcrumb }: Props) => {
    const [open, setOpen] = useState(false);


    /* const [post, setPost] = useState(null);
     useEffect(() => {
         const openKey = process.env.REACT_APP_OPEN_WEATHER_API_ID;
         axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=${openKey}`).then((response) => {
             setPost(response.data);
         });
     }, []);
 */

    return (<>
        <Menu open={open} setOpen={setOpen} />
        <NavBar open={open} setOpen={setOpen} breadcrumb={breadcrumb} />
    </>
    )
}