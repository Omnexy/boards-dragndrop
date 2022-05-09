
export interface ICard {
    id: number;
    board: number;
    order: number;
    text: string;
}

export interface IBoard {
    id: number;
    order: number;
    name: string;
    cards: ICard[];
}

export interface IRoute {
    path: string;
    element: React.ComponentType;
}