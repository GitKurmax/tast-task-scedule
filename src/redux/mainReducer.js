import db from '../config/firebase.config';

const SAVE_SCEDULE = 'SAVE_SCEDULE';
const SHOW_HOURS = 'SHOW_HOURS';
const SHOW_EXISTS_ERROR = 'SHOW_EXISTS_ERROR';
const HIDE_EXISTS_ERROR = 'HIDE_EXISTS_ERROR';

export const actions = {
    showExistsError: () => ({type: SHOW_EXISTS_ERROR}),
    hideExistsError: () => ({type: HIDE_EXISTS_ERROR}),
    saveScedule: (payload) => ({type: SAVE_SCEDULE, payload}),
    showHours: (payload) => ({type: SHOW_HOURS, payload }),
    getScedule: (payload) => { 
        return dispatch => {
            db.collection("scedules")
                .where("date", "==", payload)
                .get()
                .then((querySnapshot) => {
                    const scedules = [];
                    querySnapshot.forEach((doc) => {
                        scedules.push(doc.data());
                    });
                    dispatch(actions.saveScedule(scedules));
                }).then(() => {
                    dispatch(actions.showHours(payload));
                });
        };
    },
    addSceduleToDb: (payload) => {
        return dispatch => {
            db.collection("scedules")
            .where("date", "==", payload.date)
            .where("time", "==", payload.time)
            .get()
            .then((doc) => {
                if (doc.empty) {
                    db.collection("scedules").add(payload)
                    .then(function() {
                        dispatch(actions.getScedule(payload.date));               
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
                } else {
                    throw new Error('Document exists!')
                }
            })
            .catch((error) => {
                dispatch(actions.showExistsError())
            })
            
        };
    }
}

const initialState = {
    scedule: [],
    filteredScedule: [],
    docExists: false
}

export const mainReducer = (state=initialState, action) => {
    switch (action.type) {
        case SAVE_SCEDULE:
            return {
            ...state,
            scedule: [...action.payload]
            }
        case SHOW_HOURS:
        const reservedTimes = [];
        const filteredDate = state.scedule.filter(item => item.date === action.payload);
        filteredDate.forEach(item => reservedTimes.push(item.time))

        return {
        ...state,
        filteredScedule: [...reservedTimes]
        }
        case SHOW_EXISTS_ERROR:
            return {
            ...state,
            docExists: true
            }
        case HIDE_EXISTS_ERROR:
            return {
            ...state,
            docExists: false
            }
        default:
          return state
    }
}