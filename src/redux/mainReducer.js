const GET_SCEDULE = 'GET_SCEDULE';
const SAVE_SCEDULE = 'SAVE_SCEDULE';

export const actions = {
    getScedule: () => ({type: GET_SCEDULE}),
    saveScedule: (payload) => ({type: SAVE_SCEDULE, payload})
}

const initialState = {
    scedule: [{date: '2020-10-02', time: '14:00'}]
}

export const mainReducer = (state=initialState, action) => {
    switch (action.type) {
        case SAVE_SCEDULE:
            const newScedule = [...state.scedule, action.payload];
            return {
            ...state,
            scedule: newScedule
            }
        default:
          return state
    }
}