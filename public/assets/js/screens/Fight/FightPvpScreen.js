import { config } from '../../config.js';
import { ShowNoticeFight } from '../../ultils/ultils.js';
import maps from '../../mapConfig.js';
// import { monstersMap } from '../../monsterConfig.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class PvpFightScreen extends BaseComponent {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['map_id', 'map_monster'];
    }

    async render() {
        let mapData = await maps[this.props.map_id];
        let enemyData = await monstersMap[this.props.map_monster];
        let allyMonster = monstersMap[0];

        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}map-fight.css">
            <div class="screen-wrapper map-fight-wrapper " style="background-image: url(${config.img_dir}backgrounds/maps/${mapData.background}.png)">
                <a href="${config.domain}#!/map/${this.props.map_id}" class="btn-out-fight btn">
                    <img src="${config.img_dir}screens/maps/btn-out-fight.png" alt="out-fight">
                </a>

                <monster-panel-info class="monster-panel moster-panel-enemy" monster_type="fire"></monster-panel-info>
                <monster-panel-info class="monster-panel moster-panel-self"  monster_type="water"></monster-panel-info>

                <monster-box-character monster_ava="${enemyData.avatar}" monster_type="enemy"></monster-box-character>
                <monster-box-character monster_ava="${allyMonster.avatar}" monster_type="ally"></monster-box-character>

                <div class="skill-bar">
                   <button class="skill-item">
                        <img src="${config.img_dir}skills/skill-4.png" alt="skill">
                    </button>
                    <button class="skill-item">
                        <img src="${config.img_dir}skills/skill-1.png" alt="skill">
                    </button>
                    <button class="skill-item">
                        <img src="${config.img_dir}skills/skill-3.png" alt="skill">
                    </button>
                    <button class="skill-item">
                        <img src="${config.img_dir}skills/skill-2.png" alt="skill">
                    </button>
                </div>
            </div>
        `;

        // ShowNoticeFight('CHIẾN THẮNG', '<div class="fight-notice normal-win"><span>Vàng + 50</span><span>Exp + 100</span></div>', '#!/map/' + this.props.map_id);
        // ShowNoticeFight('THẤT BẠI', 'Bạn đã thua !', '#!/map/' + this.props.map_id);
    }
}

window.customElements.define('pvp-fight-screen', PvpFightScreen);
