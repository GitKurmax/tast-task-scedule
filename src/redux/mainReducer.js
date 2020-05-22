import db from '../config/firebase.config';

// const GET_SCEDULE = 'GET_SCEDULE';
const SAVE_SCEDULE = 'SAVE_SCEDULE';

export const actions = {
    saveScedule: (payload) => ({type: SAVE_SCEDULE, payload}),
    getScedule: (payload) => {
        return dispatch => {
            db.collection("scedules").get().then((querySnapshot) => {
                const scedules = [];
                querySnapshot.forEach((doc) => {
                    scedules.push(doc.data());
                });
                dispatch(actions.saveScedule(scedules));
            });
        };
    },
    addSceduleToDb: (payload) => {
        return dispatch => {
            db.collection("scedules").add(payload)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
               
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        };
    }
}

const initialState = {
    scedule: []
}

export const mainReducer = (state=initialState, action) => {
    switch (action.type) {
        case SAVE_SCEDULE:
            return {
            ...state,
            scedule: [...state, ...action.payload]
            }
        default:
          return state
    }
}