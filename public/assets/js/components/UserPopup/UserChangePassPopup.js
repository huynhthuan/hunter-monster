import { config, AU, FS } from '../../config.js';

import { BaseComponent } from '../BaseComponent.js';

class UserChangePassPopup extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}user-change-pass-popup.css">
            <div class="user-change-pass-popup">
                <div class="form-group-title">
                    Đổi mật khẩu
                </div>
                <div class="form-group">
                    <div class="form-label">
                        Mật khẩu mới
                    </div>
                    <input type="password" id="new-pass" class="form-control" placeholder="Nhập mật khẩu mới">
                </div>
                <div class="form-group">
                    <div class="form-label">
                        Nhập lại mật khẩu mới
                    </div>
                    <input type="password" id="re-new-pass" class="form-control" placeholder="Nhập lại mật khẩu mới">
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

window.customElements.define('user-change-pass-popup', UserChangePassPopup);
