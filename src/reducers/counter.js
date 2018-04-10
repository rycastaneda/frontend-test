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
    API_ERROR,
    UPDATE_STATE
} from '../constants/ActionTypes';

const INITIAL_STATE = {
    byId: {},
    allIds: [],
    loading: {
        who: 'ALL'
    },
    error: null
};

export function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_COUNTERS:
        case CREATE_COUNTER:
            return {
                ...state,
                loading: {
                    who: 'ALL'
                }
            };
        case INCREMENT_COUNTER:
        case DECREMENT_COUNTER:
        case REMOVE_COUNTER:
            return {
                ...state,
                loading: {
                    who: action.id
                }
            }
        case UPDATE_STATE:
        case FETCH_COUNTERS_SUCCESS:
            action.counters.map(counter => {
                state.byId[counter.id] = {
                    ...counter
                };
                state.allIds.push(counter.id);
            });
            state.loading.who = null;

            return {
                ...state
            };
        case INCREMENT_COUNTER_SUCCESS:
            state.byId[action.id].count += 1;
            state.loading.who = null;
            return {
                // byId {
                //     [action.id]: {
                //         ...state.byId[action.id],
                //         count: state.byId[action.id].count + 1
                //     }
                // },
                ...state
            }
        case DECREMENT_COUNTER_SUCCESS:
            state.byId[action.id].count -= 1;
            state.loading.who = null;

            return {
                ...state
            }
        case CREATE_COUNTER_SUCCESS:
            state.byId[action.id] = {
                id: action.id,
                count: 0,
                title: action.title
            }
            state.loading.who = null;

            return { ...state, allIds: [...state.allIds, action.id] };
        case REMOVE_COUNTER_SUCCESS:
            delete state.byId[action.id];
            state.loading.who = null;

            return {
                ...state,
                allIds: state.allIds.filter(id => id !== action.id)
            }
        case API_ERROR:
            return {
                ...state,
                error: action.message
            };
        default:
            return state;
    }
}
