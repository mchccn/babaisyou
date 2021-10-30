import levels from "./levels";
import mappings from "./mappings";
import rules from "./rules";
import { deserialize, serialize } from "./serialization";

(async () => {
    try {
        const canvas = document.querySelector("canvas")!;
        const ctx = canvas.getContext("2d")!;

        canvas.width = 800;
        canvas.height = 450;

        const spritesheet = new Image(410, 410);

        spritesheet.src = "../assets/spritesheet.png";

        spritesheet.onerror = console.error;

        await new Promise((resolve) => (spritesheet.onload = resolve));

        let level = 0;

        let entities = deserialize(levels[level].level);

        const keys = [""];

        let dt = 0;
        let lt = 0;

        function loop(ms: number) {
            const time = ms / 1000;

            dt = lt - time;
            lt = time;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const board = serialize(entities);

            const inplay = rules(entities);

            inplay.forEach((rule) =>
                mappings.rules.get(rule.predicate)!({
                    level: level,
                    entities: entities.flat(),
                    targets: entities.flat().filter((e) => e.type === "subject" && e.name === rule.target),
                    rules: inplay,
                    key: keys.shift(),
                })
            );

            draw(board);

            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);

        document.addEventListener("keydown", (e) => {
            keys.push(e.code);
        });

        function draw(board: string[][]) {
            board.forEach((row, y) => {
                row.forEach((tile, x) => {
                    if (!mappings.sprites.get(tile)) throw new ReferenceError(`Unmapped tile '${tile}'.`);

                    ctx.drawImage(
                        spritesheet,
                        ...([
                            ...mappings.sprites.get(tile)!,
                            x * 50 + (canvas.width / 2 - (board[0].length * 50) / 2),
                            y * 50 + (canvas.height / 2 - (board.length * 50) / 2),
                            50,
                            50,
                        ] as [number, number, number, number, number, number, number, number])
                    );
                });
            });
        }

        // ! make game menu
        // document.addEventListener(
        //     "click",
        //     () => {
        //         const theme = new Audio("../assets/theme.mp3");

        //         theme.loop = true;

        //         theme.volume = 1;

        //         theme.play();
        //     },
        //     { once: true }
        // );
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
