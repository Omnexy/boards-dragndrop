import React, {useEffect, useState} from 'react';
import './App.css';
import {IBoard, ICard} from "./Interfaces/Interfaces";
import {boardList, initialBoard, initialCard} from "./Constants/constants";
import {cardSort} from "./Utils/utils";



function App() {

    const [boards, setBoards] = useState<IBoard[]>([])

    const [curBoard, setCurBoard] = useState<IBoard>(initialBoard)
    const [curCard, setCurCard] = useState<ICard>(initialCard)

    useEffect(()=> {
        setBoards(boardList);
    },[])

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) {
        setCurBoard(board);
        setCurCard(card);
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.background = 'lightgrey';
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.background = 'none';
    }

    function onDropHandler(e: React.DragEvent<HTMLDivElement>, card: ICard, board: IBoard) {
        e.stopPropagation();
        e.currentTarget.style.background = 'none';

        setBoards(boards.map(b => {
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
                    tmpCards.push({...curCard, order: card.order+1});
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
        setBoards(boards.map(b => {
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
                pushed.push({...card, order: b.cards.length + 1});
                return {...b, cards: pushed};
            }

            return b;
        }))
    }

    function boardOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    function boardLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <div className="App">
            <button onClick={() => {
                            for(let b = 0; b < boards.length; b++) {
                                console.log(boards[b].cards);
                            }
                            console.log('======')
                        }
                    }
            >
                push
            </button>
            {boards.map(b => {
                return (
                    <div
                        key={b.id}
                        className="Board"
                        onDrop={e => boardOnDrop(e, curCard, b)}
                        onDragOver={e => boardOverHandler(e)}
                        onDragLeave={e => boardLeaveHandler(e)}
                    >
                        <div className="Board__Header">{b.name}</div>
                        <div className="Board__CardList">
                            {b.cards.sort(cardSort).map(c => {
                                return (
                                    <div
                                        key={c.id}
                                        draggable
                                        onDragStart={e => dragStartHandler(e, c, b)}
                                        onDragOver={e => dragOverHandler(e)}
                                        onDragEnd={e => dragEndHandler(e)}
                                        onDragLeave={e => dragEndHandler(e)}
                                        onDrop={e => onDropHandler(e, c, b)}
                                        className="Card"
                                    >
                                        {c.text}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })

            }
        </div>
    );
}

export default App;
