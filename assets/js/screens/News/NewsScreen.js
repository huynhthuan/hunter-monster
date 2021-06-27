import config from '../../config.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class NewsScreen extends BaseComponent {
    constructor() {
        super();
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
                        <div class="post-list">
                            <div class="post-item">
                                <a href="${config.domain}#!/news/1" class="post-img">
                                    <img src="${config.img_dir}news/post-1.png" alt="post-img">
                                </a>
                                <div class="post-meta">
                                    <a href="${config.domain}#!/news/1" class="post-title">
                                       Dui? Beatae eaque curae quos elit amet? Reiciendis explicabo fugiat quos eget, etiam dicta,
                                    </a>
                                    <div class="post-analytics">
                                        <div class="post-view"><i class="fas fa-eye"></i> 15000</div>
                                    </div>
                                </div>
                            </div>
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

window.customElements.define('news-screen', NewsScreen);
