import levels from "./levels";

(async () => {
    try {
        const canvas = document.querySelector("canvas")!;
        const ctx = canvas.getContext("2d")!;

        canvas.width = 800;
        canvas.height = 450;

        const spritesheet = new Image(410, 410);

        spritesheet.src = "./spritesheet.png";

        await new Promise((resolve) => (spritesheet.onload = resolve));

        class Entity {
            constructor(type, name, x, y, spriteX, spriteY, spriteW, spriteH) {
                this.type = type;
                this.name = name;
                this.x = x;
                this.y = y;
                this.sprite = {
                    x: spriteX,
                    y: spriteY,
                    w: spriteW,
                    h: spriteH,
                };
            }

            serialize() {
                return `${this.type}:${this.name}`;
            }
        }

        class Empty extends Entity {
            constructor(x, y) {
                super("subject", "EMPTY", x, y, ...mappings.sprites.get("subject:EMPTY"));
            }
        }

        class Baba extends Entity {
            constructor(x, y) {
                super("subject", "BABA", x, y, ...mappings.sprites.get("subject:BABA"));
            }
        }

        class Flag extends Entity {
            constructor(x, y) {
                super("subject", "FLAG", x, y, ...mappings.sprites.get("subject:FLAG"));
            }
        }

        class Rock extends Entity {
            constructor(x, y) {
                super("subject", "ROCK", x, y, ...mappings.sprites.get("subject:ROCK"));
            }
        }

        class Wall extends Entity {
            constructor(x, y) {
                super("subject", "WALL", x, y, ...mappings.sprites.get("subject:WALL"));
            }
        }

        class IntrinsicPushable extends Entity {}

        class BabaNoun extends IntrinsicPushable {
            constructor(x, y) {
                super("noun", "BABA", x, y, ...mappings.sprites.get("noun:BABA"));
            }
        }

        class WallNoun extends IntrinsicPushable {
            constructor(x, y) {
                super("noun", "WALL", x, y, ...mappings.sprites.get("noun:WALL"));
            }
        }

        class FlagNoun extends IntrinsicPushable {
            constructor(x, y) {
                super("noun", "FLAG", x, y, ...mappings.sprites.get("noun:FLAG"));
            }
        }

        class RockNoun extends IntrinsicPushable {
            constructor(x, y) {
                super("noun", "ROCK", x, y, ...mappings.sprites.get("noun:ROCK"));
            }
        }

        class YouProperty extends IntrinsicPushable {
            constructor(x, y) {
                super("property", "YOU", x, y, ...mappings.sprites.get("property:YOU"));
            }
        }

        class StopProperty extends IntrinsicPushable {
            constructor(x, y) {
                super("property", "STOP", x, y, ...mappings.sprites.get("property:STOP"));
            }
        }

        class WinProperty extends IntrinsicPushable {
            constructor(x, y) {
                super("property", "WIN", x, y, ...mappings.sprites.get("property:WIN"));
            }
        }

        class PushProperty extends IntrinsicPushable {
            constructor(x, y) {
                super("property", "PUSH", x, y, ...mappings.sprites.get("property:PUSH"));
            }
        }

        class IsVerb extends IntrinsicPushable {
            constructor(x, y) {
                super("verb", "IS", x, y, ...mappings.sprites.get("verb:IS"));
            }
        }

        const mappings = {
            classes: new Map([
                ["subject:EMPTY", Empty],
                ["subject:BABA", Baba],
                ["subject:FLAG", Flag],
                ["subject:ROCK", Rock],
                ["subject:WALL", Wall],
                ["noun:BABA", BabaNoun],
                ["noun:WALL", WallNoun],
                ["noun:FLAG", FlagNoun],
                ["noun:ROCK", RockNoun],
                ["property:YOU", YouProperty],
                ["property:STOP", StopProperty],
                ["property:WIN", WinProperty],
                ["property:PUSH", PushProperty],
                ["verb:IS", IsVerb],
            ]),
            sprites: new Map([
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
            rules: new Map([
                [
                    "YOU",
                    (entities, key) => {
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

            rules(entities).forEach((rule) =>
                mappings.rules.get(rule.property)(
                    entities.flat().filter((e) => e.type === "subject" && e.name === rule.target),
                    keys.shift()
                )
            );

            draw(board);

            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);

        document.addEventListener("keydown", (e) => {
            keys.push(e.code);
        });

        function rules(board) {
            function rulesFromRow(row) {
                const rules = [];

                const tiles = [...row];

                while (tiles.length) {
                    const tile = tiles.shift();

                    const { type, name } = tile;

                    if (type === "noun") {
                        if (tiles[0]?.type === "verb" && tiles[1]?.type === "property") {
                            tiles.shift();

                            const properties = [tiles.shift()];

                            while (tiles[0]?.type === "conjunction" && tiles[1]?.type === "property") {
                                tiles.shift();

                                properties.push(tiles.shift());
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

            const rules = [];

            for (const row of board) {
                rules.push(...rulesFromRow(row));
            }

            for (let i = 0; i < board[0].length; i++) {
                rules.push(...rulesFromRow(board.map((row) => row[i])));
            }

            return rules.reduce(
                (filtered, rule) => (filtered.some((r) => r.target === rule.target && r.property === rule.property) ? filtered : filtered.concat(rule)),
                []
            );
        }

        function serialize(board) {
            const out = new Array(board.length).fill(0).map(() => []);

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

                    if (order.indexOf(e.serialize()) > order.indexOf(out[e.y][e.x])) out[e.y][e.x] = e.serialize(); // change to array for layers :/
                });
            });

            return out;
        }

        function deserialize(board) {
            return board.map((row, y) => row.map((e, x) => new (mappings.classes.get(e))(x, y)));
        }

        function draw(board) {
            board.forEach((row, y) => {
                row.forEach((tile, x) => {
                    if (!mappings.sprites.get(tile)) throw new ReferenceError(`Unmapped tile '${tile}'.`);

                    ctx.drawImage(
                        spritesheet,
                        ...[
                            ...mappings.sprites.get(tile),
                            x * 50 + (canvas.width / 2 - (board[0].length * 50) / 2),
                            y * 50 + (canvas.height / 2 - (board.length * 50) / 2),
                            50,
                            50,
                        ]
                    );
                });
            });
        }

        // document.addEventListener(
        //     "click",
        //     () => {
        //         const theme = new Audio("./theme.mp3");

        //         theme.loop = true;

        //         theme.volume = 1;

        //         theme.play();
        //     },
        //     { once: true }
        // );
    } catch (error) {
        alert(error);
    }
})();
