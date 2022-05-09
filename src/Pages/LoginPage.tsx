import React, {useEffect} from 'react';
import Login from "../Components/Login/Login";

const LoginPage = () => {

    useEffect(() => {
        document.title = 'Вход';
    }, [])

    return (
        <div style={{width:'100%', height:'100%', left:'0'}}>
            <Login/>
        </div>
    );
};

export default LoginPage;