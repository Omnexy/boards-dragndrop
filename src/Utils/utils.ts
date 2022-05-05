import {ICard} from "../Interfaces/Interfaces";


export function cardSort(a: ICard, b: ICard):number {
    return a.order > b.order ? 1 : -1;
}