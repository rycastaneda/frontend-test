import {
    FETCH_COUNTERS,
    CREATE_COUNTER,
    REMOVE_COUNTER,
    INCREMENT_COUNTER,
    DECREMENT_COUNTER,
    INCREMENT_COUNTER_SUCCESS,
    DECREMENT_COUNTER_SUCCESS,
    FETCH_COUNTERS_SUCCESS,
    CREATE_COUNTER_SUCCESS,
    REMOVE_COUNTER_SUCCESS,
    API_ERROR
} from '../constants/ActionTypes';
import axios from 'axios';

export function callback(message) {
    return {
        type: 'API_ERROR',
        message
    }
}

export function fetchCounters() {
    return (dispatch) => {
        dispatch({
            type: FETCH_COUNTERS
        });

        axios.get('/counters')
            .then((response) => {
                dispatch({
                    type: FETCH_COUNTERS_SUCCESS,
                    counters: response.data
                });
            }, function () {
                dispatch(callback('Error fetching counters'));
            });
    };
}

export function createCounter(title) {
    return (dispatch) => {
        dispatch({
            type: CREATE_COUNTER
        });

        axios.post('/counter', {title})
            .then((response) => {
                dispatch({
                    type: CREATE_COUNTER_SUCCESS,
                    id: response.data.pop().id,
                    title
                });
            }, function () {
                dispatch(callback('Error creating counter'));
            });
    };
}

export function removeCounter(id) {
    return (dispatch) => {
        dispatch({
            type: REMOVE_COUNTER,
            id
        });

        axios.delete('/counter', {data: { id }})
            .then((response) => {
                dispatch({
                    type: REMOVE_COUNTER_SUCCESS,
                    id
                });
            }, function () {
                dispatch(callback('Error deleting counter'));
            });
    };
}

export function incrementCounter(id) {

    return (dispatch) => {
        dispatch({
            type: INCREMENT_COUNTER,
            id
        });

        axios.post('/counter/inc', { id })
            .then((response) => {
                dispatch({
                    type: INCREMENT_COUNTER_SUCCESS,
                    id
                });
            }, function () {
                dispatch(callback('Error incrementing counter'));
            });
    };
}

export function decrementCounter(id) {
    return (dispatch) => {
        dispatch({
            type: DECREMENT_COUNTER,
            id
        });

        axios.post('/counter/dec', { id })
            .then((response) => {
                dispatch({
                    type: DECREMENT_COUNTER_SUCCESS,
                    id
                });
            }, function () {
                dispatch(callback('Error decrementing counter'));
            });
    };
}
