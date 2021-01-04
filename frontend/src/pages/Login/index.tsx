import { Link, useHistory } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

import Header from '../../components/Header'

import { 
    Button, 
    TextField, 
    OutlinedInput, 
    InputLabel, 
    InputAdornment, 
    FormControl, 
    FormHelperText, 
    IconButton,
    CircularProgress
} from '@material-ui/core';

import { 
    Visibility, 
    VisibilityOff,  
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

import { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: any) => ({

    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '90%',
    },
}));

export default function Login(){
    const history = useHistory()
    
    const classes = useStyles();
    
    const { handleLogin } = useAuthContext()

    const [ loading, setLoading ] = useState(false)
    const [values, setValues] = useState({
        email: '',
        password: '',
        errorMail:false,
        showPassword: false,
        errorPass:false,
        errorText: ''
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };
    
    const validateValues = ()=>{
        // eslint-disable-next-line
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        
        if(values.password && values.email){
            
            if(values.password.length < 6){
                setValues({ ...values, errorPass: !values.errorPass, errorText: 'Senha muito curta!' })
                return false
            }

            if(!regexp.test(values.email)){
                setValues({ ...values, errorMail: !values.errorMail, errorText: 'Email Inválido' })
                return false
            }
            
            return true
        }
        else{
            if(!values.email){
                setValues({ ...values, errorMail: !values.errorMail, errorText: 'Email não pode ser vazio' })
            }
            if(!values.password){
                setValues({ ...values, errorPass: !values.errorPass, errorText: 'Senha não pode ser vazia' })
            }
        }
        
        return false
    }
    
    const handleSubmit = async () =>{
        if(validateValues()){
            const login = await handleLogin({email: values.email, password: values.password})
            if(login){
                history.push('/home')
            }
            else{
                setValues({ 
                    ...values, 
                    errorMail: !values.errorMail, 
                    errorPass: !values.errorPass, errorText: 'Email ou senha inválido' 
                })
            }
        }
        setLoading(false)
    }

    if(loading){
        return <CircularProgress />
    }

    return(
        <>
            
            <Header title="Entrar" />

            <FormControl 
                className={clsx(classes.margin, classes.textField)} 
                variant="outlined" 
                error={values.errorMail}
            >
                <TextField
                    error={values.errorMail}
                    id="outline-email"
                    value={values.email}
                    label="Email"
                    type="email"
                    onChange={handleChange('email')}
                    aria-describedby="outline-email-text"
                    variant="outlined"
                >
                    Email
                </TextField>
    
                <FormHelperText 
                    id="outline-email-text" 
                    hidden={!values.errorMail}
                >
                    {values.errorText}
                </FormHelperText>
            </FormControl>
            
            <FormControl 
                className={clsx(classes.margin, classes.textField)} 
                variant="outlined" 
                error={values.errorPass}
            >
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={70}
                    required
                />
                <FormHelperText 
                    id="outlined-adornment-password-text" 
                    hidden={!values.errorPass}
                >
                    {values.errorText}
                </FormHelperText>
            </FormControl>
            
            <Link to="/register">
                Não possui conta ainda? <span>Registre-se aqui</span>
            </Link>

            <Button 
                variant="contained" 
                color="primary"
                size="large"
                onClick={()=>{
                    setLoading(true)
                    handleSubmit()
                    
                }}
            >
                ENTRAR
            </Button>
        </>
    )
}