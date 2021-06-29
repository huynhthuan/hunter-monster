import { AU, FS, config } from '../../config.js';
import { removeTokenLogin } from '../../ultils/ultils.js';
import { BaseComponent } from '../BaseComponent.js';

class UserBar extends BaseComponent {
    constructor() {
        super();
    }

    async render() {
        let userDataResponse = await FS.collection('users').doc(AU.currentUser.uid).get();
        let userData = userDataResponse.data();

        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
                            ${AU.currentUser.displayName} 
                        </div>
                        <div class="user-star">
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
        const ava_el = this._shadowRoot.querySelector('#ava-box');

        if (userData.star > 0) {
            for (let i = 0; i < userData.star; i++) {
                userStar_el.innerHTML += `<img src="${config.img_dir}icons/start.png" alt="star">`;
            }
        }

        // AU.onAuthStateChanged((user) => {
        //     if (user) {
        //         console.log(user);
        //     } else {
        //         console.log('loi');
        //     }
        // });

        ava_el.onclick = () => {
            AU.signOut()
                .then(() => {
                    removeTokenLogin();
                    router.navigate('/login');
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    }
}

window.customElements.define('user-bar', UserBar);
