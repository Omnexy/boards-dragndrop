import React, {useEffect} from 'react';
import './App.css';
import BoardList from "./Components/BoardList/BoardList";


function App() {

    useEffect(() => {
        document.title = 'Мой канбан';
    }, [])

    return (
        <div className="App">
            <BoardList/>
        </div>
    );
}

export default App;
