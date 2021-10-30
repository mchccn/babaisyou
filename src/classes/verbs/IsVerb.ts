import mappings from "../../mappings";
import { IntrinsicPushable } from "../base/IntrinsicPushable";

export class IsVerb extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("verb", "IS", x, y, ...mappings.sprites.get("verb:IS")!);
    }
}
