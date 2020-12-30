import Header from '../../components/Header'
import EmailInput from '../../components/EmailInput'
import PasswordInput from '../../components/PasswordInput'
import { useAuthContext } from '../../context/AuthContext'
import { useLoginContext } from '../../context/LoginContext'
import { useHistory } from 'react-router-dom'

export default function Login(){
    const { userValidate ,handleRegister, setValidate } = useAuthContext()
    const { email, password } = useLoginContext()
    const history = useHistory()

    async function handleSubimit(){
        if(userValidate === ""){
            const result = await handleRegister({email, password})
            if(result){
                history.push('/')
            }
        }
    }
    return(
        <>
            <Header title="Novo Registro" />

            <div className="inputs">
                <p className="errors">{userValidate}</p>
                <EmailInput />
                <PasswordInput />
                <PasswordInput placeholder="Confirmar Senha" confirm={true} />
            </div>

            <button 
                className="button"
                onClick={handleSubimit}
            >
                Registrar
            </button>
        </>
    )
}