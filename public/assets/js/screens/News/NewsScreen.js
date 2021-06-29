import { config, FS } from '../../config.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class NewsScreen extends BaseComponent {
    constructor() {
        super();
        this._firstIndex = 0;
        this._lastIndex = 0;
        this._next = true;
        this._prev = false;
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}news.css">
            <div class="screen-wrapper news-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content content-panel">
                        <div class="screen-title">Tin tức</div>
                        <div class="post-list" id="news-list">
                        </div>
                        <div class="posts-control">
                            <button id="prev">
                                <img src="${config.img_dir}screens/news/prev.png" alt="prev">
                            </button>
                            <button id="next">
                                <img src="${config.img_dir}screens/news/next.png" alt="next">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.firstPage();

        this._shadowRoot.getElementById('prev').onclick = () => {
            if (this._prev) {
                this.prevPage();
            }
        };
        this._shadowRoot.getElementById('next').onclick = () => {
            if (this._next) {
                this.nextPage();
            }
        };
    }

    async firstPage() {
        const first = FS.collection('news').orderBy('date').limit(4);

        const snapshot = await first.get();
        const last = snapshot.docs[snapshot.docs.length - 1];
        this._lastIndex = last.data().date;

        this._shadowRoot.getElementById('prev').style.filter = 'grayscale(100%)';
        const check = await FS.collection('news').orderBy('date').startAfter(this._lastIndex).limit(4).get();

        if (check.docs.length == 0) {
            this._shadowRoot.getElementById('next').style.filter = 'grayscale(100%)';
            this._next = false;
        } else {
            this._shadowRoot.getElementById('next').style.filter = 'none';
            this._next = true;
        }

        this.update(snapshot);
    }

    async nextPage() {
        const batch = FS.collection('news').orderBy('date').startAfter(this._lastIndex).limit(4);

        const snapshot = await batch.get();
        this._firstIndex = snapshot.docs[0].data().date;
        this._lastIndex = snapshot.docs[snapshot.docs.length - 1].data().date;
        this._prev = true;
        this._shadowRoot.getElementById('prev').style.filter = 'none';

        const check = await FS.collection('news').orderBy('date').startAfter(this._lastIndex).limit(4).get();

        if (check.docs.length == 0) {
            this._shadowRoot.getElementById('next').style.filter = 'grayscale(100%)';
            this._next = false;
        } else {
            this._shadowRoot.getElementById('next').style.filter = 'none';
            this._next = true;
        }

        this.update(snapshot);
    }

    async prevPage() {
        const batch = FS.collection('news').orderBy('date').endBefore(this._firstIndex).limit(4);

        const snapshot = await batch.get();
        this._firstIndex = snapshot.docs[0].data().date;
        this._lastIndex = snapshot.docs[snapshot.docs.length - 1].data().date;
        this._next = true;
        this._shadowRoot.getElementById('next').style.filter = 'none';

        const check = await FS.collection('news').orderBy('date').endBefore(this._firstIndex).limit(4).get();

        if (check.docs.length == 0) {
            this._shadowRoot.getElementById('prev').style.filter = 'grayscale(100%)';
            this._prev = false;
        } else {
            this._shadowRoot.getElementById('prev').style.filter = 'none';
            this._prev = true;
        }

        this.update(snapshot);
    }

    update(snapshot) {
        let result = '';
        snapshot.docs.forEach((doc) => {
            let entry = `
            <div class="post-item">
                <a href="${config.domain}#!/news/${doc.id}" class="post-img">
                    <img src="${doc.data().image_feature}" alt="post-img">
                </a>
                <div class="post-meta">
                    <a href="${config.domain}#!/news/${doc.id}" class="post-title">
                        ${doc.data().title}
                    </a>
                    <div class="post-analytics">
                        <div class="post-view"><i class="fas fa-eye"></i> ${doc.data().views} </div>
                    </div>
                </div>
            </div>`;
            result += entry;

            this._shadowRoot.getElementById('news-list').innerHTML = result;
        });
    }
}

window.customElements.define('news-screen', NewsScreen);
