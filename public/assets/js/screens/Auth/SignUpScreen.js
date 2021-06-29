import { config, AU, FS } from '../../config.js';
import { verifyPassword, sha1, ShowError } from '../../ultils/ultils.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class SignUp extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}auth.css">
            <div class="screen-wrapper auth-wrapper auth-wrapper-login">
                <div class="logo">
                    <img src="${config.img_dir}logo/logo.png" alt="logo">
                </div>
                <div class="auth-content">
                     <div class="auth-intro">
                        <div class="auth-title">
                            Đăng ký tài khoản Hunter Monster
                        </div>
                        <div class="auth-desc">Đừng chỉ chơi mà hãy kết bạn nữa nhé !</div>
                     </div>
                     <div class="auth-form">
                        <div class="form-group">
                            <div class="form-label">
                                Email
                            </div>
                            <input type="text" id="email" class="form-control" placeholder="Nhập email">
                        </div>
                        <div class="form-group">
                            <div class="form-label">
                                Mật khẩu
                            </div>
                            <input type="password" id="password" class="form-control" placeholder="Nhập mật khẩu">
                        </div>
                        <div class="form-group">
                            <div class="form-label">
                                Nhập lại mật khẩu
                            </div>
                            <input type="password" id="re-password" class="form-control" placeholder="Nhập lại mật khẩu">
                        </div>
                        <div class="form-group">
                            <button class="auth-btn autn-btn-signup" id="btn-signup">
                                <img src="${config.img_dir}screens/auth/btn-signup.png" alt="btn-signup">
                            </button>
                        </div>
                     </div>
                     <div class="auth-footer">
                        Bạn đã có tài khoản ?  <a href="${config.domain}#!/login"><strong>Vào ngay !</strong></a>
                     </div>
                </div>
            </div>
        `;

        this.SignUp();
    }

    SignUp() {
        this._shadowRoot.getElementById('btn-signup').addEventListener('click', async () => {
            const email = this._shadowRoot.getElementById('email');
            const password = this._shadowRoot.getElementById('password');
            const repassword = this._shadowRoot.getElementById('re-password');
            let passwordSHA1 = sha1(password.value);
            let flag = 0;
            if (email.value == '' || password.value == '' || repassword.value == '') {
                flag = 1;
                ShowError('Lỗi rồi!', 'Bạn cần nhập đủ các trường!');
            } else if (!verifyPassword(password.value)) {
                flag = 1;
                ShowError('Lỗi rồi!', 'Mật khẩu chỉ bao gồm chữ hoặc số, tối thiểu 8 kí tự chứa ít nhất 1 chữ số, 1 chữ in thường và 1 chữ in hoa!');
            } else if (repassword.value != password.value) {
                flag = 1;
                ShowError('Lỗi rồi!', 'Nhập lại mật khẩu không đúng!');
                this._shadowRoot.getElementById('re-password').value = '';
                this._shadowRoot.getElementById('password').value = '';
            } else if (flag == 0) {
                AU.createUserWithEmailAndPassword(email.value, passwordSHA1)
                    .then((userCredential) => {
                        FS.collection('users').doc(userCredential.user.uid).set({
                            coin: 100,
                            star: 0,
                            monsters: [],
                            is_newbie: true,
                        });

                        ShowError('Chúc Mừng!', 'Đăng ký thành công!', '/login');
                    })
                    .catch((error) => {
                        let errorCode = error.code;

                        switch (errorCode) {
                            case 'auth/email-already-in-use':
                                ShowError('Lỗi rồi!', 'Email đã tồn tại!');
                                break;
                            case 'auth/invalid-email':
                                ShowError('Lỗi rồi!', 'Email không hợp lệ');
                                break;
                            default:
                                ShowError('Lỗi rồi!', 'Thử lại đi!');
                        }
                    });
            }
        });
    }
}

window.customElements.define('signup-screen', SignUp);
