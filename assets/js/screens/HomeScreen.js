import { config } from '../config.js';

import { BaseComponent } from '../components/BaseComponent.js';

class HomeScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}home.css">
            <div class="screen-wrapper home-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content">
                        <div class="screen-desc">
                            <img src="${config.img_dir}screens/home/welcome.png" alt="welcome">
                        </div>
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

window.customElements.define('home-screen', HomeScreen);
