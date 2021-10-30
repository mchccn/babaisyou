import mappings from "../../mappings";
import { IntrinsicPushable } from "../base/IntrinsicPushable";

export class PushPredicate extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("predicate", "PUSH", x, y, ...mappings.sprites.get("predicate:PUSH")!);
    }
}
