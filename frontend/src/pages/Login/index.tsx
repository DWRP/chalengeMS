import { Link, useHistory } from 'react-router-dom'

import EmailInput from '../../components/EmailInput'
import Header from '../../components/Header'
import PasswordInput from '../../components/PasswordInput'
import { useAuthContext } from '../../context/AuthContext'
import { useLoginContext } from '../../context/LoginContext'

export default function Login(){
    const history = useHistory()
    const { handleLogin, userValidate, setValidate } = useAuthContext()
    const {email, password } = useLoginContext()

    async function handleSubmit(){
        // eslint-disable-next-line
        const mailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if(email && password){
            if(mailRegex.test(email)){
                await handleLogin({email, password})
                history.push('/home')
            }else{
                setValidate("Email inválido!")
            }
        }else(
            setValidate("Usuário e/ou Senha não pode estar vazio!")
        )

    }
    return(
        <>
            
            <Header title="Entrar" />
            
            <div className="inputs">
                <p className="errors">{userValidate}</p>
                <EmailInput />
                <PasswordInput />
                <Link to="/register">
                    Não possui conta ainda? <span>Registre-se aqui</span>
                </Link>
            </div>

            <button className="button" onClick={handleSubmit}>Entrar</button>
        </>
    )
}