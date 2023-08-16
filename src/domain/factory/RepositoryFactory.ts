import { CouponRepository } from "../repository/CouponRepository";
import { ItemRepository } from "../repository/ItemRepository";
import { OrderRepository } from "../repository/OrderRepository";
import { StockEntryRepository } from "../repository/StockEntryRepository";

export interface RepositoryFactory{
    createStockEntryRepository():StockEntryRepository;
    createOrderRepository():OrderRepository
    createItemRepository():ItemRepository
    createCouponRepository():CouponRepository
}