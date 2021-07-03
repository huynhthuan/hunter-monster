import { config, FS, AU } from '../../config.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class ChatScreen extends BaseComponent {
    constructor() {
        super();
        this._limit = 10;
        this._streak = ''; //Nếu nhiều tin nhắn từ cùng 1 người thì không lặp lại ava
    }

    async render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}chat.css">
            <div class="screen-wrapper chat-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content content-panel">
                        <div class="screen-title">Trò chuyện</div>
                        <div class="chat-list" id="chat-list">

                        </div>
                        <div class="chat-control-wrap">
                            <div class="chat-control">
                                <input type="text" id="chat-input" placeholder="Thêm tin nhắn...">
                                <button id="send-chat">
                                    <img src="${config.img_dir}screens/chat/btn-chat.png" atl="chat">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const btn = this._shadowRoot.getElementById('send-chat');
        const list = this._shadowRoot.getElementById('chat-list');

        btn.onclick = () => {
            let msg = this._shadowRoot.getElementById('chat-input').value;

            if (msg != '') {
                this.sendChat(msg);
                this._shadowRoot.getElementById('chat-input').value = '';
                // this.loadChat();
            }
        };

        FS.collection('chats')
            .orderBy('timestamp', 'asc')
            .limitToLast(this._limit)
            .onSnapshot(async (snapshot) => {
                // snapshot.docChanges().forEach((change) =>
                for (let i = 0; i < snapshot.docChanges().length; i++) {
                    const change = snapshot.docChanges()[i];
                    if (change.type === 'added') {
                        const msgList = change.doc.data();

                        let date = new Date(msgList.timestamp);
                        let time = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ', ' + ('0' + date.getHours()).substr(-2) + ':' + ('0' + date.getMinutes()).substr(-2);
                        // let time = date.toLocaleString();

                        let self = msgList.userID == AU.currentUser.uid ? 'messenger-item messenger-item-self' : 'messenger-item';

                        let meta = '';
                        if (msgList.userID != this._streak) {
                            let userDataResponse = await FS.collection('users').doc(msgList.userID).get();
                            let userData = userDataResponse.data();
                            meta = `
                            <div class="messenger-meta">
                                <div class="messenger-ava">
                                    <div class="messenger-img">
                                        <img src="${userData.avatar}">
                                    </div>
                                    <div class="status active"></div>
                                </div>
                                <div class="messenger-name">
                                    ${userData.username}
                                </div>
                            </div>`;
                            this._streak = msgList.userID;
                        }

                        list.insertAdjacentHTML(
                            'beforeend',
                            `
                            <div class="${self}">
                                ${meta}
                                <div class="messenger-content">
                                    ${msgList.msg}
                                    <div class="timestamp">
                                        ${time}
                                    </div>
                                </div>
                            </div>
                    `
                        );
                        this._limit++;
                    }
                }

                list.scrollTo(0, list.scrollHeight);
            });

        list.onscroll = async () => {
            if (list.scrollTop == 0) {
                let size = await FS.collection('chats').get();
                if (this._limit != size.docs.length) {
                    this._limit = Math.min(this._limit + 10, size.docs.length);
                    console.log(this._limit);
                    this.loadChat();
                }
            }
        };
    }

    sendChat(msg) {
        let time = new Date().getTime();
        FS.collection('chats').add({
            msg: msg,
            userID: AU.currentUser.uid,
            timestamp: time,
        });
    }

    async loadChat() {
        const list = this._shadowRoot.getElementById('chat-list');
        this._streak = '';
        const batch = FS.collection('chats').orderBy('timestamp', 'asc').limitToLast(this._limit);

        const snapshot = await batch.get();

        let result = '';
        // snapshot.docs.forEach(async (doc) =>
        for (let i = 0; i < snapshot.docs.length; i++) {
            let doc = snapshot.docs[i];
            let self = doc.data().userID == AU.currentUser.uid ? 'messenger-item messenger-item-self' : 'messenger-item';
            let date = new Date(doc.data().timestamp);
            let time = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ', ' + ('0' + date.getHours()).substr(-2) + ':' + ('0' + date.getMinutes()).substr(-2);

            let meta = '';
            if (doc.data().userID != this._streak) {
                let userDataResponse = await FS.collection('users').doc(doc.data().userID).get();
                let userData = userDataResponse.data();
                meta = `
                <div class="messenger-meta">
                    <div class="messenger-ava">
                        <div class="messenger-img">
                            <img src="${userData.avatar}">
                        </div>
                        <div class="status active"></div>
                    </div>
                    <div class="messenger-name">
                        ${userData.username}
                    </div>
                </div>`;
                this._streak = doc.data().userID;
            }

            let message = `
            <div class="${self}">
                ${meta}
                <div class="messenger-content">
                    ${doc.data().msg}
                    <div class="timestamp">
                        ${time}
                    </div>
                </div>
            </div>`;
            result = result + message;
        }
        list.innerHTML = result;
        list.scrollTo(0, 10);
    }
}

window.customElements.define('chat-screen', ChatScreen);
