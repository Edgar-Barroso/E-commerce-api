import { CouponRepository } from "@/domain/repository/CouponRepository";
import { ValidateCouponInput } from "./ValidateCouponInput";
import { ValidateCouponOutput } from "./ValidateCoupontOutput";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";

export class ValidateCoupon{
    couponRepository: any;
    constructor(
        repositoryFactory:RepositoryFactory
    ){
        this.couponRepository = repositoryFactory.createCouponRepository()
    }

    async execute(input:ValidateCouponInput):Promise<ValidateCouponOutput>{
        const coupon = await this.couponRepository.findByCode(input.code)
        if(!coupon) throw new Error("Coupon not found")

        const isValid = coupon.isValid(new Date())
        const output = new ValidateCouponOutput(isValid)
        return output

    }
}