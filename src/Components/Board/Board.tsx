import React, {FC} from 'react';
import {IBoard, ICard} from "../../Interfaces/Interfaces";
import classes from './Board.module.css';
import {cardSort} from "../../Utils/utils";
import Card from "../Card/Card";

interface BoardProps {
    board: IBoard;
    curCard: ICard;
    boardDrop: (e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) => void;
    cardDrop: (e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) => void;
    cardDragStart: (e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) => void;
}

const Board:FC<BoardProps> = ({board, curCard, boardDrop, cardDrop, cardDragStart}) => {

    function boardOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    function boardLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <div
            key={board.id}
            className={classes.Board}
            onDrop={e => boardDrop(e, curCard, board)}
            onDragOver={e => boardOverHandler(e)}
            onDragLeave={e => boardLeaveHandler(e)}
        >
            <div className={classes.Board__Header}>
                {board.name}
            </div>
            <div className={classes.Board__CardList}>
                {board.cards.sort(cardSort).map(c => {
                    return (
                        <Card
                            key={c.id}
                            board={board}
                            card={c}
                            cardDrop={cardDrop}
                            cardDragStart={cardDragStart}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default Board;