import { CouponRepository } from "@/domain/repository/CouponRepository";
import { ItemRepository } from "@/domain/repository/ItemRepository";
import { OrderRepository } from "@/domain/repository/OrderRepository";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import { StockEntryRepository } from "@/domain/repository/StockEntryRepository";
import { StockEntryRepositoryDatabase } from "../repository/database/StockEntryRepositoryDatabase";

export class DatabaseRepositoryFactory implements RepositoryFactory{
    connection = PgPromiseConnectionAdapter.getInstance()

    createStockEntryRepository(): StockEntryRepository {
        return new StockEntryRepositoryDatabase(this.connection)
    }
    createOrderRepository(): OrderRepository {
        return new OrderRepositoryDatabase(this.connection)
    }
    createItemRepository(): ItemRepository {
        return new ItemRepositoryDatabase(this.connection)
    }
    createCouponRepository(): CouponRepository {
        return new CouponRepositoryDatabase(this.connection)
    }

}