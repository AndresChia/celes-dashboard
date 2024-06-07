import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "./navbar";

interface Props {
    open?: boolean;
    setOpen: (state: boolean) => void;
    breadcrumb: Navbar[];
}

export const NavBar = ({ open = false, setOpen, breadcrumb }: Props) => {
    return (
        <div className="p-4 xl:ml-80">
            <nav aria-label="nav" className="block w-full max-w-full bg-transparent text-primary_2 shadow-none transition-all px-0 py-1">
                <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                    <div className="capitalize max-sm:mt-14">
                        <nav aria-label="breadcrumb" className="w-max">
                            <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                {
                                    breadcrumb.map((menu, index) =>
                                        <li
                                            key={menu.title}
                                            className="flex items-center antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500"
                                        >
                                            <a href="[menu.link]">
                                                <p
                                                    className="block antialiased font-sans text-sm leading-normal font-normal transition-all hover:text-blue-500 hover:opacity-100"
                                                >
                                                    {menu.title}
                                                </p>
                                            </a>

                                            {
                                                // dont show in last item
                                                breadcrumb.length !== index + 1 ? <span
                                                    className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none"
                                                >
                                                    /
                                                </span> : ''
                                            }
                                        </li>
                                    )
                                }
                            </ol>
                        </nav>
                        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-primary_2">
                            {breadcrumb[breadcrumb.length - 1].title}
                        </h6>
                    </div>
                    <div
                        className="flex items-center justify-between max-sm:bg-gradient-to-r max-sm:from-primary_2 max-sm:to-complementary_4 max-sm:rounded-md max-sm:fixed max-sm:w-[calc(100vw_-_30px)] max-sm:top-3 max-sm:z-20"
                    >
                        <button
                            className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden max-sm:text-primary_1"
                            type="button"
                            onClick={() => setOpen(!open)}
                        >
                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <FontAwesomeIcon icon={faBars} />
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;