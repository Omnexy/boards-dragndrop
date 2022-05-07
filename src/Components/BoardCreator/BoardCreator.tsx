import React, {FC, useState} from 'react';
import classes from './BoardCreator.module.css';
import {IBoard} from "../../Interfaces/Interfaces";

interface BoardCreatorProps {
    boardList: IBoard[];
    setBoardList: (newList: IBoard[]) => void;
    setShowCreator: (show: boolean) => void;
    boardIdCount: number;
    setBoardIdCount: (cnt: number) => void;
}

const BoardCreator:FC<BoardCreatorProps> = ({
                                                boardList,
                                                setBoardList,
                                                setShowCreator,
                                                boardIdCount,
                                                setBoardIdCount}) => {

    const [nameText, setNameText] = useState<string>('');

    const applyForm = (e: React.MouseEvent) => {
        e.preventDefault();
        setBoardList([...boardList, {id: boardIdCount + 1,
                                            name: nameText,
                                            order: boardList.length + 1,
                                            cards:[]}
                            ])  ;
        setBoardIdCount(boardIdCount + 1);
        setNameText('');
        setShowCreator(false);
    }

    return (
        <form className={classes.BoardForm}>
            <input
                value={nameText}
                placeholder='Название доски'
                onChange={e => setNameText(e.currentTarget.value)}
            />
            <button onClick={e => applyForm(e)}>Создать</button>
        </form>
    );
};

export default BoardCreator;