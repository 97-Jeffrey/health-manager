import { UserInterface } from "./userInterface"

export interface AppDataInterface {
    isFirstLogin: boolean,
    isAuth: boolean,
    userInfo:  UserInterface
}