import { DefaultFreightCalculator } from "../services/DefaultFreightCalculator";
import { FreightCalculator } from "../services/FreightCalculator";
import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { Item } from "./Item";
import { OrderCode } from "./OrderCode";
import { OrderItem } from "./OrderItem";

export class Order {


  cpf: Cpf;
  orderItems: OrderItem[];
  coupon: Coupon | undefined;
  private freight: number;
  private code: OrderCode;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
    readonly sequence: number = 1
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
    this.code = new OrderCode(date,sequence)
    
  }

  getOrderItems():OrderItem[] {
    return [...this.orderItems]
  }

  getCpf(): string {
    return this.cpf.value
  }

  getCode(): string {
    return this.code.value
  }

  addItem(item: Item, quantity: number) {
    this.freight += this.freightCalculator.calculate(item) * quantity;
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isValid(this.date)) return;
    this.coupon = coupon;
  }

  getFreight() {
    return this.freight;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }
    total += this.getFreight();
    return total;
  }
}
