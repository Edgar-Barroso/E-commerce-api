import { Item } from "../entity/Item";
import { FreightCalculator } from "./FreightCalculator";

export class FixedFreightCalculator implements FreightCalculator{
    calculate(item: Item): number {
        return 10;
    }

}