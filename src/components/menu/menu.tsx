import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { MENUS } from "../../utils/menu";

interface Props {
    open?: boolean;
    setOpen: (state: boolean) => void;
}


export const Menu = ({ open = false, setOpen }: Props) => {
    const { t } = useTranslation();
    return (
        <>
            <div
                className={`${open ? '' : 'hidden'} z-40 absolute bg-black opacity-40 top-0 left-0 w-screen h-screen xl:hidden`}
            ></div>

            <aside
                className={`${open ? '' : 'hidden'} bg-gradient-to-br from-slate-900 to-[#111827] fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] rounded-xl transition-transform duration-300 translate-x-0 xl:block md:w-72 md:translate-x-[calc(100vw_-_311px)] xl:translate-x-0 max-md:w-[calc(100%_-_30px)]`}
            >

                <div className="relative border-b border-gray_scale_1">

                    <div className="flex items-center gap-4 py-6 px-8">
                        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-primary_1">
                            {t('menu')}
                        </h6>
                    </div>
                    <button
                        className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                        type="button"
                        onClick={() => setOpen(!open)}
                    >
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <FontAwesomeIcon icon={faX} />
                        </span>
                    </button>
                </div>


                <div className="m-4">
                    <ul className="mb-4 flex flex-col gap-1">
                        {
                            MENUS.map(menu => (
                                <li key={menu.title}>
                                    <a href={menu.link} aria-current="page" >
                                        <button
                                            className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                            type="button"
                                        >
                                            <FontAwesomeIcon icon={menu.icon} />
                                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                                {menu.title}
                                            </p>
                                        </button>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </aside>
        </>
    )

}