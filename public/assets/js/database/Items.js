class Items {
    constructor(name, image, description, price) {
        this._name = name;
        this._image = image;
        this._description = description;
        this._price = price;
    }

    get name() {
        return this._name;
    }

    get image() {
        return this._image;
    }

    get description() {
        return this._description;
    }

    get price() {
        return this._price;
    }

    set name(value) {
        this._name = value;
    }

    set image(value) {
        this._image = value;
    }

    set description(value) {
        this._description = value;
    }

    set price(value) {
        this._price = value;
    }

    canBuy(coin_character) {
        return coin_character >= this._price;
    }
}

export default Items;
