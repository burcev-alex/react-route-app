export const USER_LOADING = 'USER_LOADING'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAIL = 'USER_FAIL'

export function authorize(){
    return function(dispatch){
        dispatch({
            type: USER_LOADING
        })

        //eslint-disable-next-line no-undef
        VK.Auth.login(r => {
            if(r.session){
                let username = r.session.user.first_name

                dispatch({
                    type: USER_SUCCESS,
                    payload: username
                });
            }
            else{
                dispatch({
                    type: USER_FAIL,
                    payload: new Error('Ошибка авторизации')
                });
            }
        }, 4);
    }
}