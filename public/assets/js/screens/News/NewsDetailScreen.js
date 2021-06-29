import { config, FS } from '../../config.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class NewsDetailScreen extends BaseComponent {
    constructor() {
        super();
        this._postId = this.getAttribute('post-id');
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}news.css">
            <div class="screen-wrapper news-wrapper screen-wrapper-bar">
                <div class="screen-main">
                     <div class="screen-content content-panel" id="screen"></div>
                </div>
            </div>
        `;

        this.content();
    }

    async content() {
        const content = await FS.collection('news').doc(this._postId);
        const news = await content.get();
        let view = news.data().views + 1;

        content.update({
            views: view,
        });

        this._shadowRoot.getElementById('screen').innerHTML = `
        <div class="post-item">
            <a href="${config.domain}#!/news/${this._postId}" class="post-img">
                <img src="${news.data().image_feature}" id="post-img" alt="post-img">
            </a>
            <div class="post-meta">
                <a href="${config.domain}#!/news/1" class="post-title" id="post-title">
                    ${news.data().title}
                </a>
                <div class="post-analytics">
                    <div class="post-view" id="post-view"><i class="fas fa-eye"></i> ${view}</div>
                </div>
            </div>
        </div>
        <div class="post-detail-content" id="post-content">
            ${news.data().content}
        </div>
        <div class="posts-control posts-control-single">
            <a href="${config.domain}#!/news" id="back" class="btn">
                <img src="${config.img_dir}screens/news/back.png" alt="back">
            </a>
        </div>`;
    }
}

window.customElements.define('news-detail-screen', NewsDetailScreen);
