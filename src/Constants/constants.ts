import {IBoard, ICard} from "../Interfaces/Interfaces";

export const boardList: IBoard[] = [
    {id: 1, order:1, name: 'Доска 1', cards: [
            {id:1, board: 1, order:1, text: 'Карта 1'},
            {id:2, board: 1, order:2, text: 'Карта 2'},
            {id:3, board: 1, order:3, text: 'Карта 3'},
        ]},
    {id: 2, order:2, name: 'Доска 2', cards: [
            {id:4, board: 2, order:1, text: 'Карта 4'},
            {id:5, board: 2, order:2, text: 'Карта 5'},
            {id:6, board: 2, order:3, text: 'Карта 6'},
        ]},
    {id: 3, order:3, name: 'Доска 3', cards: [
            {id:7, board: 3, order:1, text: 'Карта 7'},
            {id:8, board: 3, order:2, text: 'Карта 8'},
            {id:9, board: 3, order:3, text: 'Карта 9'},
            {id:10, board: 3, order:4, text: 'Карта 10'}
        ]}
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