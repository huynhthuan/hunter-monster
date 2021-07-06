import { Monster } from '../Monsters.js';

class MonsterNormal extends Monster {
    constructor(name, description, image, exp, level, type, atk, hp, def, skills, tier, is_battle) {
        super(name, description, image, exp, level, type, atk, hp, def, skills, tier);

        this._is_battle = is_battle;
    }

    get is_battle() {
        return this._is_battle;
    }

    set is_battle(value) {
        this._is_battle = value;
    }
}

export { MonsterNormal };
