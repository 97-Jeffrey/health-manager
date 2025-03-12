import { authconfig } from '../lib/Auth/index'
import { AppDataInterface } from '../types/appDataInterface'
import { ActionType } from '../types/actionType'
import { useReducer } from 'react'

const SET_IS_AUTH = 'SET_IS_AUTH'




function reducer(state: AppDataInterface, action: ActionType) {
    switch (action.type) {
        case SET_IS_AUTH:
            return { ...state, isAuth: action.value }
        default:
            return state
    }
}

const initApp  =(): AppDataInterface =>{
    return {
        isAuth: authconfig.getUser() !== null
    }
}


const useAppData = () =>{
    
    const [state, dispatch] = useReducer(reducer, initApp())

    const setIsAuth = () =>
        dispatch({ type: SET_IS_AUTH, value: authconfig.getUser() !== null })

    return {
        state, 
        setIsAuth
    }
}



export default useAppData