import React, {useEffect} from 'react';
import BoardList from "../Components/BoardList/BoardList";

const CanbanPage = () => {

    useEffect(() => {
        document.title = 'Мой канбан';
    }, [])

    return (
        <div>
            <BoardList/>
        </div>
    );
};

export default CanbanPage;