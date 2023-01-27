import { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const authContext = createContext({
    token: '',
    isAuth: false,
    authenticate: ()=>{},
    logout: ()=>{},
})



function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState();

    


    function authenticate(token){
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout(){
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value={
        token: authToken,
        isAuth: !!authToken,
        authenticate:authenticate,
        logout:logout
    }
    
    
    
    return <authContext.Provider value={value}>{children}</authContext.Provider>
}




export default AuthContextProvider;