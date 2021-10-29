import mappings from "../mappings";
import { IntrinsicPushable } from "./IntrinsicPushable";

export class YouProperty extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("property", "YOU", x, y, ...mappings.sprites.get("property:YOU")!);
    }
}
