import { config } from '../../config.js';

import { BaseComponent } from '../BaseComponent.js';

class MonsterPanelInfo extends BaseComponent {
    constructor() {
        super();

        this.props = {
            monster_name: '',
            monster_level: '',
            monster_hp: '',
            monster_maxhp: '',
            monster_type: '',
        };
    }

    static get observedAttributes() {
        return ['monster_name', 'monster_level', 'monster_hp', 'monster_maxhp', 'monster_type'];
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}monster-panel-info.css">
            <div class="monster-panel-info">
                <div class="monster-panel-img">
                    <img src="" alt="monster-panel-bg">
                </div>
                <div class="monster-panel-meta">
                    <div class="monster-level">Lv.${this.props.monster_level}</div>
                    <div class="monster-name">${this.props.monster_name}</div>
                    <div class="monster-hp">
                        <img src="${config.img_dir}screens/maps/monster-hp-bg.png" class="monster-hp-bg">
                        <img src="${config.img_dir}screens/maps/monster-hp-main.png"  style="width: ${
            (Number(this.props.monster_hp) / Number(this.props.monster_maxhp)) * 100
        }%" class="monster-hp-main">
                    </div>
                </div>
            </div>
        `;
        if (this.props.monster_type) {
            this._shadowRoot.querySelector('.monster-panel-img img').src = `${config.img_dir}screens/maps/monste-panel-${this.props.monster_type}.png`;
        }
    }
}

window.customElements.define('monster-panel-info', MonsterPanelInfo);
