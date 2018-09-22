export const PHOTOS_LOADING = 'PHOTOS_LOADING'
export const PHOTOS_SUCCESS = 'PHOTOS_SUCCESS'

export function getPhotos(year){
    return dispatch => {
        dispatch({
            type: PHOTOS_LOADING,
            payload: year
        })

        setTimeout(function(){
            dispatch({
                type: PHOTOS_SUCCESS,
                payload: [1, 2, 3, 4, 5, 6]
            })
        }, 1000)
    }
}