import { config, AU } from '../../config.js';
import { ShowError, sha1, addTokenLogin } from '../../ultils/ultils.js';
import { BaseComponent } from '../../components/BaseComponent.js';

class LoginScreen extends BaseComponent {
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
                            Chào mừng đến với Hunter Monster
                        </div>
                        <div class="auth-desc">Phiêu lưu và sưu tầm quái vật !</div>
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
                            <button class="auth-btn autn-btn-login" id="btn-login">
                                <img src="${config.img_dir}screens/auth/btn-login.png" alt="btn-login">
                            </button>
                        </div>
                     </div>
                     <div class="auth-footer">
                        Bạn chưa có tài khoản ?  <a href="${config.domain}#!/sign-up"><strong>Đăng ký mới !</strong></a>
                     </div>
                </div>
            </div>
        `;

        this.login();
    }

    login() {
        let emailInput = this._shadowRoot.getElementById('email');
        let passwordInput = this._shadowRoot.getElementById('password');
        this._shadowRoot.getElementById('btn-login').addEventListener('click', async () => {
            let passwordSHA1 = sha1(passwordInput.value);
            let flag = 0;
            if (emailInput.value == '' || passwordInput.value == '') {
                flag = 1;
                ShowError('Lỗi rồi!', 'Bạn cần nhập đủ các trường!');
            } else if (flag == 0) {
                AU.signInWithEmailAndPassword(emailInput.value, passwordSHA1)
                    .then((userCredential) => {
                        addTokenLogin(userCredential.user.refreshToken);
                        ShowError('Chúc Mừng!', 'Đăng nhập thành công!', '/home');
                    })
                    .catch((error) => {
                        let errorCode = error.code;

                        switch (errorCode) {
                            case 'auth/wrong-password':
                                ShowError('Lỗi rồi!', 'Sai mật khẩu, vui lòng đăng nhập lại!');
                                break;
                            case 'auth/user-not-found':
                                ShowError('Lỗi rồi!', 'Người dùng không tồn tại, vui lòng đăng nhập lại!');
                                break;
                            default:
                                ShowError('Lỗi rồi!', 'Vui lòng Kiểm tra lại!');
                        }
                    });
            }
        });
    }
}

window.customElements.define('login-screen', LoginScreen);
