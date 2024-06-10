export const handleLocation = () => {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition;
  }
  console.log('Geolocation not supported');

  return null;
};
