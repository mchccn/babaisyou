import mappings from "../mappings";
import { IntrinsicPushable } from "./IntrinsicPushable";

export class RockNoun extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("noun", "ROCK", x, y, ...mappings.sprites.get("noun:ROCK")!);
    }
}
