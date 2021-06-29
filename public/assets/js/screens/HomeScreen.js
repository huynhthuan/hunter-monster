import { AU, config } from '../config.js';

import { BaseComponent } from '../components/BaseComponent.js';

class HomeScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}home.css">
            <div class="screen-wrapper home-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content">
                        <div class="screen-desc">
                            <img src="${config.img_dir}screens/home/welcome.png" alt="welcome">
                        </div>
                        <div class="list-menu">
                            <a href="${config.domain}#!/map" class="btn menu-item">
                                <img src="${config.img_dir}screens/home/adventure.png" alt="adventure">
                            </a>
                            <a href="${config.domain}#!/pvp" class="btn menu-item">
                                <img src="${config.img_dir}screens/home/pvp.png" alt="arena">
                            </a>
                            <a href="${config.domain}#!/boss" class="btn menu-item">
                                <img src="${config.img_dir}screens/home/boss.png" alt="boss">
                            </a>
                            <a href="${config.domain}#!/dungeo" class="btn menu-item">
                                <img src="${config.img_dir}screens/home/dungeo.png" alt="dungeo">
                            </a>
                            <a href="${config.domain}#!/dungeo" class="btn menu-item">
                                <img src="${config.img_dir}screens/home/dungeo.png" alt="dungeo">
                            </a>
                            <a href="${config.domain}#!/dungeo" class="btn menu-item">
                                <img src="${config.img_dir}screens/home/dungeo.png" alt="dungeo">
                            </a>
                            <a href="${config.domain}#!/dungeo" class="btn menu-item">
                                <img src="${config.img_dir}screens/home/dungeo.png" alt="dungeo">
                            </a>
                            <a href="${config.domain}#!/dungeo" class="btn menu-item">
                                <img src="${config.img_dir}screens/home/dungeo.png" alt="dungeo">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('home-screen', HomeScreen);
