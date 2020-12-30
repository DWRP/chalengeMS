import { ChangeEvent, useState } from "react"
import { useLoginContext  } from "../../context/LoginContext"

import passShow from '../../assets/images/eye.svg'
import { useAuthContext } from "../../context/AuthContext"

export default function Password({placeholder="Senha",confirm=false}){
    const {password,setPassword} = useLoginContext()
    const [localPass, setLocalPass] = useState("")
    const [showInputText, setshowInputText] = useState(true)
    const {setValidate} = useAuthContext()

    function handlePassword(event: ChangeEvent<HTMLInputElement>){
        if(password.length < 6 && password){
            setValidate("Senha muito curta")
        }else{
            setValidate()
        }
        setLocalPass(event.target.value)
        setPassword(event.target.value)
    }

    function checkPass(event: ChangeEvent<HTMLInputElement>){
        if(confirm){
            setLocalPass(event.target.value)
        }
        if(event.target.value === password){
            console.log('Confirmed')
        }else{
            setValidate("Senhas não conferem!")
        }
        if(password.length < 6 && password){
            setValidate("Senha muito curta")
        }else{
            setValidate()
        }
    }

    function handleShowPassword(){
        setshowInputText(!showInputText)
    }

    return(
        <>
            <input
                name="password"
                type={showInputText?"password":"text"} 
                placeholder={placeholder} 
                value={localPass}
                onChange={!confirm?handlePassword:checkPass}
                onClick={()=>setValidate()}
                onKeyPress={()=>setValidate()}
            />
            <button className="show-button" onClick={handleShowPassword}>
                <img src={passShow} alt="Password Show"/>
            </button>
            
        </>
    )
}