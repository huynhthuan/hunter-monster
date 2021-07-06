import Tier from './Tier.js';
import SkillsMonster from '../skillsConfig.js';
import Skill from '../database/Skills.js';

class Monster {
    constructor(name, description, image, exp, level, type, atk, hp, def, skills, tier) {
        this._name = name;
        this._description = description;
        this._image = image;
        this._exp = exp;
        this._atk = atk;
        this._hp = hp;
        this._maxhp = hp;
        this._def = def;
        this._exp = exp;
        this._level = level;
        this._type = type;
        this._skills = skills;
        this._tier = tier;
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

    get exp() {
        return this._exp;
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

    get maxhp() {
        return this._maxhp;
    }

    get def() {
        return this._def;
    }

    get type() {
        return this._type;
    }

    get skills() {
        return this._skills;
    }

    get tier() {
        return Tier[this._tier];
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

    set exp(value) {
        this._exp = value;
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

    set type(value) {
        this._type = value;
    }

    set skills(value) {
        this._skills = value;
    }

    set tier(value) {
        this._tier = value;
    }

    getExpNextLevel() {
        return this.getExpOfLevel(this.level + 1);
    }

    getExpOfLevel(level) {
        return Math.round(Math.pow(level / 0.3, 2));
    }

    getMaxLevel() {
        return Tier[this._tier].maxlevel;
    }

    getMaxStatValue(stat) {
        return this.getMaxLevel() * Tier[this._tier].statPerLevel + stat;
    }

    getSkillActive() {
        let skillEnemyTemplate = this._skills.map((skill) => {
            return SkillsMonster[skill];
        });

        let skillEnemyData = skillEnemyTemplate.map((skill) => {
            return new Skill(skill.name, skill.description, skill.image, skill.skill_damage, skill.skill_effect, skill.level_required);
        });

        let skillEnemyActive = skillEnemyData.filter((skill) => {
            return skill.checkLevelRequired(this._level);
        });

        return skillEnemyActive;
    }
}

export { Monster };
