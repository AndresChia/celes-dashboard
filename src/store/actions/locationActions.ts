const LOCATION = 'LOCATION';

const setLocation = (latitude: number, longitude: number) => ({
  type: LOCATION,
  latitude,
  longitude
});

export { LOCATION, setLocation };
