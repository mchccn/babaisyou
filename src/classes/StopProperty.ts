import mappings from "../mappings";
import { IntrinsicPushable } from "./IntrinsicPushable";

export class StopProperty extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("property", "STOP", x, y, ...mappings.sprites.get("property:STOP")!);
    }
}
