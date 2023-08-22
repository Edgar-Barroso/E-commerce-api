import { DomainEvent } from "./DomainEvent";

export interface Handler {
    handle(event: DomainEvent): void;
    name: string;
}
