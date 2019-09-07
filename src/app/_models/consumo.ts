import { Detalle } from './detalle';
import { Cliente } from './cliente';

export class Consumo{
    id : string;
    cliente : Cliente;
    fechaPedido : Date;
    total : number;
    detalle : Detalle[];
}