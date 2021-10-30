import mappings from "../../mappings";
import { IntrinsicPushable } from "../base/IntrinsicPushable";

export class WallNoun extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("noun", "WALL", x, y, ...mappings.sprites.get("noun:WALL")!);
    }
}
