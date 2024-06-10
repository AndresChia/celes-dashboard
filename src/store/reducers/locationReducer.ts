import { LOCATION } from '../actions/locationActions';

const locationReducer = (state = 0, action: any) => {
  switch (action.type) {
    case LOCATION:
      return action;
    default:
      return state;
  }
};

export { locationReducer };
