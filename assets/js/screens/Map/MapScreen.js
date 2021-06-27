import { config } from '../../config.js';
import maps from '../../mapConfig.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class MapScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}map.css">
            <div class="screen-wrapper map-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content">
                        
                    </div>
                </div>
            </div>
        `;

        console.log(maps);

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

window.customElements.define('map-screen', MapScreen);
