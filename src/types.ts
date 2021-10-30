import { Entity } from "./classes/base/Entity";

export type Rule = {
    target: string;
    predicate: string;
};

export type RuleContext = {
    level: number;
    targets: Entity[];
    entities: Entity[];
    rules: Rule[];
    key?: string;
};
