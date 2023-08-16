export class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expireDate:Date = new Date()
  ) {}

  isValid(date:Date = new Date()) {
    return this.expireDate.getTime() >= date.getTime()
  }

  isExpired(date:Date = new Date()) {
    return !this.isValid(date)
  }

  calculateDiscount(amount:number,date:Date=new Date()){
    if(this.isExpired(date)) return 0
    return (amount * this.percentage)/100 
  }
}
