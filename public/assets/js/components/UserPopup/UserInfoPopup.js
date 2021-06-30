import { config, AU, FS } from '../../config.js';

import { BaseComponent } from '../BaseComponent.js';

class UserInfoPopup extends BaseComponent {
    constructor() {
        super();
    }

    async render() {
        let userDataResponse = await FS.collection('users').doc(AU.currentUser.uid).get();
        let userData = userDataResponse.data();
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}user-info-popup.css">
            <div class="user-info-popup">
                <div class="form-group-title">
                   Thông tin tài khoản
                </div>
                <div class="user-info-item">
                    Email:  ${AU.currentUser.email} 
                </div>
                <div class="user-info-item">
                    Tên nhân vật:  ${AU.currentUser.displayName} 
                </div>
                <div class="user-info-item">
                    Coin:  ${userData.coin}
                </div>
            </div>
        `;
    }
}

window.customElements.define('user-info-popup', UserInfoPopup);
