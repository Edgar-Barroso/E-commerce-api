import Connection from "./Connection";
import pgp from "pg-promise";

import { DATABASE_URL } from "../../../env/env"



export default class PgPromiseConnectionAdapter implements Connection {
	pgp: any;
	static instance: PgPromiseConnectionAdapter;

	private constructor () {
		this.pgp = pgp()(DATABASE_URL);
	}

	static getInstance () {
		if (!PgPromiseConnectionAdapter.instance) {
			PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
		}
		return PgPromiseConnectionAdapter.instance;
	}

	async query(statement: string, params: any[]): Promise<any> {
		return this.pgp.query(statement, params);
	}
}
