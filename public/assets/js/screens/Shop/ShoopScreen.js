import { config, FS } from '../../config.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class ShopScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}shop.css">
            <div class="screen-wrapper shop-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content content-panel">
                        <div class="screen-title">Cửa hàng</div>
                        <div class="shop-list">
                            <div class="item-wrap">
                                <div class="item-ava">
                                   <img src="${config.img_dir}items/item-1.png">
                                </div>

                                <div class="item-meta">
                                    <div class="item-title">Đá EXP hệ Thủy (Lv.1)</div>
                                    <div class="item-desc">
                                        + 50 EXP kinh nghiệm cho quái vật
                                    </div>
                                    <div class="item-price">
                                        <img src="${config.img_dir}icons/coin.png"> 700
                                    </div>
                                </div>
                                <button class="btn-buy">
                                    <img src="${config.img_dir}screens/shop/btn-buy.png" alt="btn-buy">
                                </button>
                            </div>
                            <div class="item-wrap">
                                <div class="item-ava">
                                   <img src="${config.img_dir}items/item-1.png">
                                </div>

                                <div class="item-meta">
                                    <div class="item-title">Đá EXP hệ Thủy (Lv.1)</div>
                                    <div class="item-desc">
                                        + 50 EXP kinh nghiệm cho quái vật
                                    </div>
                                    <div class="item-price">
                                        <img src="${config.img_dir}icons/coin.png"> 700
                                    </div>
                                </div>
                                <button class="btn-buy">
                                    <img src="${config.img_dir}screens/shop/btn-buy.png" alt="btn-buy">
                                </button>
                            </div>
                            <div class="item-wrap">
                                <div class="item-ava">
                                   <img src="${config.img_dir}items/item-1.png">
                                </div>

                                <div class="item-meta">
                                    <div class="item-title">Đá EXP hệ Thủy (Lv.1)</div>
                                    <div class="item-desc">
                                        + 50 EXP kinh nghiệm cho quái vật
                                    </div>
                                    <div class="item-price">
                                        <img src="${config.img_dir}icons/coin.png"> 700
                                    </div>
                                </div>
                                <button class="btn-buy">
                                    <img src="${config.img_dir}screens/shop/btn-buy.png" alt="btn-buy">
                                </button>
                            </div>
                            <div class="item-wrap">
                                <div class="item-ava">
                                   <img src="${config.img_dir}items/item-1.png">
                                </div>

                                <div class="item-meta">
                                    <div class="item-title">Đá EXP hệ Thủy (Lv.1)</div>
                                    <div class="item-desc">
                                        + 50 EXP kinh nghiệm cho quái vật
                                    </div>
                                    <div class="item-price">
                                        <img src="${config.img_dir}icons/coin.png"> 700
                                    </div>
                                </div>
                                <button class="btn-buy">
                                    <img src="${config.img_dir}screens/shop/btn-buy.png" alt="btn-buy">
                                </button>
                            </div>
                            <div class="item-wrap">
                                <div class="item-ava">
                                   <img src="${config.img_dir}items/item-1.png">
                                </div>

                                <div class="item-meta">
                                    <div class="item-title">Đá EXP hệ Thủy (Lv.1)</div>
                                    <div class="item-desc">
                                        + 50 EXP kinh nghiệm cho quái vật
                                    </div>
                                    <div class="item-price">
                                        <img src="${config.img_dir}icons/coin.png"> 700
                                    </div>
                                </div>
                                <button class="btn-buy">
                                    <img src="${config.img_dir}screens/shop/btn-buy.png" alt="btn-buy">
                                </button>
                            </div>
                            <div class="item-wrap">
                                <div class="item-ava">
                                   <img src="${config.img_dir}items/item-1.png">
                                </div>

                                <div class="item-meta">
                                    <div class="item-title">Đá EXP hệ Thủy (Lv.1)</div>
                                    <div class="item-desc">
                                        + 50 EXP kinh nghiệm cho quái vật
                                    </div>
                                    <div class="item-price">
                                        <img src="${config.img_dir}icons/coin.png"> 700
                                    </div>
                                </div>
                                <button class="btn-buy">
                                    <img src="${config.img_dir}screens/shop/btn-buy.png" alt="btn-buy">
                                </button>
                            </div>
                            <div class="item-wrap">
                                <div class="item-ava">
                                   <img src="${config.img_dir}items/item-1.png">
                                </div>

                                <div class="item-meta">
                                    <div class="item-title">Đá EXP hệ Thủy (Lv.1)</div>
                                    <div class="item-desc">
                                        + 50 EXP kinh nghiệm cho quái vật
                                    </div>
                                    <div class="item-price">
                                        <img src="${config.img_dir}icons/coin.png"> 700
                                    </div>
                                </div>
                                <button class="btn-buy">
                                    <img src="${config.img_dir}screens/shop/btn-buy.png" alt="btn-buy">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('shop-screen', ShopScreen);
