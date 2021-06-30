import { config, AU, FS } from '../../config.js';

import { BaseComponent } from '../BaseComponent.js';

class UserChangeAva extends BaseComponent {
    constructor() {
        super();
    }

    async render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}user-change-ava-popup.css">
            <div class="user-change-ava-popup">
                <div class="form-group-title">
                   Đổi ảnh đại diện
                </div>
                <div class="form-group">
                    <div class="form-label">
                        Tải ảnh lên
                    </div>
                    <input type="file" id="username" class="form-control">
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

window.customElements.define('user-change-ava-popup', UserChangeAva);
