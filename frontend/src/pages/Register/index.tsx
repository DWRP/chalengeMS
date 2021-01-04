import { useHistory } from 'react-router-dom'
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
    
}))

export default function Login(){
    const history = useHistory()

    const classes = useStyles();
    
    const { handleRegister } = useAuthContext()
    
    const [ loading, setLoading ] = useState(false)
    const [values, setValues] = useState({
        email: '',
        emailError:false,
        password: '',
        showPassword: false,
        passwordError:false,
        confirmPassword: '',
        showPasswordConfirm: false,
        confirmPasswordError:false,
        errorText: ''
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values,[prop+"Error"]:false, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowPasswordConfirm = () => {
        setValues({ ...values, showPasswordConfirm: !values.showPasswordConfirm });
    };
    
    const handleMouseDownInput = (event: any) => {
        event.preventDefault();
    };
    
    const validateValues = ()=>{
        // eslint-disable-next-line
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        
        if(values.password && values.email && values.confirmPassword){
            
            if(values.password.length < 6){
                setValues({ 
                    ...values, 
                    passwordError: !values.passwordError, 
                    errorText: 'Senha muito curta!' 
                })
                return false
            }
            if(values.confirmPassword !== values.password){
                setValues({ 
                    ...values, 
                    confirmPasswordError: !values.confirmPasswordError, 
                    errorText: 'Senhas diferentes!' 
                })
                return false
            }

            if(!regexp.test(values.email)){
                setValues({ 
                    ...values, 
                    emailError: !values.emailError, 
                    errorText: 'Email Inválido' 
                })
                return false
            }
            
            return true
        }
        else{
            if(!values.email){
                setValues({ 
                    ...values, 
                    emailError: !values.emailError, 
                    errorText: 'Email não pode ser vazio' 
                })
            }
            if(!values.password){
                setValues({ 
                    ...values, 
                    passwordError: !values.passwordError, 
                    errorText: 'Senha não pode ser vazia' 
                })
            }
            if(!values.confirmPassword){
                setValues({ 
                    ...values,
                    confirmPasswordError: !values.confirmPasswordError, 
                    errorText: 'Repita a senha anterior' 
                })
            }
            if(!values.password && !values.email){
                setValues({ 
                    ...values, 
                    emailError: !values.emailError, 
                    passwordError: !values.passwordError, 
                    errorText: 'Por favor, preencha todos os campos' 
                })
            }
            if(!values.password && !values.email && !values.confirmPassword){
                setValues({ 
                    ...values,
                    emailError: !values.emailError, 
                    passwordError: !values.passwordError, 
                    confirmPasswordError: !values.confirmPasswordError, 
                    errorText: 'Por favor, preencha todos os campos' 
                })
            }
            
        }
        
        return false
    }
    
    const handleSubmit = async () =>{
        if(validateValues()){
            const register = await handleRegister({
                email: values.email, 
                password: values.password
            })
            
            if(register){
                history.push('/')
            }
            else{
                setValues({ ...values, 
                    emailError: !values.emailError, 
                    errorText: 'Email já registrado!' 
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
            <Header title="Novo Registro" />

            {/* EMAIL */}
            <FormControl 
                className={clsx(classes.margin, classes.textField)} 
                variant="outlined" 
                error={values.emailError}
            >
                <TextField
                    error={values.emailError}
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
                    hidden={!values.emailError}
                >
                    {values.errorText}
                </FormHelperText>
            </FormControl>
            
            {/* PASSWORD */}
            <FormControl 
                className={clsx(classes.margin, classes.textField)} 
                variant="outlined" 
                error={values.passwordError}
            >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                        onMouseDown={handleMouseDownInput}
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
                    hidden={!values.passwordError}
                >
                    {values.errorText}
                </FormHelperText>
            </FormControl>
            
            {/* CONFIRM PASSWORD */}
            <FormControl 
                className={clsx(classes.margin, classes.textField)} 
                variant="outlined" 
                error={values.confirmPasswordError}
            >
                <InputLabel htmlFor="outlined-adornment-password">Confirme a Senha</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-confirm"
                    type={values.showPasswordConfirm ? 'text' : 'password'}
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownInput}
                        edge="end"
                        >
                        {values.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={130}
                    required
                />
                <FormHelperText 
                    id="outlined-adornment-password-text" 
                    hidden={!values.confirmPasswordError}
                >
                    {values.errorText}
                </FormHelperText>
            </FormControl>
            
            <Button 
                variant="contained" 
                color="primary"
                size="large"
                onClick={()=>{
                    setLoading(true)
                    handleSubmit()
                }}    
            >
                Registrar-se
            </Button>
        </>
    )
}