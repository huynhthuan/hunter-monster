import { config, AU, FB } from '../../config.js';
import { sha1, ShowNotice } from '../../ultils/ultils.js';

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
                        Mật khẩu cũ
                    </div>
                    <input type="password" id="old-pass" class="form-control" placeholder="Nhập mật khẩu cũ">
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

        this.changePassword();
    }

    changePassword() {
        //Change password
        const btnSave = this._shadowRoot.getElementById('save-password');
        const user = AU.currentUser;
        const newPass = this._shadowRoot.getElementById('new-pass');
        const reNewPass = this._shadowRoot.getElementById('re-new-pass');
        const oldPass = this._shadowRoot.getElementById('old-pass');

        btnSave.addEventListener('click', function () {
            if (newPass.value === reNewPass.value) {
                const credential = FB.auth.EmailAuthProvider.credential(user.email, sha1(oldPass.value));
                user.reauthenticateWithCredential(credential)
                    .then(() => {
                        let newPassSha1 = sha1(newPass.value);
                        user.updatePassword(newPassSha1)
                            .then(() => {
                                ShowNotice('Thành công!', 'Mật khẩu đã được thay đổi!');
                            })
                            .catch((error) => {
                                ShowNotice('Lỗi rồi!', error);
                            });
                    })
                    .catch((error) => {
                        ShowNotice('Lỗi!', error);
                    });
            } else {
                ShowNotice('Lỗi!', 'Mật khẩu nhập lại không khớp!');
            }
        });
    }
}

window.customElements.define('user-change-pass-popup', UserChangePassPopup);
