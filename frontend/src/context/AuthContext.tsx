import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

interface AuthContextData {
    signed: boolean
    user: object | null
    handleLogin(userData:object): Promise<boolean>
    handleRegister(userData:object): Promise<boolean>
    handleLoggout(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export default function AuthProvider({children}:any) {
    const [ user, setUser ] = useState<object | null>(null)

    async function handleLogin(userData:object){

        const response = await api.post('/login',userData).catch(error => {
            console.log(error)
            return {
                data:{
                    user:{
                        email:undefined
                    }
                }
            }
        })

        const { email } = response.data.user
        if(email){
            setUser(response.data.user)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            localStorage.setItem('token',JSON.stringify(response.data.token))
            return true
        }
        return false    

    }

    async function handleRegister(userData:object){
        try{
            const response = await api.post('/register',userData)
            if(response){
                return true
            }
        }catch(error){
            console.log(error)
        }
        return false
    }

    async function handleLoggout(){
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }


    useEffect(()=>{
        const userStorage = localStorage.getItem("user")
        const token = localStorage.getItem('token')
        
        async function auth(){
            return await api.get('/reauth',{headers:{"Authentication":`Baron ${token}`}})
        }
        
        if(token){
            const result = auth()
            if(result){
                if(userStorage){
                    setUser(JSON.parse(userStorage))
                }
            }
        }

    },[])

    return(
        <AuthContext.Provider value={{signed: !!user, user, handleLogin, handleRegister, handleLoggout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    
    const context = useContext(AuthContext)

    const {signed, user, handleLogin, handleRegister, handleLoggout} = context

    return {signed, user, handleLogin, handleRegister, handleLoggout}

}