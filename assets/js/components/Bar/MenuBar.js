import config from '../../config.js';

import { BaseComponent } from '../BaseComponent.js';

class MenuBar extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}menu-bar.css">
            <div class="menu-bar">
                <a href="${config.domain}#!/home" class="menu-item btn">
                    <img src="${config.img_dir}icons/home.png" alt="menu-home">
                </a>
                <a href="${config.domain}#!/news" class="menu-item btn">
                    <img src="${config.img_dir}icons/map.png" alt="menu-map">
                </a>
                <a href="${config.domain}#!/monster-book" class="menu-item btn">
                    <img src="${config.img_dir}icons/monster-book.png" alt="menu-monster-book">
                </a>
                <a href="${config.domain}#!/chat" class="menu-item btn">
                    <img src="${config.img_dir}icons/bubble.png" alt="menu-chat">
                </a>
                <a href="${config.domain}#!/shop" class="menu-item btn">
                    <img src="${config.img_dir}icons/shop.png" alt="menu-shop">
                </a>
            </div>
        `;
    }
}

window.customElements.define('menu-bar', MenuBar);
