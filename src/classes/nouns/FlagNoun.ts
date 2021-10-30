import mappings from "../../mappings";
import { IntrinsicPushable } from "../base/IntrinsicPushable";

export class FlagNoun extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("noun", "FLAG", x, y, ...mappings.sprites.get("noun:FLAG")!);
    }
}
