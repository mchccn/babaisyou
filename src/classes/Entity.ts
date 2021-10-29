export class Entity {
    sprite: { x: number; y: number; w: number; h: number };
    constructor(
        public readonly type: string,
        public readonly name: string,
        public x: number,
        public y: number,
        spriteX: number,
        spriteY: number,
        spriteW: number,
        spriteH: number
    ) {
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
