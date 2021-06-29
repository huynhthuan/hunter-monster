import { config, FS } from '../../config.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class MonsterBookDetailScreen extends BaseComponent {
    constructor() {
        super();
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
                            </div>
                            <div class="monster-avatar">
                                <img src="${config.img_dir}monsters/monster-3.png" alt="monster">
                            </div>
                            <a href="#" class="btn btn-detail-monster">
                                <img src="${config.img_dir}screens/monster-book/btn-battle.png" alt="btn-detail-monster">
                            </a>
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
                                    <div class="stat-item">
                                        <div class="stat-label">
                                            SỨC MẠNH
                                        </div>
                                        <div class="stat-bar">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal.png" class="stat-bar-bg">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal-main.png" class="stat-bar-main">
                                        </div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-label">
                                            PHÒNG THỦ
                                        </div>
                                        <div class="stat-bar">
                                             <img src="${config.img_dir}screens/monster-book/bg-heal.png" class="stat-bar-bg">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal-main.png" class="stat-bar-main">
                                        </div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-label">
                                            SINH LỰC
                                        </div>
                                        <div class="stat-bar">
                                             <img src="${config.img_dir}screens/monster-book/bg-heal.png" class="stat-bar-bg">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal-main.png" class="stat-bar-main">
                                        </div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-label">
                                            KINH NGHIỆM
                                        </div>
                                        <div class="stat-bar">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal.png" class="stat-bar-bg">
                                            <img src="${config.img_dir}screens/monster-book/bg-heal-main.png" class="stat-bar-main">
                                        </div>
                                    </div>
                                </div>
                                <div class="monster-skill">
                                    <div class="skill-item">
                                        <img src="${config.img_dir}skills/skill-1.png" class="skill-img">
                                    </div>
                                    <div class="skill-item">
                                        <img src="${config.img_dir}skills/skill-2.png" class="skill-img">
                                        <img src="${config.img_dir}screens/monster-book/lock-skill-10.png" class="skill-lock active">
                                    </div>
                                    <div class="skill-item">
                                        <img src="${config.img_dir}skills/skill-3.png" class="skill-img">
                                        <img src="${config.img_dir}screens/monster-book/lock-skill-20.png" class="skill-lock active">
                                    </div>
                                    <div class="skill-item">
                                        <img src="${config.img_dir}skills/skill-4.png" class="skill-img">
                                        <img src="${config.img_dir}screens/monster-book/lock-skill-40.png" class="skill-lock active">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('monster-book-detail-screen', MonsterBookDetailScreen);
