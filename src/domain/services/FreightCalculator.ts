import { Item } from "../entity/Item";

export interface FreightCalculator{
    calculate(item:Item):number
}