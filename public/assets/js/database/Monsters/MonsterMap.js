import { Monster } from '../Monsters.js';

class MonsterMap extends Monster {
    constructor(name, description, avatar, exp, level, type, atk, hp, def, skills, tier, experience_received, gold_received) {
        super(name, description, avatar, exp, level, type, atk, hp, def, skills, tier);

        this._experience_received = experience_received;
        this._gold_received = gold_received;
    }

    get experience_received() {
        return this._experience_received;
    }

    get gold_received() {
        return this._gold_received;
    }

    set experience_received(value) {
        this._experience_received = value;
    }

    set gold_received(value) {
        this._gold_received = value;
    }
}

export { MonsterMap };
