import React from 'react'
import './Login.css'
import mybuhlerLogo from '../assets/mybuhler-logo.png'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography, colors } from '@mui/material'

function Login() {
    return <div className="background">
        <LoginBox />
    </ div>
}

function LoginBox() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleLoginClick = () => {
        window.location.href = '/search'
    }

    return <div className='center-card'>
        <Card className='login-card'>
            <div>
                <img src={mybuhlerLogo} alt="Logo" style={{width: '168px', paddingTop: '8px', paddingLeft: '16px'}}/>
            </div>
            <hr />
            <CardContent>
                <Typography className='login-font'>Login</Typography>
                <br />
                <TextField id="outlined-required" label="Username (E-mail) *" variant="outlined" fullWidth className='input-box'></TextField>
                <br />
                <br />
                <TextField
                    className='input-box'
                    id="outlined-password-input"
                    label="Password *"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                ></TextField>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel label='Remember me' control={<Checkbox defaultValue={0} className='remember-checkbox'/>}></FormControlLabel> 
                    <div className='forgot-password'>Forgot password?</div>
                </div>
                <br />
                <Button className='login-button' variant='contained' onClick={handleLoginClick}>Login</Button>
                <br />
                <br />
                <hr />
                <br />
                <div style={{display: 'flex', justifyContent: 'center', fontFamily: '"Roboto", sans-serif'}}>No access?</div>
                {/* <br /> */}
                <br /><Button className='req-button' variant='outlined'>Request account</Button>
            </CardContent>
        </Card>
    </div>
}

export default Login