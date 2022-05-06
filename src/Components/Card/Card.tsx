import React, {FC} from 'react';
import {IBoard, ICard} from "../../Interfaces/Interfaces";
import classes from './Card.module.css';

interface CardProps {
    board: IBoard;
    card: ICard;
    cardDrop: (e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) => void;
    cardDragStart: (e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) => void;
}

const Card:FC<CardProps> = ({board, card, cardDrop, cardDragStart}) => {

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.background = 'lightgrey';
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.background = 'none';
    }

    return (
        <div
            key={card.id}
            draggable
            onDragStart={e => cardDragStart(e, card, board)}
            onDragOver={e => dragOverHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDragLeave={e => dragEndHandler(e)}
            onDrop={e => cardDrop(e, card, board)}
            className={classes.Card}
        >
            {card.text}
        </div>
    );
};

export default Card;