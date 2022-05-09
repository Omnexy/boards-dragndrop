import React, {useState} from 'react';
import classes from './Login.module.css';
import axios from "axios";

const Login = () => {

    const [loginText, setLoginText] = useState<string>('');
    const [passwordText, setPasswordText] = useState<string>('');

    const formApply = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const resp = await axios.post(`http://192.168.0.102:3001/api/auth/login`, {
                userName: loginText,
                password: passwordText
            });

            console.log(resp);

        }catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={classes.Login__root}>
            <form className={classes.Login__form}>
                <input value={loginText} placeholder='Логин' onChange={e=>setLoginText(e.currentTarget.value)}/>
                <input value={passwordText} placeholder='Пароль' onChange={e=>setPasswordText(e.currentTarget.value)}/>
                <button onClick={e=>formApply(e)}>Жмакай не ссы</button>
            </form>
        </div>
    );
};

export default Login;