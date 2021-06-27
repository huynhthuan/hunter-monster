import config from '../../config.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class ChatScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}chat.css">
            <div class="screen-wrapper chat-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content content-panel">
                        <div class="screen-title">Trò chuyện</div>
                        <div class="chat-list">
                            <div class="messenger-item">
                                <div class="messenger-meta">
                                    <div class="messenger-ava">
                                        <div class="messenger-img">
                                            <img src="${config.img_dir}users/user-1.png">
                                        </div>
                                        <div class="status active"></div>
                                    </div>
                                    <div class="messenger-name">
                                        Unknow name
                                    </div>
                                </div>
                                <div class="messenger-content">
                                    Dui? Beatae eaque curae quos elit amet? R
                                </div>
                            </div>
                            <div class="messenger-item">
                                <div class="messenger-meta">
                                    <div class="messenger-ava">
                                        <div class="messenger-img">
                                            <img src="${config.img_dir}users/user-1.png">
                                        </div>
                                        <div class="status active"></div>
                                    </div>
                                    <div class="messenger-name">
                                        Unknow name
                                    </div>
                                </div>
                                <div class="messenger-content">
                                    Dui? Beatae eaque curae quos elit amet? Reiciendis explicabo fugiat quos eget, etiam dicta, Dui? Beatae eaque curae quos elit amet? Reiciendis explicabo fugiat quos eget, etiam dicta,
                                </div>
                            </div>
                            <div class="messenger-item messenger-item-self">
                                <div class="messenger-meta">
                                    <div class="messenger-ava">
                                        <div class="messenger-img">
                                            <img src="${config.img_dir}users/user-1.png">
                                        </div>
                                        <div class="status active"></div>
                                    </div>
                                    <div class="messenger-name">
                                        Unknow name
                                    </div>
                                </div>
                                <div class="messenger-content">
                                    Dui? Beatae eaque curae quos elit amet?
                                </div>
                            </div>
                            <div class="messenger-item">
                                <div class="messenger-meta">
                                    <div class="messenger-ava">
                                        <div class="messenger-img">
                                            <img src="${config.img_dir}users/user-1.png">
                                        </div>
                                        <div class="status active"></div>
                                    </div>
                                    <div class="messenger-name">
                                        Unknow name
                                    </div>
                                </div>
                                <div class="messenger-content">
                                    Dui? Beatae eaque curae quos elit amet?
                                </div>
                            </div>
                            <div class="messenger-item messenger-item-self">
                                <div class="messenger-meta">
                                    <div class="messenger-ava">
                                        <div class="messenger-img">
                                            <img src="${config.img_dir}users/user-1.png">
                                        </div>
                                        <div class="status active"></div>
                                    </div>
                                    <div class="messenger-name">
                                        Unknow name
                                    </div>
                                </div>
                                <div class="messenger-content">
                                    Dui?
                                </div>
                            </div>
                            <div class="messenger-item">
                                <div class="messenger-meta">
                                    <div class="messenger-ava">
                                        <div class="messenger-img">
                                            <img src="${config.img_dir}users/user-1.png">
                                        </div>
                                        <div class="status active"></div>
                                    </div>
                                    <div class="messenger-name">
                                        Unknow name
                                    </div>
                                </div>
                                <div class="messenger-content">
                                    Dui? Beatae eaque
                                </div>
                            </div>
                        </div>
                        <div class="chat-control-wrap">
                            <div class="chat-control">
                                <input type="text" id="chat-input" placeholder="Thêm tin nhắn...">
                                <button id="send-chat">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
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

window.customElements.define('chat-screen', ChatScreen);
