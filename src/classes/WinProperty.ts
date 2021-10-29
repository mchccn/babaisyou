import mappings from "../mappings";
import { IntrinsicPushable } from "./IntrinsicPushable";

export class WinProperty extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("property", "WIN", x, y, ...mappings.sprites.get("property:WIN")!);
    }
}
