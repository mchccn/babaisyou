import mappings from "../mappings";
import { IntrinsicPushable } from "./IntrinsicPushable";

export class BabaNoun extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("noun", "BABA", x, y, ...mappings.sprites.get("noun:BABA")!);
    }
}
