import { BaseComponent } from '../../components/BaseComponent.js';
import { config, FS } from '../../config.js';
import { getUid, ShowNoticeFight } from '../../ultils/ultils.js';

import MapsData from '../../mapConfig.js';

import MonstersNormal from '../../monsterNormalConfig.js';
import { MonsterNormal } from '../../database/Monsters/MonsterNormal.js';

import MonstersMap from '../../monsterMapConfig.js';
import { MonsterMap } from '../../database/Monsters/MonsterMap.js';

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
        // Get data map
        let mapData = MapsData[this.props.map_id];
        let userMonster, enemyMonster, monsterNormalTemplate, monsterEnemyTemplate, userMonsterId;

        // Get monster user
        let userMonstersResponses = await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').where('is_battle', '==', true).get();

        userMonstersResponses.forEach((userMonstersResponse) => {
            userMonsterId = userMonstersResponse.id;
            monsterNormalTemplate = MonstersNormal[userMonstersResponse.data().monster_index];
            // Set data to user monster
            userMonster = new MonsterNormal(
                monsterNormalTemplate.name,
                monsterNormalTemplate.description,
                monsterNormalTemplate.image,
                userMonstersResponse.data().exp,
                userMonstersResponse.data().level,
                monsterNormalTemplate.type,
                userMonstersResponse.data().atk,
                userMonstersResponse.data().hp,
                userMonstersResponse.data().def,
                monsterNormalTemplate.skills,
                monsterNormalTemplate.tier
            );
        });

        // Get monster enemy
        monsterEnemyTemplate = MonstersMap[this.props.map_monster];
        // Set monster enemy
        enemyMonster = new MonsterMap(
            monsterEnemyTemplate.name,
            monsterEnemyTemplate.description,
            monsterEnemyTemplate.image,
            monsterEnemyTemplate.exp,
            monsterEnemyTemplate.level,
            monsterNormalTemplate.type,
            monsterEnemyTemplate.atk,
            monsterEnemyTemplate.hp,
            monsterEnemyTemplate.def,
            monsterEnemyTemplate.skills,
            monsterEnemyTemplate.tier,
            monsterEnemyTemplate.exp_received,
            monsterEnemyTemplate.gold_received
        );

        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}map-fight.css">
            <div class="screen-wrapper map-fight-wrapper " style="background-image: url(${config.img_dir}backgrounds/maps/${mapData.background}.png)">
                <a href="${config.domain}#!/map/${this.props.map_id}" class="btn-out-fight btn">
                    <img src="${config.img_dir}screens/maps/btn-out-fight.png" alt="out-fight">
                </a>

                <monster-panel-info class="monster-panel moster-panel-enemy" monster_name="${enemyMonster.name}" monster_hp="${enemyMonster.hp}" monster_maxhp="${enemyMonster.maxhp}" monster_level="${enemyMonster.level}" monster_type="${enemyMonster.type}"></monster-panel-info>

                <monster-panel-info class="monster-panel moster-panel-self" monster_name="${userMonster.name}" monster_hp="${userMonster.hp}" monster_maxhp="${userMonster.maxhp}" monster_level="${userMonster.level}" monster_type="${userMonster.type}"></monster-panel-info>

                <div class="wrap-monster enemy">
                    <div class="model-monster">
                        <monster-box-character monster_ava="${enemyMonster.image}" monster_type="enemy"></monster-box-character>
                    </div>
                    <div class="show-damage">-12312</div>
                </div>

                <div class="wrap-monster ally">
                    <div class="model-monster">
                        <monster-box-character monster_ava="${userMonster.image}" monster_type="ally"></monster-box-character>
                    </div>
                    <div class="show-damage">-123123</div>
                </div>
                <div class="skill-bar">
                </div>
                <audio id="audio-skill" src="" controls preload="metadata" autoplay>
                    <p>Your browser doesn't support html5 audio.</p>
                </audio>
            </div>
        `;

        const fightContainer = this._shadowRoot.querySelector('.map-fight-wrapper');
        const showDameUser = this._shadowRoot.querySelector('.ally .show-damage');
        const showDameEnemy = this._shadowRoot.querySelector('.enemy .show-damage');
        const enemyMonster_el = this._shadowRoot.querySelector('.wrap-monster.enemy');
        const userMonster_el = this._shadowRoot.querySelector('.wrap-monster.ally');
        const enemyPanel = this._shadowRoot.querySelector('.moster-panel-enemy');
        const userPanel = this._shadowRoot.querySelector('.moster-panel-self');
        const audioSkill_el = this._shadowRoot.querySelector('#audio-skill');
        //Game play start
        const skillsBar = fightContainer.querySelector('.skill-bar');

        userMonster.getSkillActive().forEach((skill, index) => {
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
                audioSkill_el.src = `${config.audio_dir}skill/${skill.image}.mp3`;
                skillsBar.classList.add('inactive');
                // Damage enemy
                let yourDamage = skill.damageInflicted(userMonster.atk, enemyMonster.def);
                enemyMonster.hp -= yourDamage;
                enemyPanel.setAttribute('monster_hp', enemyMonster.hp);
                showDameEnemy.innerText = '-' + yourDamage;
                showDameEnemy.classList.add('show');
                enemyMonster_el.classList.add('inflictDamage');

                setTimeout(() => {
                    showDameEnemy.classList.remove('show');
                    enemyMonster_el.classList.remove('inflictDamage');
                }, 1000);

                console.log(`Ban danh enemy con ${enemyMonster.hp}/${enemyMonster.maxhp}`);

                // Check win
                if (enemyMonster.hp <= 0) {
                    enemyPanel.setAttribute('monster_hp', 0);
                    enemyPanel.style.opacity = 0;
                    enemyMonster_el.classList.add('die');

                    // Getuser data
                    let userData = await FS.collection('users').doc(getUid()).get();

                    // Increase coin user
                    await FS.collection('users')
                        .doc(getUid())
                        .update({
                            coin: userData.data().coin + enemyMonster.gold_received,
                        });

                    //Check increase level
                    let expResult = userMonster.exp + enemyMonster.experience_received;
                    if (expResult >= userMonster.getExpNextLevel()) {
                        userMonster.level += 1;
                        userMonster.atk += userMonster.tier.statPerLevel;
                        userMonster.hp = userMonster.maxhp + userMonster.tier.statPerLevel;
                        userMonster.def += userMonster.tier.statPerLevel;
                    }

                    await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').doc(userMonsterId).update({
                        exp: expResult,
                        level: userMonster.level,
                        atk: userMonster.atk,
                        hp: userMonster.maxhp,
                        def: userMonster.def,
                    });
                    ShowNoticeFight(
                        'CHIẾN THẮNG',
                        `<div class="fight-notice normal-win"><span>Vàng + ${enemyMonster.gold_received}</span><span>Exp + ${enemyMonster.experience_received}</span></div>`,
                        '#!/map/' + this.props.map_id
                    );
                    return;
                }

                this.props.turn = false;

                // Pass turn to Enemy
                setTimeout(() => {
                    let randomSkillIndex = chance.integer({ min: 0, max: enemyMonster.getSkillActive().length - 1 });
                    let randomSkill = enemyMonster.getSkillActive()[randomSkillIndex];
                    let enemyDame = randomSkill.damageInflicted(enemyMonster.atk, userMonster.def);
                    audioSkill_el.src = `${config.audio_dir}skill/${randomSkill.image}.mp3`;

                    userMonster.hp -= enemyDame;
                    userPanel.setAttribute('monster_hp', userMonster.hp);
                    showDameUser.innerText = '-' + enemyDame;
                    showDameUser.classList.add('show');
                    userMonster_el.classList.add('inflictDamage');
                    setTimeout(() => {
                        showDameUser.classList.remove('show');
                        userMonster_el.classList.remove('inflictDamage');
                    }, 1000);
                    console.log(`Enemy danh ban con ${userMonster.hp}/${userMonster.maxhp}`);

                    // Check lose
                    if (userMonster.hp <= 0) {
                        userPanel.setAttribute('monster_hp', 0);
                        userMonster_el.classList.add('die');
                        userPanel.style.opacity = 0;
                        ShowNoticeFight('THẤT BẠI', 'Bạn đã thua !', '#!/map/' + this.props.map_id);
                        return;
                    }

                    setTimeout(() => {
                        this.props.turn = true;
                        skillsBar.classList.remove('inactive');
                        console.log('Your turn', this.props.turn);
                    }, 1000);
                }, 1000);
            };
        });
    }
}

window.customElements.define('map-fight-screen', MapFightScreen);
