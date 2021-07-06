import { BaseComponent } from '../../components/BaseComponent.js';

import { config } from '../../config.js';
import MapsData from '../../mapConfig.js';

import MonstersMap from '../../monsterMapConfig.js';

class MapDetailScreen extends BaseComponent {
    constructor() {
        super();

        this.props = {
            map_id: '',
        };
    }

    static get observedAttributes() {
        return ['map_id'];
    }

    render() {
        let mapData = MapsData[this.props.map_id];
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}map-detail.css">
            <div class="screen-wrapper map-detail-wrapper screen-wrapper-bar" style="background-image: url(${config.img_dir}backgrounds/maps/${mapData.background}.png)">
                <div class="screen-main">
                    <div class="screen-content">
                        <div class="map-description-wrap">
                            <div class="map-description">
                                ${mapData.description}
                            </div>
                        </div>
                        <div class="map-monsters-panel">
                            <div class="map-monsters">
                                
                            </div>
                        </div>
                        <div class="map-control">
                            <a href="${config.domain}#!/map" class="btn">
                                <img src="${config.img_dir}screens/maps/back.png" alt="map-control-back">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render monster of map
        const mapMonsterWrapper = this._shadowRoot.querySelector('.map-monsters');
        mapData.monsters.forEach((monsterIndex) => {
            const monstersData = MonstersMap[monsterIndex];
            mapMonsterWrapper.insertAdjacentHTML(
                'beforeend',
                `
                <div class="monster-item">
                    <div class="monster-ava">
                        <img src="${config.img_dir}monsters/${monstersData.image}.png" alt="monster-ava">
                    </div>
                    <div class="monster-meta">
                        <div class="monster-info">
                            <div class="monster-name">
                                ${monstersData.name}
                            </div>
                            <div class="monster-level">
                                Lv. ${monstersData.level}
                            </div>
                        </div>
                        <div class="monster-action">
                            <a href="${config.domain}#!/map/${this.props.map_id}/fight/${monsterIndex}" class="btn">
                                <img src="${config.img_dir}screens/maps/icon-atk.png" alt="icon-atk">
                            </a>
                            <button class="monster-desc-btn" id="btn-desc-${monsterIndex}">
                                <img src="${config.img_dir}screens/maps/icon-desc.png" alt="icon-desc">
                            </button>
                        </div>
                    </div>
                </div>
            `
            );
            let descBtns = this._shadowRoot.querySelector(`#btn-desc-${monsterIndex}`);
            descBtns.onclick = () => {
                Swal.fire({
                    html: `<monster-box-popup monster_id="${monsterIndex}"></monster-box-popup>`,
                    confirmButtonText: '',
                    backdrop: false,
                    target: document.querySelector('#app'),
                    buttonsStyling: false,
                    width: '374px',
                });
            };
        });
    }
}

window.customElements.define('map-detail-screen', MapDetailScreen);
