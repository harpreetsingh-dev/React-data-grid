import api from "./api";

export const ACTION_TYPES = {
    FETCH_ALL: 'FETCH_ALL',
    CREATE: 'CREATE',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    FETCH_DEP: "FETCH_DEP"
}


export const fetchAll = () => dispatch => {
    api.emp().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}


export const fetchDepList = () => dispatch => {
    api.emp().fetchDepList()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_DEP,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}


export const create = (data, onSuccess) =>  {
   // data = formateData(data)
   return dispatch => api.emp().create(data)
        .then(res => {
        dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const Delete = (Id, onSuccess) => dispatch => {
    api.emp().delete(Id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: Id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const update = (Update, onSuccess) => dispatch => {
    api.emp().update(Update)
        .then(res => {
                dispatch({
                    type: ACTION_TYPES.UPDATE,
                    payload: { ...Update },
                })
                onSuccess();
        })
        .catch(err => console.log(err))
}