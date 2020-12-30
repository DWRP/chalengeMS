import { ChangeEvent } from "react"
import { useAuthContext } from "../../context/AuthContext"
import { useLoginContext  } from "../../context/LoginContext"

export default function Email(){
    const {email,setEmail} = useLoginContext()
    const {setValidate} = useAuthContext()

    function handleMail(event: ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value)
    }

    return(
        <>
            <input
                name="email"
                className="mail-input"
                type="email" 
                placeholder="Email"
                value={email}
                onChange={handleMail}
                onClick={()=>setValidate()}
                required
            />
        </>
    )
}