class Effect {
    constructor(name, percent_active) {
        this._name = name;
        this.percent_active = percent_active;
    }

    get name() {
        return this._name;
    }

    get percent_active() {
        return this._percent_active;
    }

    set name(name) {
        this._name = name;
    }

    set percent_active(percent_active) {
        this._percent_active = percent_active;
    }

    is_active() {
        return chance.bool({ likelihood: this._percent_active });
    }

    effectively() {}
}

export default Effect;
