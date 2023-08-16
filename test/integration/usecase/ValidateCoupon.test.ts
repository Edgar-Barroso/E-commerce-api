import { ValidateCoupon } from "@/application/usecase/validate_coupom/ValidateCoupon"
import { ValidateCouponInput } from "@/application/usecase/validate_coupom/ValidateCouponInput"
import { DatabaseRepositoryFactory } from "@/infra/factory/DatabaseRepositoryFactory"

let validateCoupon:ValidateCoupon

beforeEach(()=>{
    const repositoryFactory = new DatabaseRepositoryFactory()
    validateCoupon = new ValidateCoupon(repositoryFactory)

})

test("Deve validar um cupom de desconto válido",async()=>{
    const input = new ValidateCouponInput("VALE20")
    const output = await validateCoupon.execute(input)
    expect(output.isValid).toBe(true)
})

test("Deve validar um cupom de desconto expirado",async()=>{
    const input = new ValidateCouponInput("VALE20_EXPIRED")
    const output = await validateCoupon.execute(input)
    expect(output.isValid).toBe(false)
})

test("Deve levantar um erro ao receber um cupom que não existe", async () => {
    const input = new ValidateCouponInput("COUPOM_NOT_FOUND");
    await expect(validateCoupon.execute(input)).rejects.toThrow(new Error("Coupon not found"))
  });
