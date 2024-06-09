import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  link: string;
  icon: IconProp;
}

export const InfoCard = ({ link, title, icon }: Props) => {
  const { t } = useTranslation();

  return (
    <a href={link}>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div
          className="bg-clip-border mx-4 rounded-xl overflow-hidden text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
          style={{ backgroundColor: 'antiquewhite' }}>
          <FontAwesomeIcon className="text-gray-700" icon={icon} />
        </div>
        <div className="p-4 text-right flex justify-end ">
          <h4 className=" max-sm:w-[200px] block antialiased tracking-normal font-sans text-l font-semibold leading-snug text-primary_2">
            {t(`menu.${title}`)}
          </h4>
        </div>
        <div className="border-t border-primary_2 p-4">
          {/*
          <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
            <strong className="text-green-500">+55%</strong>&nbsp;than last week
          </p>
            */}
        </div>
      </div>
    </a>
  );
};
