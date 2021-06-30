import { config, AU, FS } from '../../config.js';

import { BaseComponent } from '../BaseComponent.js';

class UserChangeUsernamePopup extends BaseComponent {
    constructor() {
        super();
    }

    async render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}user-change-username-popup.css">
            <div class="user-change-username-popup">
                <div class="form-group-title">
                   Đổi tên nhân vật
                </div>
                <div class="form-group">
                    <div class="form-label">
                        Tên nhân vật
                    </div>
                    <input type="text" id="username" class="form-control" placeholder="Nhập tên nhân vật" value="${AU.currentUser.displayName}">
                </div>
                <div class="form-group form-popup-action mb-0">
                    <button id="btn-close">
                        <img src="${config.img_dir}buttons/btn-close.png" alt="save-pass">
                    </button>
                    <button id="save-password">
                        <img src="${config.img_dir}buttons/btn-save.png" alt="save-pass">
                    </button>
                </div>
            </div>
        `;

        const btnClose = this._shadowRoot.querySelector('#btn-close');

        btnClose.onclick = () => {
            Swal.close();
        };
    }
}

window.customElements.define('user-change-username-popup', UserChangeUsernamePopup);
