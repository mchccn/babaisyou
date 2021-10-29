import mappings from "../mappings";
import { IntrinsicPushable } from "./IntrinsicPushable";

export class PushProperty extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("property", "PUSH", x, y, ...mappings.sprites.get("property:PUSH")!);
    }
}
