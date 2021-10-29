import mappings from "../mappings";
import { IntrinsicPushable } from "./IntrinsicPushable";

export class WallNoun extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("noun", "WALL", x, y, ...mappings.sprites.get("noun:WALL")!);
    }
}
