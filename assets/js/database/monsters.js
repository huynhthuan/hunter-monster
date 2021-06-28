class Monster {
    constructor(name, description, avatar, exp, level, atk, hp, def, exp_received, type) {
        this._name = name;
        this._description = description;
        this._avatar = avatar;
        this._level = level;
        this._atk = atk;
        this._hp = hp;
        this._def = def;
        this._exp = exp;
        this._exp_received = exp_received;
        this._type = type;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get avatar() {
        return this._avatar;
    }

    get level() {
        return this._level;
    }

    get atk() {
        return this._atk;
    }

    get hp() {
        return this._hp;
    }

    get def() {
        return this._def;
    }

    get exp_received() {
        return this._exp_received;
    }

    get type() {
        return this._type;
    }

    set name(value) {
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    set avatar(value) {
        this._avatar = value;
    }

    set level(value) {
        this._level = value;
    }

    set atk(value) {
        this._atk = value;
    }

    set hp(value) {
        this._hp = value;
    }

    set def(value) {
        this._def = value;
    }

    set exp_received(value) {
        this._exp_received = value;
    }

    set type(value) {
        this._type = value;
    }
}

export { Monster };
