import { Entity } from "./classes/Entity";

export default function rules(board: Entity[][]) {
    function rulesFromRow(row: Entity[]) {
        const rules = [] as { target: string; property: string }[];

        const tiles = [...row];

        while (tiles.length) {
            const tile = tiles.shift()!;

            const { type, name } = tile;

            if (type === "noun") {
                if (tiles[0]?.type === "verb" && tiles[1]?.type === "property") {
                    tiles.shift()!;

                    const properties = [tiles.shift()!];

                    while ((tiles[0] as typeof tiles[0])?.type === "conjunction" && tiles[1]?.type === "property") {
                        tiles.shift();

                        properties.push(tiles.shift()!);
                    }

                    rules.push(
                        ...properties.map((prop) => ({
                            target: name,
                            property: prop.name,
                        }))
                    );
                }
            }
        }

        return rules;
    }

    const rules = [] as { target: string; property: string }[];

    for (const row of board) {
        rules.push(...rulesFromRow(row));
    }

    for (let i = 0; i < board[0].length; i++) {
        rules.push(...rulesFromRow(board.map((row) => row[i])));
    }

    return rules.reduce(
        (filtered, rule) => (filtered.some((r) => r.target === rule.target && r.property === rule.property) ? filtered : filtered.concat(rule)),
        [] as typeof rules
    );
}
