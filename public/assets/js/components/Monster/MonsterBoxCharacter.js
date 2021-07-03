import { config } from '../../config.js';

import { BaseComponent } from '../BaseComponent.js';

class MonsterPanelInfo extends BaseComponent {
    constructor() {
        super();

        this.props = {
            monster_ava: '',
            monster_type: '',
            monster_state: '',
        };
    }

    static get observedAttributes() {
        return ['monster_ava', 'monster_type', 'monster_state'];
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}monster-box-character.css">
            <div class="monster-box-character">
                <img src="${config.img_dir}monsters/${this.props.monster_ava}.png" alt="monster-character" class="monster-${this.props.monster_type}">
            </div>
        `;
    }
}

window.customElements.define('monster-box-character', MonsterPanelInfo);
