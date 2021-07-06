import { BaseComponent } from '../../components/BaseComponent.js';

import { config } from '../../config.js';
import { Map } from '../../database/Map.js';
import MapsData from '../../mapConfig.js';

class MapScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}map.css">
            <div class="screen-wrapper map-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content">
                        <div class="map-list"></div> 
                    </div>
                </div>
            </div>
        `;

        const mapWrapper = this._shadowRoot.querySelector('.map-list');

        MapsData.forEach((map, index) => {
            let mapData = new Map(map.name, map.description, map.thumbnail, map.background, map.monsters);
            mapWrapper.innerHTML += `
                <a href="${config.domain}#!/map/${index}" class="map-item btn">
                    <img class="map-thumbnail" src="${config.img_dir}screens/maps/${mapData.thumbnail}.png">
                    <div class="map-title">${mapData.name}</div>
                </a>
            `;
        });
    }
}

window.customElements.define('map-screen', MapScreen);
