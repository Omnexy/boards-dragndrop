import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../Routes/Routes";

const AppRouter = () => {

    const [isAuth, setIsAuth] = useState<boolean>(false);

    return (
        <BrowserRouter>
            {isAuth
                ? <Routes>
                    {privateRoutes.map(r => <Route key={r.path} path={r.path} element={<r.element/>}/>)}
                    <Route path='*' element={<Navigate to='/canban'/>}/>
                </Routes>
                : <Routes>
                    {publicRoutes.map(r => <Route key={r.path} path={r.path} element={<r.element/>}/>)}
                    <Route path='*' element={<Navigate to={'/login'}/>}/>
                </Routes>
            }
        </BrowserRouter>
    );
};

export default AppRouter;