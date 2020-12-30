import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

interface AuthContextData {
    signed: boolean
    user: object | null
    userValidate: string
    setValidate(text?:string): void
    handleLogin(userData:object): Promise<void>
    handleRegister(userData:object): Promise<boolean>
    handleLoggout(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export default function AuthProvider({children}:any) {
    const [ user, setUser ] = useState<object | null>(null)
    const [ userValidate, setUserValidate ] = useState("")

    async function handleLogin(userData:object){
        try{

            const response = await api.post('/login',userData)
            const { email } = response.data.user
            if(email){
                setUser(response.data.user)
                localStorage.setItem('user',JSON.stringify(response.data.user))
                localStorage.setItem('token',JSON.stringify(response.data.token))
            }
        }
        catch(error){
            setUserValidate("Senha ou email inválido!")
            console.log(error)
        }

    }

    async function handleRegister(userData:object){
        try{
            const response = await api.post('/register',userData)
            if(response){
                return true
            }
        }catch(error){
            setValidate("Usuário já existe")
        }
        return false
    }
    async function handleLoggout(){
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    function setValidate(text=""){
        setUserValidate(text)
    }

    useEffect(()=>{
        const userStorage = localStorage.getItem("user")
        const token = localStorage.getItem('token')
        
        async function auth(){
            return await api.get('/reauth',{headers:{"Authentication":`Baron ${token}`}})
        }
        const result = auth()
        if(result){
            if(userStorage){
                setUser(JSON.parse(userStorage))
            }
        }

    },[])

    return(
        <AuthContext.Provider value={{signed: !!user, user, userValidate, setValidate, handleLogin, handleRegister, handleLoggout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    
    const context = useContext(AuthContext)

    const {signed, user, userValidate, setValidate, handleLogin, handleRegister, handleLoggout} = context

    return {signed, user, userValidate, setValidate, handleLogin, handleRegister, handleLoggout}

}