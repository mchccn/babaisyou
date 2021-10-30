import mappings from "../../mappings";
import { Entity } from "../base/Entity";

export class Rock extends Entity {
    constructor(x: number, y: number) {
        super("subject", "ROCK", x, y, ...mappings.sprites.get("subject:ROCK")!);
    }
}
