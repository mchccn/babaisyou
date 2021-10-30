import { BabaNoun } from "./classes/nouns/BabaNoun";
import { FlagNoun } from "./classes/nouns/FlagNoun";
import { RockNoun } from "./classes/nouns/RockNoun";
import { WallNoun } from "./classes/nouns/WallNoun";
import { PushPredicate } from "./classes/predicates/PushPredicate";
import { StopPredicate } from "./classes/predicates/StopPredicate";
import { WinPredicate } from "./classes/predicates/WinPredicate";
import { YouPredicate } from "./classes/predicates/YouPredicate";
import { Baba } from "./classes/subjects/Baba";
import { Empty } from "./classes/subjects/Empty";
import { Flag } from "./classes/subjects/Flag";
import { Rock } from "./classes/subjects/Rock";
import { Wall } from "./classes/subjects/Wall";
import { IsVerb } from "./classes/verbs/IsVerb";
import Push from "./rules/Push";
import Stop from "./rules/Stop";
import Win from "./rules/Win";
import You from "./rules/You";
import { RuleContext } from "./types";

const mappings = {
    classes: new Map([
        ["subject:EMPTY", () => Empty],
        ["subject:BABA", () => Baba],
        ["subject:FLAG", () => Flag],
        ["subject:ROCK", () => Rock],
        ["subject:WALL", () => Wall],
        ["noun:BABA", () => BabaNoun],
        ["noun:WALL", () => WallNoun],
        ["noun:FLAG", () => FlagNoun],
        ["noun:ROCK", () => RockNoun],
        ["predicate:YOU", () => YouPredicate],
        ["predicate:STOP", () => StopPredicate],
        ["predicate:WIN", () => WinPredicate],
        ["predicate:PUSH", () => PushPredicate],
        ["verb:IS", () => IsVerb],
    ]),
    sprites: new Map<string, [number, number, number, number]>([
        ["subject:EMPTY", [37 * 5, 37.5 * 6, 37, 37]],
        ["subject:BABA", [37 * 0, 38.5 * 1, 37, 38]],
        ["subject:FLAG", [37 * 0, 38 * 3, 37, 37]],
        ["subject:ROCK", [37 * 0, 37 * 4, 37, 37]],
        ["subject:WALL", [37 * 0, 37.27 * 5, 37, 37]],
        ["noun:BABA", [37 * 1, 38 * 1, 37, 37]],
        ["noun:WALL", [37 * 1, 37 * 5, 37, 37]],
        ["noun:FLAG", [36.5 * 1, 37.5 * 3, 37, 37]],
        ["noun:ROCK", [37 * 1, 37 * 4, 37, 37]],
        ["predicate:YOU", [37 * 2, 38 * 1, 37, 37]],
        ["predicate:STOP", [37 * 2, 37.5 * 5, 37, 36]],
        ["predicate:WIN", [37 * 2, 37 * 3, 37, 37]],
        ["predicate:PUSH", [37 * 2, 37.5 * 4, 37, 37]],
        ["verb:IS", [37 * 1, 37 * 0, 37, 37]],
    ]),
    rules: new Map<string, (ctx: RuleContext) => unknown>([
        ["YOU", You],
        ["STOP", Stop],
        ["WIN", Win],
        ["PUSH", Push],
    ]),
};

export default mappings;
