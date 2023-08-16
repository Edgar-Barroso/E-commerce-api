import ItemDAO from "../../dao/ItemDAO";

export class GetItems {

	constructor (readonly itemDAO: ItemDAO) {
	}

	async execute () {
		return this.itemDAO.findAll();
	}
}
