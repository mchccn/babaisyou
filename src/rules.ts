import { Entity } from "./classes/base/Entity";
import { Rule } from "./types";

// ! doesnt handle "noun and noun is predicate" or "noun is noun" yet

export default function rules(board: Entity[][]) {
    function rulesFromRow(row: Entity[]) {
        const rules = [] as Rule[];

        const tiles = [...row];

        while (tiles.length) {
            const tile = tiles.shift()!;

            const { type, name } = tile;

            if (type === "noun") {
                if (tiles[0]?.type === "verb" && tiles[1]?.type === "predicate") {
                    tiles.shift()!;

                    const properties = [tiles.shift()!];

                    while ((tiles[0] as typeof tiles[0])?.type === "conjunction" && tiles[1]?.type === "predicate") {
                        tiles.shift();

                        properties.push(tiles.shift()!);
                    }

                    rules.push(
                        ...properties.map((prop) => ({
                            target: name,
                            predicate: prop.name,
                        }))
                    );
                }
            }
        }

        return rules;
    }

    const rules = [] as Rule[];

    for (const row of board) {
        rules.push(...rulesFromRow(row));
    }

    for (let i = 0; i < board[0].length; i++) {
        rules.push(...rulesFromRow(board.map((row) => row[i])));
    }

    return rules.reduce<Rule[]>(
        (filtered, rule) => (filtered.some((r) => r.target === rule.target && r.predicate === rule.predicate) ? filtered : filtered.concat(rule)),
        []
    );
}
