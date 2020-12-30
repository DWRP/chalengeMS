import { createContext, useContext, useState } from 'react'

interface LoginContextData {
    email:string
    setEmail: any
    password:string
    setPassword: any
}

const LoginContext = createContext<LoginContextData >({} as LoginContextData)

export default function LoginProvider({children}:any) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return(
        <LoginContext.Provider 
            value={
                {
                    email,
                    setEmail,
                    password,
                    setPassword
                }
            }
        >
            {children}
        </LoginContext.Provider>
    )
}

export function useLoginContext(){
    
    const context = useContext(LoginContext)
    const {
        email,
        setEmail,
        password,
        setPassword
    } = context

    return {
        email,
        setEmail,
        password,
        setPassword
    }
}