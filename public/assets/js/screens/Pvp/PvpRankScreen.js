import { config } from '../../config.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class PvpRankScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}pvp.css">
            <link rel="stylesheet" href="${config.style_dir}pvp-rank.css">
            <div class="screen-wrapper pvp-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content">
                        <div class="pvp-description-wrap">
                            <div class="pvp-description">
                                Voluptate sapien, integer vero quia asperiores nulla impedit. Laoreet wisi architecto explicabo? Libero. Qui eveniet quasi do aute asperiores dictumst netus egestas facere voluptatem! Cupidatat torquent adipisicing tristique? Quos occaecat occaecat eligendi aspernatur dui, dictu
                            </div>
                        </div>
                        <div class="pvp-room-panel">
                            <div class="list-room-title">Xếp hạng thi đấu</div>
                                <div class="list-room-wrap">
                                    <div class="pvp-list-room">
                                        <div class="room-item">
                                            <div class="room-ava-wrap">
                                                <div class="room-ava">
                                                    <img src="${config.img_dir}users/user-1.png" alt="room-ava">
                                                </div>
                                            </div>
                                            <div class="room-meta">
                                                <div class="room-infor">
                                                    <div class="room-name">
                                                        UNKNOW NAME
                                                    </div>
                                                    <div class="room-rank">
                                                        <img src="${config.img_dir}icons/star.png" alt="star">
                                                    </div>
                                                </div>
                                                <div class="rank-number">
                                                    1
                                                </div>
                                            </div>
                                        </div>
                                        <div class="room-item">
                                            <div class="room-ava-wrap">
                                                <div class="room-ava">
                                                    <img src="${config.img_dir}users/user-1.png" alt="room-ava">
                                                </div>
                                            </div>
                                            <div class="room-meta">
                                                <div class="room-infor">
                                                    <div class="room-name">
                                                        UNKNOW NAME
                                                    </div>
                                                    <div class="room-rank">
                                                        <img src="${config.img_dir}icons/star.png" alt="star">
                                                    </div>
                                                </div>
                                                <div class="rank-number">
                                                    2
                                                </div>
                                            </div>
                                        </div>
                                        <div class="room-item">
                                            <div class="room-ava-wrap">
                                                <div class="room-ava">
                                                    <img src="${config.img_dir}users/user-1.png" alt="room-ava">
                                                </div>
                                            </div>
                                            <div class="room-meta">
                                                <div class="room-infor">
                                                    <div class="room-name">
                                                        UNKNOW NAME
                                                    </div>
                                                    <div class="room-rank">
                                                        <img src="${config.img_dir}icons/star.png" alt="star">
                                                    </div>
                                                </div>
                                                <div class="rank-number">
                                                    3
                                                </div>
                                            </div>
                                        </div>
                                        <div class="room-item">
                                            <div class="room-ava-wrap">
                                                <div class="room-ava">
                                                    <img src="${config.img_dir}users/user-1.png" alt="room-ava">
                                                </div>
                                            </div>
                                            <div class="room-meta">
                                                <div class="room-infor">
                                                    <div class="room-name">
                                                        UNKNOW NAME
                                                    </div>
                                                    <div class="room-rank">
                                                        <img src="${config.img_dir}icons/star.png" alt="star">
                                                    </div>
                                                </div>
                                                <div class="rank-number">
                                                    4
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div class="pvp-control pvp-control-rank">
                                <a href="${config.domain}#!/pvp/" class="btn">
                                    <img src="${config.img_dir}screens/pvp/btn-back.png" alt="btn-back">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('pvp-rank-screen', PvpRankScreen);
