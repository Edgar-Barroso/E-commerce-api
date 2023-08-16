export class SaveStockInput{
    constructor(readonly idItem:number,readonly operation:string,readonly quantity:number,readonly date = new Date()){
        
    }
}