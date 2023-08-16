import { DomainEvent } from "./DomainEvent";

export interface Handler{
    handle(event: DomainEvent):Promise<void>;
    name:string;
}