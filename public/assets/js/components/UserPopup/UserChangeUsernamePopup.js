import { config, AU, FS } from '../../config.js';
import { ShowNotice } from '../../ultils/ultils.js';

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

        this.changeUserName();
    }

    changeUserName() {
        const user = AU.currentUser;
        const userNameInput = this._shadowRoot.getElementById('username');

        async function ahihi() {
            const result = await FS.collection('users').get();
            result.docs.forEach((doc) => {
                if (doc.id === user.uid) {
                    // displayName = userNameInput.value;
                    FS.collection('users').doc(user.uid).update({
                        username: userNameInput.value,
                    });
                }
            });

            user.updateProfile({
                displayName: userNameInput.value,
            })
                .then(() => {
                    ShowNotice('Thành công!', 'Tên nhân vật đã được thay đổi!');
                })
                .catch((error) => {
                    ShowNotice('Lỗi rồi!', error);
                });
        }

        // Change info
        this._shadowRoot.getElementById('save-password').addEventListener('click', function () {
            ahihi();
        });
    }
}

window.customElements.define('user-change-username-popup', UserChangeUsernamePopup);
