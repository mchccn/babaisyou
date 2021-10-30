import mappings from "../../mappings";
import { IntrinsicPushable } from "../base/IntrinsicPushable";

export class WinPredicate extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("predicate", "WIN", x, y, ...mappings.sprites.get("predicate:WIN")!);
    }
}
