import reducer from './rootReducer';
import { createStore } from 'redux';

const store = createStore(reducer);

export default store;