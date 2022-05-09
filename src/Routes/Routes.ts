import {IRoute} from "../Interfaces/Interfaces";
import CanbanPage from "../Pages/CanbanPage";
import LoginPage from "../Pages/LoginPage";

export const privateRoutes:IRoute[] = [
    {path:'/canban', element: CanbanPage},
    // {path:'/task/:id', element: TaskPage}
]

export const publicRoutes:IRoute[] = [
    {path:'/login', element: LoginPage}
]