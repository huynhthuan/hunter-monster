import { AU, config, FS } from '../../config.js';
import { monstersNormal } from '../../monsterConfig.js';
import { getUid } from '../../ultils/ultils.js';
import { BaseComponent } from '../../components/BaseComponent.js';

class MonsterBookScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}monster-book.css">
            <div class="screen-wrapper monster-book-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content">
                        <div class="monster-infor-box">
                            <div class="monster-infor-desc-box">
                                <div class="monster-name">VULFROST</div>
                                <div class="monster-level">Lv.11</div>
                                <img src="" class="monster-tier">
                            </div>
                            <div class="monster-avatar">
                                <img src="${config.img_dir}monsters/monster-loading.png" alt="monster">
                            </div>
                            <a href="#" class="btn btn-detail-monster">
                                <img src="${config.img_dir}screens/monster-book/btn-detail-monster-book.png" alt="btn-detail-monster">
                            </a>
                        </div>
                         <div class="monster-book-wrap">
                            <div class="monster-book-list">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const listMonster_el = this._shadowRoot.querySelector('.monster-book-list');
        const monsterDetail_el = this._shadowRoot.querySelector('.monster-infor-box');
        this.renderYourMonster(listMonster_el, monsterDetail_el);
    }

    async renderYourMonster(container_el, detail_el) {
        let listMonsters = await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').get();
        listMonsters.forEach((monster) => {
            let monsterData = monstersNormal[monster.data().monster_index];
            monsterData.atk = monster.data().atk;
            monsterData.def = monster.data().def;
            monsterData.hp = monster.data().hp;
            monsterData.exp = monster.data().exp;
            monsterData.level = monster.data().level;
            monsterData.is_battle = monster.data().is_battle;

            container_el.insertAdjacentHTML(
                'beforeend',
                `
                <div class="monsters-item" id="monster-${monster.id}">
                    <div class="monster-ava">
                        <img src="${config.img_dir}monsters/${monsterData.avatar}.png" alt="monster">
                    </div>
                    <div class="monster-meta">
                        <div class="monster-name">${monsterData.name}</div>
                        <div class="monster-level">Lv.${monsterData.level}</div>
                    </div>
                </div>
            `
            );

            let monsterItem_el = container_el.querySelector('#monster-' + monster.id);

            monsterItem_el.onclick = () => {
                this.renderDetailMonster(monsterData.name, monsterData.level, monsterData.avatar, monster.data().monster_index, monsterData.tier.image, detail_el);
            };
        });

        this._shadowRoot.querySelector('.monsters-item').click();
    }

    renderDetailMonster(name, level, avatar, index, tier_image, container_el) {
        container_el.querySelector('.monster-name').innerHTML = name;
        container_el.querySelector('.monster-level').innerHTML = `Lv.${level}`;
        container_el.querySelector('.monster-avatar img').src = `${config.img_dir}monsters/${avatar}.png`;
        container_el.querySelector('.btn-detail-monster').href = `${config.domain}#!/monster-book/${index}`;
        container_el.querySelector('.monster-tier').src = `${config.img_dir}tiers/${tier_image}.png`;
    }
}

window.customElements.define('monster-book-screen', MonsterBookScreen);
