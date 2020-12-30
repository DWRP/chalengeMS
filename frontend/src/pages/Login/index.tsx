import { Link, useHistory } from 'react-router-dom'

import EmailInput from '../../components/EmailInput'
import Header from '../../components/Header'
import PasswordInput from '../../components/PasswordInput'
import { useAuthContext } from '../../context/AuthContext'
import { useLoginContext } from '../../context/LoginContext'

export default function Login(){
    const history = useHistory()
    const { handleLogin, userValidate } = useAuthContext()
    const {email, password } = useLoginContext()

    async function handleSubmit(){
        await handleLogin({email, password})
        history.push('/home')
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