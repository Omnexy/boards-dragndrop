import React, {FC} from 'react';
import {ICard} from "../../Interfaces/Interfaces";
import classes from './CardCreatod.module.css';

interface CreatorProps {
    createFunction: (card: ICard) => void;
}

const CardCreator:FC/*<CreatorProps>*/ = () => {

    const formApplyFunction = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    return (
        <div className={classes.bg}>
            <form className={classes.cardForm}>
                <input placeholder='Текст карточки'/>
                <button onClick={e => formApplyFunction(e)}>Создать</button>
            </form>
        </div>
    );
};

export default CardCreator;