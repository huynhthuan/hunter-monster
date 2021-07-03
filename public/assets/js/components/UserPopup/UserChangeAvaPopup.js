import { config, AU, FS, STO } from '../../config.js';
import { ShowNotice } from '../../ultils/ultils.js';
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
                    <input type="file" id="avatar" class="form-control">
                </div>
                <div class="form-group form-popup-action mb-0">
                    <button id="btn-close">
                        <img src="${config.img_dir}buttons/btn-close.png" alt="save-pass">
                    </button>
                    <button id="save-ava">
                        <img src="${config.img_dir}buttons/btn-save.png" alt="save-pass">
                    </button>
                </div>
            </div>
        `;

        const btnClose = this._shadowRoot.querySelector('#btn-close');
        const btnAva = this._shadowRoot.querySelector('#save-ava');
        const inputAva = this._shadowRoot.querySelector('#avatar');

        btnClose.onclick = () => {
            Swal.close();
        };

        btnAva.onclick = () => {
            const imageName = 'user-ava-' + chance.guid() + '.png';
            let storageRef = STO.ref();
            storageRef
                .child(imageName)
                .put(inputAva.files[0])
                .then((snapshot) => {
                    storageRef
                        .child(imageName)
                        .getDownloadURL()
                        .then((url) => {
                            FS.collection('users').doc(AU.currentUser.uid).update({
                                avatar: url,
                            });
                            inputAva.value = '';
                            ShowNotice('Thành công!', 'Bạn đã thay đổi ảnh đại diện');
                        });
                });
        };
    }
}

window.customElements.define('user-change-ava-popup', UserChangeAva);
