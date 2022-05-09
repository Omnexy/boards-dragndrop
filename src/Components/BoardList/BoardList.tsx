import React, {FC, useEffect, useState} from 'react';
import {IBoard, ICard} from "../../Interfaces/Interfaces";
import {defaultBoards, initialBoard, initialCard} from "../../Constants/constants";
import classes from './BoardList.module.css';
import Board from "../Board/Board";
import CardCreator from "../CardCreator/CardCreator";
import MyModal from "../UI/MyModal/MyModal";
import BoardCreator from "../BoardCreator/BoardCreator";

const BoardList:FC = () => {

    const [boardList, setBoardList] = useState<IBoard[]>([])
    const [curBoard, setCurBoard] = useState<IBoard>(initialBoard)
    const [curCard, setCurCard] = useState<ICard>(initialCard)
    const [showCardCreator, setShowCardCreator] = useState<boolean>(false)
    const [showBoardCreator, setShowBoardCreator] = useState<boolean>(false)
    const [cardIdCount, setCardIdCount] = useState<number>(0)
    const [boardIdCount, setBoardIdCount] = useState<number>(0)

    useEffect(()=> {
        setBoardList(defaultBoards);
    },[])

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) {
        setCurBoard(board);
        setCurCard(card);
    }

    function onDropHandler(e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) {
        e.stopPropagation();
        e.currentTarget.style.background = 'none';

        setBoardList(boardList.map(b => {
            if(board.id === curBoard.id) {
                if(b.id !== curBoard.id)
                    return b;

                return {
                    ...b,
                    cards: b.cards.map(c => {
                        if(card.order > curCard.order) {
                            if(c.id === curCard.id)
                                return {...c, order: card.order};
                            if(c.order > curCard.order && c.order <= card.order)
                                return {...c, order: c.order - 1};
                            return c;
                        }
                        else {
                            if (c.id === curCard.id)
                                return {...c, order: card.order};
                            if(c.order >= card.order && c.order < curCard.order)
                                return {...c, order: c.order + 1};
                            return c;
                        }
                    })}
            }

            if(board.id !== curBoard.id) {
                if(b.id === curBoard.id) {
                    let spliced = b.cards;
                    spliced.splice(spliced.indexOf(curCard), 1);
                    spliced = spliced.map(s => {
                        if(s.order > curCard.order)
                            return {...s, order: s.order - 1};
                        return s;
                    })
                    return {...b, cards: spliced};
                }
                if(b.id === board.id) {
                    let tmpCards:ICard[] = b.cards.map(c => {
                        if(c.order > card.order)
                            return {...c, order: c.order + 1}
                        return c;
                    })
                    tmpCards.push({...curCard, board: board.id, order: card.order+1});
                    return {...b, cards: tmpCards};
                }
            }
            return b;
        }))
    }

    function boardOnDrop(e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) {
        e.stopPropagation();
        if(board === curBoard)
            return;
        setBoardList(boardList.map(b => {
            if(b.id === curBoard.id) {
                let spliced:ICard[] = b.cards;
                spliced.splice(spliced.indexOf(card), 1);
                spliced = spliced.map(s => {
                    if(s.order > curCard.order)
                        return {...s, order: s.order - 1};
                    return s;
                })
                return {...b, cards: spliced};
            }

            if(b.id === board.id) {
                let pushed:ICard[] = b.cards;
                pushed.push({...card, board: board.id, order: b.cards.length + 1});
                return {...b, cards: pushed};
            }

            return b;
        }))
    }

    function dragOverDelete(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.opacity = '1';
    }

    function dragLeaveDelete(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.opacity = '0';
    }

    function onDropDelete(e: React.DragEvent<HTMLDivElement>, card: ICard) {
        e.currentTarget.style.opacity = '0';

        setBoardList(boardList.map(b => {
            if(b.id === curBoard.id) {
                let spliced:ICard[] = b.cards;
                spliced.splice(spliced.indexOf(card), 1);
                return {...b, cards: spliced};
            }
            return b;
        }))
    }

    return (
        <div className={classes.BoardList__root}>

            <MyModal headerText='CardCreator' showModal={showCardCreator} setShowModal={setShowCardCreator}>
                <CardCreator
                    setShowCreator={setShowCardCreator}
                    boardList={boardList}
                    setBoardList={setBoardList}
                    cardIdCount={cardIdCount}
                    setCardIdCount={setCardIdCount}
                />
            </MyModal>

            <MyModal headerText='BoardCreator' showModal={showBoardCreator} setShowModal={setShowBoardCreator}>
                <BoardCreator
                    boardList={boardList}
                    setBoardList={setBoardList}
                    setShowCreator={setShowBoardCreator}
                    boardIdCount={boardIdCount}
                    setBoardIdCount={setBoardIdCount}
                />
            </MyModal>
            <button onClick={() => {
                for(let b = 0; b < boardList.length; b++) {
                    console.log(boardList[b].cards);
                }
                console.log('======')
            }
            }
            >
                Крякнуть в консоль
            </button>
            <button onClick={() => setShowBoardCreator(true)}>
                Добавить доску
            </button>
            <div className={classes.BoardList}>
                {boardList.map(b => {
                    return (
                        <Board
                            key={b.id}
                            board={b}
                            curCard={curCard}
                            boardDrop={boardOnDrop}
                            cardDrop={onDropHandler}
                            cardDragStart={dragStartHandler}
                        />
                    )
                })

                }
            </div>
            {boardList.length > 0 &&
                <button onClick={()=>setShowCardCreator(true)}>Добавить карточку</button>
            }
            <div
                className={classes.DeleteBox}
                onDragOver={e => dragOverDelete(e)}
                onDragEnd={e => dragLeaveDelete(e)}
                onDragLeave={e => dragLeaveDelete(e)}
                onDrop={e => onDropDelete(e, curCard)}
            >
                Удалить
            </div>
        </div>
    );
};

export default BoardList;