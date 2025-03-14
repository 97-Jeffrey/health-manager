import { authconfig } from '../lib/Auth/index'
import { AppDataInterface } from '../types/appDataInterface'
import { ActionType } from '../types/actionType'
import { useReducer } from 'react'
import { useEffect } from 'react'
import { getUserPool } from '../lib/Auth/config'

const SET_IS_AUTH = 'SET_IS_AUTH'
const SET_USER_INFO = 'SET_USER_INFO'
const SET_IS_FIRST_LOGIN = 'SET_IS_FIRST_LOGIN'

import { UserInterface } from '../types/userInterface'
import createUser from '../lib/api/user/createUser'




function reducer(state: AppDataInterface, action: ActionType) {
    switch (action.type) {
        case SET_IS_FIRST_LOGIN:
            return {...state, isFirstLogin: action.value }
        case SET_IS_AUTH:
            return { ...state, isAuth: action.value }
        case SET_USER_INFO:
            return { ...state, userInfo: action.value }
        default:
            return state
    }
}

const initApp  = (): AppDataInterface =>{
    return {
        isFirstLogin: true,
        isAuth: authconfig.getUser() !== null,
        userInfo:{
            name: "",
            email:"",
            address:"",
            birthdate: "",
            phone_number: "",
            specialty: "",
            website:"",
            userId: "",
        }
    }
}


const useAppData = () =>{
    
    const [state, dispatch] = useReducer(reducer, initApp())

    const setIsFirstLogin =(bol: boolean)=>
        dispatch({ type: SET_IS_FIRST_LOGIN, value: bol })

    const setIsAuth = () =>
        dispatch({ type: SET_IS_AUTH, value: authconfig.getUser() !== null })

    const setUserInfo = (info: UserInterface) => 
        dispatch({ type: SET_USER_INFO, value: info })

   

    // useEffect(()=>{

    //     console.log('reached')
    //     const handleUserCreate =async () =>{

            
    //         await createUser(state.userInfo);

    //     }

    //     handleUserCreate()

    // }, [])


    return {
        state, 
        setIsAuth,
        setUserInfo
    }
}



export default useAppData