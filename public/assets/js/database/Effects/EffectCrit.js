import Effect from '../Effects.js';

class EffectCrit extends Effect {
    constructor(name, percent_active) {
        super(name, percent_active);
    }

    effectively(damage) {
        return damage * 2;
    }
}

export default EffectCrit;
