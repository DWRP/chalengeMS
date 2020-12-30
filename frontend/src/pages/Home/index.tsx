import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useAuthContext } from '../../context/AuthContext'

import './styles.css'

export default function Login(){
    const { handleLoggout } = useAuthContext()
    const [ip, setIp] = useState("000.000.0.00")

    useEffect(()=>{
        async function loadIp(){
            let ipAdress = await axios.get('https://api.ipify.org/?format=json')
            setIp(ipAdress.data.ip)
        }
        loadIp()
    },[])
    return(
        <>
            <Header title="Bem vindo" styleName="special-class" />
            <h3 className="message">Agora você é um filiado!</h3>

            <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent neque accumsan consequat, posuere dolor, arcu nisl nunc pellentesque. Euismod consequat massa aenean penatibus sed viverra sit enim. Mattis arcu at dolor pulvinar ultricies euismod duis mattis. Volutpat phasellus turpis enim odio. Vitae auctor morbi mi purus in at neque accumsan, fermentum. Ultrices placerat malesuada porta arcu ipsum faucibus. Quam proin at lorem amet enim nibh luctus eu. Sagittis ut adipiscing consectetur in est porta mollis in. Vitae in faucibus tellus amet neque, imperdiet. Leo tellus diam dui augue morbi sed.</p>
            
            <div className="footer">
                <p>ip: {ip}</p>
                <button 
                    className="back-button"
                    onClick={handleLoggout}
                >
                    LOGGOUT
                </button>
            </div>
        </>
    )
}