import { config } from '../../config.js';

import { BaseComponent } from '../BaseComponent.js';

class UserBar extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}user-bar.css">
            <div class="user-bar">
                <div class="user-meta">
                    <div class="user-ava-wrap">
                        <div class="user-ava">
                            <img src="${config.img_dir}users/user-1.png" alt="user-ava">
                        </div>
                    </div>
                    <div class="user-info">
                        <div class="user-name">
                             UNKNOW NAME   
                        </div>
                        <div class="user-star">
                            <img src="${config.img_dir}icons/start.png" alt="star">
                            <img src="${config.img_dir}icons/start.png" alt="star">
                            <img src="${config.img_dir}icons/start.png" alt="star">
                        </div>
                    </div>
                </div>
                <div class="user-coin">
                    <div class="coin-box">
                        <div class="coin-value">
                            999999
                        </div>
                        <img src="${config.img_dir}icons/coin.png" alt="coin">
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('user-bar', UserBar);
