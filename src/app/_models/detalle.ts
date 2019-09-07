import { Plato } from './plato';

export class Detalle{
    id : string;
    plato : Plato;
    cantidad : number;
    _index : number; //apoyo para paginator
}