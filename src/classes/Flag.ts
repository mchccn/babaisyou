import mappings from "../mappings";
import { Entity } from "./Entity";

export class Flag extends Entity {
    constructor(x: number, y: number) {
        super("subject", "FLAG", x, y, ...mappings.sprites.get("subject:FLAG")!);
    }
}
