import { Entity } from "./classes/Entity";
import mappings from "./mappings";

export function serialize(board: Entity[][]) {
    const out = new Array(board.length).fill(0).map(() => []) as string[][];

    board.forEach((row) => {
        row.forEach((e) => {
            const order = [
                "subject:EMPTY",
                "subject:WALL",
                "subject:ROCK",
                "subject:FLAG",
                "subject:BABA",
                "noun:WALL",
                "noun:ROCK",
                "noun:FLAG",
                "noun:BABA",
                "property:YOU",
                "property:STOP",
                "property:WIN",
                "property:PUSH",
                "verb:IS",
            ];

            if (order.indexOf(e.serialize()) > order.indexOf(out[e.y][e.x])) out[e.y][e.x] = e.serialize();
        });
    });

    return out;
}

export function deserialize(board: string[][]) {
    return board.map((row, y) => row.map((e, x) => new (mappings.classes.get(e)!())(x, y)));
}
