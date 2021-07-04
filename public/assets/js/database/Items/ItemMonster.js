import Items from '../Items.js';

class ItemMonster extends Items {
    constructor(name, image, description, price, monsters, percent_success) {
        super(name, image, description, price);

        this._monsters = monsters;
        this._percent_success = percent_success;
    }

    get percent_success() {
        return this._percent_success;
    }

    get monsters() {
        return this._monsters;
    }

    set percent_success(value) {
        this._percent_success = value;
    }

    set monsters(value) {
        this._monsters = value;
    }

    reward() {
        let notice;
        if (chance.bool({ likelihood: this.percent_success })) {
            notice = {
                status: true,
                monsterIndex: this.monsters[chance.integer({ min: 0, max: this.monsters.length - 1 })],
            };
        } else {
            notice = {
                status: false,
            };
        }

        return notice;
    }
}

export default ItemMonster;
