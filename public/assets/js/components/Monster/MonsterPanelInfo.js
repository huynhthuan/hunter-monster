import { config } from '../../config.js';

import { BaseComponent } from '../BaseComponent.js';

class MonsterPanelInfo extends BaseComponent {
    constructor() {
        super();

        this.props = {
            monster_name: '',
            monster_level: '',
            monster_hp: '',
            monster_baseHp: '',
            monster_type: '',
        };
    }

    static get observedAttributes() {
        return ['monster_name', 'moster_level', 'monster_hp', 'monster_baseHp', 'monster_type'];
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}monster-panel-info.css">
            <div class="monster-panel-info">
                <img src="${config.img_dir}screens/maps/monste-panel-${this.props.monster_type}.png" alt="monster-panel-bg">
                <div class="monster-panel-meta">
                    <div class="monster-level">Lv.11</div>
                    <div class="monster-name">VULFROST</div>
                    <div class="monster-hp">
                        <img src="${config.img_dir}screens/maps/monster-hp-bg.png" class="monster-hp-bg">
                        <img src="${config.img_dir}screens/maps/monster-hp-main.png"  style="width: 60%" class="monster-hp-main">
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('monster-panel-info', MonsterPanelInfo);
