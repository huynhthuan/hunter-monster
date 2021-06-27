import config from '../../config.js';

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
                            <button class="auth-btn autn-btn-login">
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

        // Swal.fire({
        //     title: 'Error!',
        //     text: 'Do you want to continue',
        //     confirmButtonText: '',
        //     backdrop: false,
        //     target: document.querySelector('#app'),
        //     buttonsStyling: false,
        //     width: '324px',
        // });
    }
}

window.customElements.define('login-screen', LoginScreen);
