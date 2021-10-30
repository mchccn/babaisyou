import mappings from "../../mappings";
import { IntrinsicPushable } from "../base/IntrinsicPushable";

export class YouPredicate extends IntrinsicPushable {
    constructor(x: number, y: number) {
        super("predicate", "YOU", x, y, ...mappings.sprites.get("predicate:YOU")!);
    }
}
