import { config } from '../../config.js';
import monsters from '../../monsterConfig.js';

import { BaseComponent } from '../BaseComponent.js';

class MonsterBoxPopup extends BaseComponent {
    constructor() {
        super();

        this.props = {
            monster_id: '',
        };
    }

    static get observedAttributes() {
        return ['monster_id'];
    }

    render() {
        const monster = monsters[this.props.monster_id];
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}monster-box-popup.css">
            <div class="monster-box-info">
                <div class="monster-box-meta">
                    <div class="monster-box-name">${monster.name}</div>
                    <div class="monster-box-level">Lv. ${monster.level}</div>
                </div>
                <div class="monster-box-ava">
                    <img src="${config.img_dir}monsters/${monster.avatar}.png" alt="monster-ava">
                </div>
                <div class="monster-box-stats">
                    <div class="monster-stat-item">SỨC MẠNH: ${monster.atk}</div>
                    <div class="monster-stat-item">PHÒNG THỦ: ${monster.def}</div>
                    <div class="monster-stat-item">SINH LỰC: ${monster.hp}</div>
                    <div class="monster-stat-item">KINH NGHIỆM: ${monster.exp_received}</div>
                </div>
                <div class="monster-box-description">
                    ${monster.description}
                </div>
            </div>
        `;
    }
}

window.customElements.define('monster-box-popup', MonsterBoxPopup);
