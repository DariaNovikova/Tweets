import axios from 'axios';

export function searchTweets(search) {
    return dispatch => {
        dispatch({ type: 'SEARCH_REQUEST' });

        axios.get('http://localhost:4000/tweets', {
            params: { search }
        })
            .then(response => {
                dispatch({ tweets: response.data, type: 'SEARCH_RESULT' })
            })
            .catch(error => console.log(error))
    };
}