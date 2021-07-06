import { BaseComponent } from '../components/BaseComponent.js';
import { FS, config } from '../config.js';
import { setMonsterBattle, getUid } from '../ultils/ultils.js';

class HomeScreen extends BaseComponent {
    constructor() {
        super();
    }

    async render() {
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
                            <a href="${config.domain}#!/boss" class="btn menu-item" style="display: none;">
                                <img src="${config.img_dir}screens/home/boss.png" alt="boss">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        if (!localStorage.getItem('monsterBattle')) {
            let responseAll = await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').get();
            let countMonsterBatle = 0;
            responseAll.forEach(async (response) => {
                response.data().is_battle ? countMonsterBatle++ : '';
            });

            setMonsterBattle(countMonsterBatle);
        }
    }
}

window.customElements.define('home-screen', HomeScreen);
