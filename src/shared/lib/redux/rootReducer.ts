import { combineReducers } from 'redux';

import profileSliceReducer from './slices/profileSlice';

const rootReducer = combineReducers({
    profile: profileSliceReducer,
});

export default rootReducer
