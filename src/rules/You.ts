import levels from "../levels";
import { RuleContext } from "../types";

export default function You({ level, targets, entities, rules, key }: RuleContext) {
    targets.forEach((e) => {
        if (!key) return;

        const dir = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0],
        }[key];

        if (dir) {
            const [dx, dy] = dir;

            e.x += dx;
            e.y += dy;

            if (e.y < 0) e.y -= dy;
            if (e.y > levels[level].level.length - 1) e.y -= dy;
            if (e.x < 0) e.x -= dx;
            if (e.x > levels[level].level[0].length - 1) e.x -= dx;

            const stack = [
                () => {
                    e.x -= dx;
                    e.y -= dy;
                },
            ];

            for (const p of entities) {
                if (p === e) continue;

                if (rules.some(({ target, predicate }) => p.name === target && p.type === "subject" && predicate === "PUSH")) {
                    if (p.x === e.x && p.y === e.y) {
                        // if push was unsuccessful, undo the move
                        You({
                            level,
                            targets: [p],
                            entities: entities.filter((t) => t !== p && t !== e),
                            rules,
                            key,
                        });
                    }
                }
            }
        }
    });
}
