import { config, AU, FS } from '../../config.js';
import { getUid } from '../../ultils/ultils.js';

import { BaseComponent } from '../BaseComponent.js';

class UserInfoPopup extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}user-info-popup.css">
            <div class="user-info-popup">
                <div class="form-group-title">
                   Thông tin tài khoản
                </div>
                <div class="user-info-item">
                    Email:  <span id="email">${AU.currentUser.email} </span>
                </div>
                <div class="user-info-item">
                    Tên nhân vật:  <span id="username"></span>
                </div>
                <div class="user-info-item">
                    Coin:  <span id="coin"></span>
                </div>
            </div>
        `;

        const username_el = this._shadowRoot.querySelector('#username');
        const coin_el = this._shadowRoot.querySelector('#coin');

        FS.collection('users')
            .doc(getUid())
            .onSnapshot((snapshot) => {
                username_el.innerHTML = snapshot.data().username;
                coin_el.innerHTML = snapshot.data().coin >= 1000 ? numeral(snapshot.data().coin).format('0.0a') : snapshot.data().coin;
            });
    }
}

window.customElements.define('user-info-popup', UserInfoPopup);
