
export class SimulateFreightInput {
  constructor(
    readonly orderItems: { idItem: number; quantity: number }[],
  ) {

  }
}
