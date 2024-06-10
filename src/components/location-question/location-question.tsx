import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  open?: boolean;
}

export const LocationQuestion = ({ open = true }: Props) => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(open);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          // PERMISSIONS DENIED
          setOpened(true);
          window.location.href = 'app-settings:location';
          return;
        }
        // HAVE PERMISSIONS
        setOpened(false);
      });
    }
    // DONT HAVE PERMISSIONS
    setOpened(true);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      {opened ? (
        <div
          className="fixed top-0 z-50 insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
                <FontAwesomeIcon icon={faLocation} />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900"></h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {t('youNeedToGiveLocationPermissionsToContinue')}.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary_1 text-black
                            text-base font-medium rounded-md w-full
                            shadow-sm hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-300">
                  {t('validatePermissions')}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
