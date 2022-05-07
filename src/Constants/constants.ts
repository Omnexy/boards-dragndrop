import {IBoard, ICard} from "../Interfaces/Interfaces";

export const defaultBoards: IBoard[] = [
    {id: 1, order:1, name: 'Доска 1', cards: []},
    {id: 2, order:2, name: 'Доска 2', cards: []},
    {id: 3, order:3, name: 'Доска 3', cards: []}
]

export const initialBoard: IBoard = {
    id: 0,
    order: 0,
    name: '',
    cards: []
}

export const initialCard: ICard = {
    id: 0,
    order: 0,
    board: 0,
    text: ''
}