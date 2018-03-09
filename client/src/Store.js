import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function Reducer(state = [], action) {
    switch (action.type) {
        case 'SEARCH_REQUEST':
            return { tweets: [], load: true };
        case 'SEARCH_RESULT':
            return { tweets: action.tweets, load: false };
        default: return state;
    }
};

const store = createStore(Reducer, applyMiddleware(thunk));

export default store;