import { LOCATION } from '../actions/locationActions';

const locationReducer = (state = 0, action: any) => {
  switch (action.type) {
    case LOCATION:
    default:
      return state;
  }
};

export { locationReducer };
