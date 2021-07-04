import { config } from '../../config.js';
import { monstersMap } from '../../monsterConfig.js';
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
        const monster = monstersMap[this.props.monster_id];
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
                    <div class="monster-stat-item"><span class="label">SỨC MẠNH:</span> <span class="value">${monster.atk}</span></div>
                    <div class="monster-stat-item"><span class="label">PHÒNG THỦ:</span> <span class="value">${monster.def}</span></div>
                    <div class="monster-stat-item"><span class="label">SINH LỰC:</span> <span class="value">${monster.hp}</span></div>
                    <div class="monster-stat-item"><span class="label">KINH NGHIỆM NHẬN:</span> <span class="value">+  ${monster.experience_received} Exp</span></div>
                    <div class="monster-stat-item"><span class="label">VÀNG NHẬN:</span> <span class="value">+  ${monster.gold_received} coin</span></div>
                </div>
                <div class="monster-box-description">
                    ${monster.description}
                </div>
            </div>
        `;
    }
}

window.customElements.define('monster-box-popup', MonsterBoxPopup);
