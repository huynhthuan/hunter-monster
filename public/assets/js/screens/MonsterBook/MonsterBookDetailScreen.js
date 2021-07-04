import { config, FS } from '../../config.js';
import { getUid, ShowNotice } from '../../ultils/ultils.js';
import { BaseComponent } from '../../components/BaseComponent.js';
import { monstersNormal } from '../../monsterConfig.js';

// import { EffectCrit } from './database/Effects/EffectCrit.js';

// const SkillEffects = [new Effect('Chí mạng', 'Có cơ hội gây ra 200% sát thương của kĩ năng', 10)];

class MonsterBookDetailScreen extends BaseComponent {
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
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}monster-book.css">
            <link rel="stylesheet" href="${config.style_dir}monster-book-detail.css">
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
                                <img src="${config.img_dir}monsters/monster-3.png" alt="monster">
                            </div>
                            <button class="btn-battle-monster">
                                <img src="${config.img_dir}screens/monster-book/btn-battle.png" alt="btn-detail-monster">
                            </button>
                            <a href="${config.domain}#!/monster-book" class="btn btn-back">
                                <img src="${config.img_dir}screens/monster-book/btn-back.png" alt="btn-back">
                            </a>
                        </div>
                         <div class="monster-book-wrap">
                            <div class="monster-hold-info">
                                <div class="monster-hold-desc">
                                   Mattis. Nonummy, nonummy? Ratione! Curabitur. Iaculis voluptatibus, animi laudantium platea a ipsa, magna expedita 
                                </div>
                                <div class="monster-stat">
                                    <div class="stat-item stat-atk">
                                        <div class="stat-label ">
                                            SỨC MẠNH
                                        </div>
                                        <div class="stat-bar">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal.png" class="stat-bar-bg">
                                            <div class="stat-bar-main"></div>
                                        </div>
                                    </div>
                                    <div class="stat-item stat-def">
                                        <div class="stat-label">
                                            PHÒNG THỦ
                                        </div>
                                        <div class="stat-bar">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal.png" class="stat-bar-bg">
                                            <div class="stat-bar-main"></div>
                                        </div>
                                    </div>
                                    <div class="stat-item stat-hp">
                                        <div class="stat-label">
                                            SINH LỰC
                                        </div>
                                        <div class="stat-bar">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal.png" class="stat-bar-bg">
                                            <div class="stat-bar-main"></div>
                                        </div>
                                    </div>
                                    <div class="stat-item stat-exp">
                                        <div class="stat-label">
                                            KINH NGHIỆM
                                        </div>
                                        <div class="stat-bar">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal.png" class="stat-bar-bg">
                                            <div class="stat-bar-main"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="monster-skill">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const monsterDetail_el = this._shadowRoot.querySelector('.monster-infor-box');
        const monsterDetailInfo_el = this._shadowRoot.querySelector('.monster-hold-info');
        const skillContainer = this._shadowRoot.querySelector('.monster-skill');
        this.renderYourMonster(monsterDetail_el, monsterDetailInfo_el, skillContainer);
    }

    async renderYourMonster(detail_el, info_el, skill_el) {
        let monsters = await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').where('monster_index', '==', Number(this.props.monster_id)).get();

        monsters.forEach((monster) => {
            let monsterData = monstersNormal[this.props.monster_id];
            monsterData.atk = monster.data().atk;
            monsterData.def = monster.data().def;
            monsterData.hp = monster.data().hp;
            monsterData.exp = monster.data().exp;
            monsterData.level = monster.data().level;
            monsterData.is_battle = monster.data().is_battle;

            detail_el.querySelector('.monster-name').innerHTML = monsterData.name;
            detail_el.querySelector('.monster-level').innerHTML = `Lv.${monsterData.level}`;
            detail_el.querySelector('.monster-tier').src = `${config.img_dir}tiers/${monsterData.tier.image}.png`;
            detail_el.querySelector('.monster-avatar img').src = `${config.img_dir}monsters/${monsterData.avatar}.png`;

            info_el.querySelector('.monster-hold-desc').innerText = monsterData.description;
            info_el.querySelector('.stat-atk .stat-bar-main').style.width = (monsterData.atk / monsterData.getMaxStatValue(monsterData.atk)) * 100 + '%';
            info_el.querySelector('.stat-hp .stat-bar-main').style.width = (monsterData.hp / monsterData.getMaxStatValue(monsterData.hp)) * 100 + '%';
            info_el.querySelector('.stat-def .stat-bar-main').style.width = (monsterData.def / monsterData.getMaxStatValue(monsterData.def)) * 100 + '%';
            info_el.querySelector('.stat-exp .stat-bar-main').style.width = (monsterData.exp / monsterData.getExpOfLevel(monsterData.level + 1)) * 100 + '%';

            monsterData.skills.forEach((skill, index) => {
                skill_el.insertAdjacentHTML(
                    'beforeend',
                    `
                    <div class="skill-item" id="skill-${index}">
                        <img src="${config.img_dir}skills/${skill.image}.png" class="skill-img">
                        ${
                            index > 0
                                ? `<img src="${config.img_dir}screens/monster-book/lock-skill-${skill.level_required}.png" class="skill-lock ${
                                      skill.checkLevelRequired(monsterData.level) ? '' : 'active'
                                  }">`
                                : ''
                        }
                        
                    </div>
                `
                );

                skill_el.querySelector('#skill-' + index).onclick = () => {
                    ShowNotice(skill.name, skill.description);
                };
            });
        });

        FS.collection('monster-templates')
            .doc(getUid())
            .collection('list-monsters')
            .where('monster_index', '==', Number(this.props.monster_id))
            .onSnapshot((doc) => {
                detail_el.querySelector('.btn-battle-monster img').src = doc.docs[0].data().is_battle
                    ? `${config.img_dir}screens/monster-book/btn-res.png`
                    : `${config.img_dir}screens/monster-book/btn-battle.png`;
            });
        const btnChangeStateMonster = detail_el.querySelector('.btn-battle-monster');

        btnChangeStateMonster.onclick = async () => {
            //Update all monster to false in battle
            let responseAll = await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').where('monster_index', '!=', Number(this.props.monster_id)).get();

            responseAll.forEach(async (response) => {
                if (response.data().is_battle) {
                    await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').doc(response.id).update({
                        is_battle: false,
                    });
                }
            });

            //Update monster
            let responses = await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').where('monster_index', '==', Number(this.props.monster_id)).get();

            responses.forEach(async (response) => {
                await FS.collection('monster-templates')
                    .doc(getUid())
                    .collection('list-monsters')
                    .doc(response.id)
                    .update({
                        is_battle: response.data().is_battle ? false : true,
                    });
            });
        };
    }
}

window.customElements.define('monster-book-detail-screen', MonsterBookDetailScreen);
