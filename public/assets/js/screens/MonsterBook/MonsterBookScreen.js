import { config, FS } from '../../config.js';

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
                            </div>
                            <div class="monster-avatar">
                                <img src="${config.img_dir}monsters/monster-3.png" alt="monster">
                            </div>
                            <a href="${config.domain}#!/monster-book/1" class="btn btn-detail-monster">
                                <img src="${config.img_dir}screens/monster-book/btn-detail-monster-book.png" alt="btn-detail-monster">
                            </a>
                        </div>
                         <div class="monster-book-wrap">
                            <div class="monster-book-list">
                                <div class="monsters-item">
                                    <div class="monster-ava">
                                        <img src="${config.img_dir}monsters/monster-1.png" alt="monster">
                                    </div>
                                    <div class="monster-meta">
                                        <div class="monster-name">VULFROST</div>
                                        <div class="monster-level">Lv.11</div>
                                    </div>
                                </div>
                                <div class="monsters-item">
                                    <div class="monster-ava">
                                        <img src="${config.img_dir}monsters/monster-1.png" alt="monster">
                                    </div>
                                    <div class="monster-meta">
                                        <div class="monster-name">VULFROST</div>
                                        <div class="monster-level">Lv.11</div>
                                    </div>
                                </div>
                                <div class="monsters-item">
                                    <div class="monster-ava">
                                        <img src="${config.img_dir}monsters/monster-2.png" alt="monster">
                                    </div>
                                    <div class="monster-meta">
                                        <div class="monster-name">VULFROST</div>
                                        <div class="monster-level">Lv.11</div>
                                    </div>
                                </div>
                                <div class="monsters-item">
                                    <div class="monster-ava">
                                        <img src="${config.img_dir}monsters/monster-3.png" alt="monster">
                                    </div>
                                    <div class="monster-meta">
                                        <div class="monster-name">VULFROST</div>
                                        <div class="monster-level">Lv.11</div>
                                    </div>
                                </div>
                                <div class="monsters-item">
                                    <div class="monster-ava">
                                        <img src="${config.img_dir}monsters/monster-4.png" alt="monster">
                                    </div>
                                    <div class="monster-meta">
                                        <div class="monster-name">VULFROST</div>
                                        <div class="monster-level">Lv.11</div>
                                    </div>
                                </div>
                                <div class="monsters-item">
                                    <div class="monster-ava">
                                        <img src="${config.img_dir}monsters/monster-5.png" alt="monster">
                                    </div>
                                    <div class="monster-meta">
                                        <div class="monster-name">VULFROST</div>
                                        <div class="monster-level">Lv.11</div>
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

window.customElements.define('monster-book-screen', MonsterBookScreen);
