import { config, FS } from '../../config.js';
import maps from '../../mapConfig.js';
import { monstersMap, monstersNormal } from '../../monsterConfig.js';
import { BaseComponent } from '../../components/BaseComponent.js';
import { getUid, ShowNoticeFight } from '../../ultils/ultils.js';

class MapFightScreen extends BaseComponent {
    constructor() {
        super();

        this.props = {
            map_id: '',
            map_monster: '',
            turn: true,
        };
    }

    static get observedAttributes() {
        return ['map_id', 'map_monster'];
    }

    async render() {
        let mapData = maps[this.props.map_id];

        // Getuser data
        let userData = await FS.collection('users').doc(getUid()).get();
        // Set up data monster
        let monsterAllyData, monsterEnemyData, monsterAllyId;
        monsterEnemyData = monstersMap[this.props.map_monster];
        let monsterAllyHpBase;

        let allyMonsters = await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').where('is_battle', '==', true).limit(1).get();
        allyMonsters.forEach((allyMonster) => {
            monsterAllyData = monstersNormal[allyMonster.data().monster_index];
            monsterAllyData.atk = allyMonster.data().atk;
            monsterAllyData.def = allyMonster.data().def;
            monsterAllyData.hp = allyMonster.data().hp;
            monsterAllyData.baseHp = allyMonster.data().baseHp;
            monsterAllyData.exp = allyMonster.data().exp;
            monsterAllyData.level = allyMonster.data().level;
            monsterAllyId = allyMonster.id;
            monsterAllyHpBase = allyMonster.data().hp;
        });

        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}map-fight.css">
            <div class="screen-wrapper map-fight-wrapper " style="background-image: url(${config.img_dir}backgrounds/maps/${mapData.background}.png)">
                <a href="${config.domain}#!/map/${this.props.map_id}" class="btn-out-fight btn">
                    <img src="${config.img_dir}screens/maps/btn-out-fight.png" alt="out-fight">
                </a>    
                <monster-panel-info class="monster-panel moster-panel-enemy" monster_name="${monsterEnemyData.name}" monster_hp="${monsterEnemyData.hp}" monster_basehp="${monsterEnemyData.baseHp}" monster_level="${monsterEnemyData.level}" monster_type="${monsterEnemyData.type}"></monster-panel-info>
                <monster-panel-info class="monster-panel moster-panel-self" monster_name="${monsterAllyData.name}" monster_hp="${monsterAllyData.hp}" monster_basehp="${monsterAllyData.baseHp}" monster_level="${monsterAllyData.level}" monster_type="${monsterAllyData.type}"></monster-panel-info>
                <monster-box-character monster_ava="${monsterEnemyData.avatar}" monster_type="enemy"></monster-box-character>
                <monster-box-character monster_ava="${monsterAllyData.avatar}" monster_type="ally"></monster-box-character>
                <div class="skill-bar">
                </div>
            </div>
        `;

        const fightContainer = this._shadowRoot.querySelector('.map-fight-wrapper');

        if (monsterEnemyData) {
            // Get monster skill
            let monsterSkillActive = monsterEnemyData.skills.filter((skill) => {
                return skill.checkLevelRequired(monsterEnemyData.level);
            });

            //Game play start

            const skillsBar = fightContainer.querySelector('.skill-bar');

            monsterAllyData.skills.forEach((skill, index) => {
                if (skill.checkLevelRequired(monsterAllyData.level)) {
                    skillsBar.insertAdjacentHTML(
                        'beforeend',
                        `
                    <button class="skill-item" id="skill-${index}">
                        <img src="${config.img_dir}skills/${skill.image}.png" alt="skill">
                    </button>
                    `
                    );

                    const skillBtn = skillsBar.querySelector('#skill-' + index);

                    skillBtn.onclick = async () => {
                        // Damage enemy
                        let yourDamage = skill.damageInflicted(monsterAllyData.atk, monsterEnemyData.def);

                        monsterEnemyData.hp -= yourDamage;

                        console.log('Ban danh enemy con ' + monsterEnemyData.hp);

                        // Check hp enemy

                        if (monsterEnemyData.hp <= 0) {
                            // Increase coin user
                            await FS.collection('users')
                                .doc(getUid())
                                .update({
                                    coin: userData.data().coin + monsterEnemyData.gold_received,
                                });

                            //Increase exp monster ally
                            let expResult;
                            expResult = monsterAllyData.exp + monsterEnemyData.experience_received;

                            //Check increase level
                            if (expResult >= monsterAllyData.getExpNextLevel()) {
                                monsterAllyData.level += 1;
                                monsterAllyData.atk += monsterAllyData.tier.statPerLevel;
                                monsterAllyData.hp = monsterAllyData.baseHp + monsterAllyData.tier.statPerLevel;
                                monsterAllyData.basehp = monsterAllyHpBase + monsterAllyData.tier.statPerLevel;
                                monsterAllyData.def += monsterAllyData.tier.statPerLevel;
                            } else {
                                monsterAllyData.hp = monsterAllyHpBase;
                            }

                            await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').doc(monsterAllyId).update({
                                exp: expResult,
                                level: monsterAllyData.level,
                                atk: monsterAllyData.atk,
                                hp: monsterAllyData.hp,
                                def: monsterAllyData.def,
                            });

                            ShowNoticeFight(
                                'CHIẾN THẮNG',
                                `<div class="fight-notice normal-win"><span>Vàng + ${monsterEnemyData.gold_received}</span><span>Exp + ${monsterEnemyData.experience_received}</span></div>`,
                                '#!/map/' + this.props.map_id
                            );
                            monsterEnemyData.hp = monsterEnemyData.baseHp;
                            return;
                        }

                        this.props.turn = false;

                        // Pass turn to Enemy
                        setTimeout(() => {
                            let randomSkill = chance.integer({ min: 0, max: monsterSkillActive.length - 1 });

                            let enemyDame = monsterSkillActive[randomSkill].damageInflicted(monsterEnemyData.atk, monsterAllyData.def);
                            monsterAllyData.hp -= enemyDame;

                            console.log('Enemy danh ban con ' + monsterAllyData.hp);

                            // Check hp ally
                            if (monsterAllyData.hp <= 0) {
                                ShowNoticeFight('THẤT BẠI', 'Bạn đã thua !', '#!/map/' + this.props.map_id);
                                monsterEnemyData.hp = monsterEnemyData.baseHp;
                                return;
                            }

                            this.props.turn = true;

                            console.log('Your turn', this.props.turn);
                        }, 1000);
                    };
                }
            });
        }
    }
}

window.customElements.define('map-fight-screen', MapFightScreen);
