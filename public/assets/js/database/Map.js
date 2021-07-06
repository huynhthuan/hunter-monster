class Map {
    constructor(name, description, thumbnail, background, monsters) {
        this._name = name;
        this._description = description;
        this._thumbnail = thumbnail;
        this._background = background;
        this._monsters = monsters;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get thumbnail() {
        return this._thumbnail;
    }

    get background() {
        return this._background;
    }

    get monsters() {
        return this._monsters;
    }

    set name(value) {
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    set thumbnail(value) {
        this._thumbnail = value;
    }

    set background(value) {
        this._background = value;
    }

    set monsters(value) {
        this.monsters = value;
    }
}

export { Map };
