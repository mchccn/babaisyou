import mappings from "../../mappings";
import { IntrinsicPushable } from "../base/IntrinsicPushable";

export class StopPredicate extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("predicate", "STOP", x, y, ...mappings.sprites.get("predicate:STOP")!);
    }
}
