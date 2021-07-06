import { AU, FS, config } from '../../config.js';
import { removeTokenLogin, getUid, removeUid, removeMonsterBattle } from '../../ultils/ultils.js';
import { BaseComponent } from '../BaseComponent.js';

class UserBar extends BaseComponent {
    constructor() {
        super();
    }

    async render() {
        let userDataResponse = await FS.collection('users').doc(getUid()).get();
        let userData = userDataResponse.data();

        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}user-bar.css">
            <div class="user-bar">
                <div class="user-meta">
                    <div class="user-ava-wrap" id="ava-box">
                        <div class="user-ava">
                            <img src="${config.img_dir}users/user-1.png" alt="user-ava">
                        </div>
                    </div>
                    <div class="user-info">
                        <div class="user-name">
                        </div>
                        <div class="user-star">
                        </div>
                        <div class="user-setting-bar">
                            <button id="user-setting">
                                <img src="${config.img_dir}icons/setting.png" alt="setting">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="user-coin">
                    <div class="coin-box">
                        <div class="coin-value">
                            ${userData.coin}
                        </div>
                        <img src="${config.img_dir}icons/coin.png" alt="coin">
                    </div>
                </div>
            </div>
        `;

        const userStar_el = this._shadowRoot.querySelector('.user-star');
        const ava_wrap_el = this._shadowRoot.querySelector('#ava-box');
        const username_el = this._shadowRoot.querySelector('.user-name');
        const setting_el = this._shadowRoot.querySelector('#user-setting');
        const coin_el = this._shadowRoot.querySelector('.coin-value');
        const ava_box = this._shadowRoot.querySelector('.user-ava img');

        if (userData.star > 0) {
            for (let i = 0; i < userData.star; i++) {
                userStar_el.innerHTML += `<img src="${config.img_dir}icons/star.png" alt="star">`;
            }
        }

        setting_el.onclick = () => {
            Swal.fire({
                html: `<user-info-popup></user-info-popup>`,
                confirmButtonText: '',
                denyButtonText: '',
                showDenyButton: true,
                backdrop: false,
                target: document.querySelector('#app'),
                buttonsStyling: false,
                width: '360px',
                customClass: {
                    confirmButton: 'logout',
                    denyButton: 'change-pass',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    AU.signOut()
                        .then(() => {
                            removeTokenLogin();
                            removeUid();
                            removeMonsterBattle();
                            router.navigate('/login');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else if (result.isDenied) {
                    Swal.fire({
                        html: `<user-change-pass-popup></user-change-pass-popup>`,
                        showConfirmButton: false,
                        backdrop: false,
                        target: document.querySelector('#app'),
                        buttonsStyling: false,
                        width: '360px',
                    });
                }
            });
        };

        ava_wrap_el.onclick = () => {
            Swal.fire({
                html: `<user-change-ava-popup></user-change-ava-popup>`,
                showConfirmButton: false,
                backdrop: false,
                target: document.querySelector('#app'),
                buttonsStyling: false,
                width: '360px',
            });
        };

        username_el.onclick = () => {
            Swal.fire({
                html: `<user-change-username-popup></user-change-username-popup>`,
                showConfirmButton: false,
                backdrop: false,
                target: document.querySelector('#app'),
                buttonsStyling: false,
                width: '360px',
            });
        };

        // Set user data
        FS.collection('users')
            .doc(getUid())
            .onSnapshot((snapshot) => {
                username_el.innerHTML = snapshot.data().username;
                coin_el.innerHTML = snapshot.data().coin >= 1000 ? numeral(snapshot.data().coin).format('0.0a') : snapshot.data().coin;
                ava_box.src = snapshot.data().avatar;
            });
    }
}

window.customElements.define('user-bar', UserBar);
