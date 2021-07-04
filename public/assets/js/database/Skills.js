class Skill {
    constructor(name, description, image, skill_dame, skill_effect, level_required) {
        this._name = name;
        this._description = description;
        this._image = image;
        this._skill_dame = skill_dame;
        this._skill_effect = skill_effect;
        this._level = level_required;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get image() {
        return this._image;
    }

    get level_required() {
        return this._level;
    }

    set name(value) {
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    set image(value) {
        this._image = value;
    }

    set level_required(value) {
        this._level = value;
    }

    checkLevelRequired(level) {
        return level >= this._level;
    }

    skillDamage() {
        return;
    }
}

export default Skill;
