import { Baba } from "./classes/Baba";
import { BabaNoun } from "./classes/BabaNoun";
import { Empty } from "./classes/Empty";
import { Entity } from "./classes/Entity";
import { Flag } from "./classes/Flag";
import { FlagNoun } from "./classes/FlagNoun";
import { IsVerb } from "./classes/IsVerb";
import { PushProperty } from "./classes/PushProperty";
import { Rock } from "./classes/Rock";
import { RockNoun } from "./classes/RockNoun";
import { StopProperty } from "./classes/StopProperty";
import { Wall } from "./classes/Wall";
import { WallNoun } from "./classes/WallNoun";
import { WinProperty } from "./classes/WinProperty";
import { YouProperty } from "./classes/YouProperty";
import levels from "./levels";

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
        ["property:YOU", () => YouProperty],
        ["property:STOP", () => StopProperty],
        ["property:WIN", () => WinProperty],
        ["property:PUSH", () => PushProperty],
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
        ["property:YOU", [37 * 2, 38 * 1, 37, 37]],
        ["property:STOP", [37 * 2, 37.5 * 5, 37, 36]],
        ["property:WIN", [37 * 2, 37 * 3, 37, 37]],
        ["property:PUSH", [37 * 2, 37.5 * 4, 37, 37]],
        ["verb:IS", [37 * 1, 37 * 0, 37, 37]],
    ]),
    rules: new Map<string, (level: number, entities: Entity[], key?: string) => unknown>([
        [
            "YOU",
            (level, entities, key) => {
                entities.forEach((e) => {
                    if (key === "ArrowUp") e.y--;
                    if (key === "ArrowDown") e.y++;
                    if (key === "ArrowLeft") e.x--;
                    if (key === "ArrowRight") e.x++;

                    if (e.y < 0) e.y++;
                    if (e.y > levels[level].level.length) e.y--;
                    if (e.x < 0) e.x++;
                    if (e.x > levels[level].level[0].length) e.x--;
                });
            },
        ],
        ["STOP", () => {}],
        ["WIN", () => {}],
        ["PUSH", () => {}],
    ]),
};

export default mappings;
