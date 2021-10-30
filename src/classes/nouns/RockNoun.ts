import mappings from "../../mappings";
import { IntrinsicPushable } from "../base/IntrinsicPushable";

export class RockNoun extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("noun", "ROCK", x, y, ...mappings.sprites.get("noun:ROCK")!);
    }
}
