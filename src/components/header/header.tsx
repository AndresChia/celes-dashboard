import { useState } from "react";
import { Menu } from "../menu/menu"
import NavBar from "../navBar/nav-bar";
import { Navbar } from "../navBar/navbar";
// import { useDispatch, useSelector } from "react-redux";

interface Props {
    breadcrumb: Navbar[];
}




export const Header = ({ breadcrumb }: Props) => {
    const [open, setOpen] = useState(false);



    return (<>
        <Menu open={open} setOpen={setOpen} />
        <NavBar open={open} setOpen={setOpen} breadcrumb={breadcrumb} />
    </>
    )
}