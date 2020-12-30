import logo from '../../assets/images/logo.svg'

interface HeaderProps{
    title: string
    styleName?: string
}

 function Header({title,styleName=""}:HeaderProps){
    return(
        <header className="header">
            <img src={logo} alt="MedSênior"/>
            <h3 className={styleName?`title ${styleName}`:"title"}>{title}</h3>
        </header>
    )
}

export default Header