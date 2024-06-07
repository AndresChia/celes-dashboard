import { locationReducer } from './reducers/locationReducer';
import { configureStore } from '@reduxjs/toolkit';

const appStore = configureStore({
  reducer: {
    location: locationReducer
  }
});

export default appStore;
