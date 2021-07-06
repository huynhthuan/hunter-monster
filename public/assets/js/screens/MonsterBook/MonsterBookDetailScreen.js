import { BaseComponent } from '../../components/BaseComponent.js';

import { config, FS } from '../../config.js';
import { getUid, ShowNotice, setMonsterBattle } from '../../ultils/ultils.js';
import MonstersNormal from '../../monsterNormalConfig.js';
import { MonsterNormal } from '../../database/Monsters/MonsterNormal.js';
import SkillsMonster from '../../skillsConfig.js';
import Skill from '../../database/Skills.js';

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
            let monsterData = MonstersNormal[this.props.monster_id];
            monsterData.atk = monster.data().atk;
            monsterData.def = monster.data().def;
            monsterData.hp = monster.data().hp;
            monsterData.exp = monster.data().exp;
            monsterData.level = monster.data().level;
            monsterData.is_battle = monster.data().is_battle;

            let monsterDetailData = new MonsterNormal(
                monsterData.name,
                monsterData.description,
                monsterData.image,
                monsterData.exp,
                monsterData.level,
                monsterData.type,
                monsterData.atk,
                monsterData.hp,
                monsterData.def,
                monsterData.skills,
                monsterData.tier,
                monsterData.is_battle
            );

            detail_el.querySelector('.monster-name').innerHTML = monsterDetailData.name;
            detail_el.querySelector('.monster-level').innerHTML = `Lv.${monsterDetailData.level}`;
            detail_el.querySelector('.monster-tier').src = `${config.img_dir}tiers/${monsterDetailData.tier.image}.png`;
            detail_el.querySelector('.monster-avatar img').src = `${config.img_dir}monsters/${monsterDetailData.image}.png`;

            info_el.querySelector('.monster-hold-desc').innerText = monsterDetailData.description;
            info_el.querySelector('.stat-atk .stat-bar-main').style.width = (monsterDetailData.atk / monsterDetailData.getMaxStatValue(monsterDetailData.atk)) * 100 + '%';
            info_el.querySelector('.stat-hp .stat-bar-main').style.width = (monsterDetailData.hp / monsterDetailData.getMaxStatValue(monsterDetailData.hp)) * 100 + '%';
            info_el.querySelector('.stat-def .stat-bar-main').style.width = (monsterDetailData.def / monsterDetailData.getMaxStatValue(monsterDetailData.def)) * 100 + '%';
            info_el.querySelector('.stat-exp .stat-bar-main').style.width = (monsterDetailData.exp / monsterDetailData.getExpOfLevel(monsterDetailData.level + 1)) * 100 + '%';

            monsterDetailData.skills.forEach((skill, index) => {
                let skillData = SkillsMonster[skill];
                let skillObj = new Skill(skillData.name, skillData.description, skillData.image, skillData.skill_damage, skillData.skill_effect, skillData.level_required);

                skill_el.insertAdjacentHTML(
                    'beforeend',
                    `
                    <div class="skill-item" id="skill-${index}">
                        <img src="${config.img_dir}skills/${skillObj.image}.png" class="skill-img">
                        ${
                            index > 0
                                ? `<img src="${config.img_dir}screens/monster-book/lock-skill-${skillObj.level_required}.png" class="skill-lock ${
                                      skillObj.checkLevelRequired(monsterData.level) ? '' : 'active'
                                  }">`
                                : ''
                        }
                        
                    </div>
                `
                );

                skill_el.querySelector('#skill-' + index).onclick = () => {
                    ShowNotice(skillObj.name, skillObj.description);
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

            //Check monster battle
            let responseAll = await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').get();
            let countMonsterBatle = 0;
            responseAll.forEach(async (response) => {
                response.data().is_battle ? countMonsterBatle++ : '';
            });

            setMonsterBattle(countMonsterBatle);
        };
    }
}

window.customElements.define('monster-book-detail-screen', MonsterBookDetailScreen);
