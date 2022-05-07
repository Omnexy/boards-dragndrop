import React, {FC, useEffect, useState} from 'react';
import {IBoard, ICard} from "../../Interfaces/Interfaces";
import classes from './CardCreatod.module.css';

interface CreatorProps {
    showCreator: boolean;
    setShowCreator: (show: boolean) => void;
    boardList: IBoard[];
    setBoardList: (newBoardList: IBoard[]) => void;
    cardIdCount: number;
    setCardIdCount: (cnt: number) => void;
}

const CardCreator:FC<CreatorProps> = ({showCreator,
                                          setShowCreator,
                                          boardList,
                                          setBoardList,
                                          cardIdCount,
                                          setCardIdCount}) => {

    const [addBoard, setAddBoard] = useState<string>('0')
    const [cardText, setCardText] = useState<string>('')

    const formApplyFunction = (e: React.MouseEvent) => {
        e.preventDefault();

        if(addBoard === '0' || cardText === ''){
            alert('Заданы не все параметры!!!');
            return;
        }

        setBoardList(boardList.map(b => {
                if(b.id === parseInt(addBoard)) {
                    let newCard:ICard = {id: cardIdCount+1, board: b.id, order: b.cards.length + 1, text: cardText};
                    setCardIdCount(cardIdCount + 1);
                    return {...b, cards: [...b.cards, newCard]};
                }

                return b;
            })
        )
        setCardText('');
        setAddBoard('0');
        setShowCreator(false);
    }



    useEffect(() => {
        const escapeListener = (e: KeyboardEvent) => {
            if(e.code === 'Escape'){
                setCardText('');
                setAddBoard('0');
                setShowCreator(false);
            }
        }

        document.addEventListener('keydown', escapeListener);

        return () => {
            document.removeEventListener('keydown', escapeListener);
        }
    },[setShowCreator])

    return (
        <>
            {showCreator &&
                <div className={classes.bg} onClick={()=>setShowCreator(false)}>
                    <form onClick={(e)=>e.stopPropagation()} className={classes.cardForm}>
                        <input
                            value={cardText}
                            onChange={e => setCardText(e.currentTarget.value)}
                            placeholder='Текст карточки'
                        />
                        <select
                            value={addBoard}
                            onChange={(e)=> setAddBoard(e.currentTarget.value)}
                        >
                            <option defaultChecked value='0' hidden>Выберите доску</option>
                            {boardList.map(b => {
                                return (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                )
                            })}
                        </select>
                        <button onClick={e => formApplyFunction(e)}>Создать</button>
                    </form>
                </div>
            }
        </>
    );
};

export default CardCreator;