import mappings from "../mappings";
import { IntrinsicPushable } from "./IntrinsicPushable";

export class IsVerb extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("verb", "IS", x, y, ...mappings.sprites.get("verb:IS")!);
    }
}
