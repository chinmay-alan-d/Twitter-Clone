import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [username,setUsername] = useState(null);
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [image ,setImage] = useState(null);

    const LoginUsername = (username) =>{
        setUsername(username);
    }

    const LoginName = (name) =>{
        setName(name);
    }

    const LoginEmail = (email) =>{
        setEmail(email);
    }

    const LoginImage = (image) => {
        setImage(image)
    }

    return(
        <AuthContext.Provider value={{username,name,email,image,LoginUsername,LoginName,LoginEmail,LoginImage}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext);
}