import { config } from '../../config.js';

import { BaseComponent } from '../../components/BaseComponent.js';

class NewsDetailScreen extends BaseComponent {
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
                        <div class="post-detail-content">
                            Consequat non libero pharetra totam sagittis nec accusantium dolore rutrum? Sunt velit dignissimos at proident, quibusdam imperdiet porttitor provident blanditiis. Saepe doloremque sint. Possimus ac rerum purus, consectetur aperiam cubilia! Sociis sapiente reiciendis illo ut suspendisse, irure molestiae proin, cubilia, sequi ornare, fuga voluptas reiciendis recusandae torquent sunt aliqua aliqua class ligula et molestias. 

                            Officia pulvinar nemo aut mollis quia? Quas aspernatur in, doloribus! Per distinctio! Incidunt nullam incidunt, tempora, quae condimentum, fames, incidunt porta ut turpis nibh? Accusantium dignissim. 

                            Leo? Ante, magna repudiandae? Aliquid felis! Justo dui eos perferendis voluptatibus fugit turpis 
                        </div>
                        <div class="posts-control posts-control-single">
                            <a href="${config.domain}#!/news" id="back" class="btn">
                                <img src="${config.img_dir}screens/news/back.png" alt="back">
                            </a>
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

window.customElements.define('news-detail-screen', NewsDetailScreen);
