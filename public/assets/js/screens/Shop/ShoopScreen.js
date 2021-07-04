import { config, FS } from '../../config.js';
import { getUid, ShowNotice } from '../../ultils/ultils.js';
import ItemsMonsters from '../../itemConfig.js';
import { BaseComponent } from '../../components/BaseComponent.js';
import { monstersNormal } from '../../monsterConfig.js';

class ShopScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.style_dir}common.css">
            <link rel="stylesheet" href="${config.style_dir}shop.css">
            <div class="screen-wrapper shop-wrapper screen-wrapper-bar">
                <div class="screen-main">
                    <div class="screen-content content-panel">
                        <div class="screen-title">Cửa hàng <img src="${config.img_dir}icons/icon-desc.png" class="faq"></div>
                        <div class="shop-list">
                            
                        </div>
                    </div>
                </div>
            </div>
        `;

        const itemList_el = this._shadowRoot.querySelector('.shop-list');
        const faqBtn = this._shadowRoot.querySelector('.faq');

        ItemsMonsters.forEach((item, index) => {
            itemList_el.insertAdjacentHTML(
                'beforeend',
                `
                <div class="item-wrap">
                    <div class="item-ava">
                        <img src="${config.img_dir}items/${item.image}.png">
                    </div>

                    <div class="item-meta">
                        <div class="item-title">${item.name}</div>
                        <div class="item-desc">
                            ${item.description}
                        </div>
                        <div class="item-price">
                            <img src="${config.img_dir}icons/coin.png"> ${numeral(item.price).format('0,0')}
                        </div>
                    </div>
                    <button class="btn-buy" id="item-${index}">
                        <img src="${config.img_dir}screens/shop/btn-buy.png" alt="btn-buy">
                    </button>
                </div>
            `
            );

            const btnBuy = itemList_el.querySelector('#item-' + index);
            btnBuy.onclick = async () => {
                let userData = await FS.collection('users').doc(getUid()).get();
                let userCoin = userData.data().coin;
                if (item.canBuy(userCoin)) {
                    await FS.collection('users')
                        .doc(getUid())
                        .update({
                            coin: userCoin - item.price,
                        });

                    let rewardResponse = item.reward();

                    if (rewardResponse.status) {
                        let checkMonsterInBook = await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').where('monster_index', '==', rewardResponse.monsterIndex).get();
                        console.log(rewardResponse.monsterIndex);
                        if (checkMonsterInBook.docs[0]) {
                            ShowNotice(
                                'Cảm ơn!',
                                'Bạn đã có quái vật <b>' +
                                    monstersNormal[rewardResponse.monsterIndex].name +
                                    '</b> trong <b>Sách quái vật</b> cửa hàng xin tặng bạn <b>' +
                                    numeral(item.price + item.price * 0.04).format('0,0') +
                                    '</b> coin để an ủi nha.'
                            );

                            await FS.collection('users')
                                .doc(getUid())
                                .update({
                                    coin: userCoin + item.price + item.price * 0.04,
                                });
                        } else {
                            let monsterData = monstersNormal[rewardResponse.monsterIndex];
                            ShowNotice(
                                'Chúc mừng!',
                                `<div class="item-reward-img"><img src="${config.img_dir}monsters/${monsterData.avatar}.png"></div><div class="item-reward-notice">Bạn đã nhận được quái vật <strong>${monsterData.name}</strong></div>`
                            );
                            await FS.collection('monster-templates').doc(getUid()).collection('list-monsters').add({
                                atk: monsterData.atk,
                                def: monsterData.def,
                                hp: monsterData.hp,
                                exp: 0,
                                is_battle: false,
                                level: 0,
                                monster_index: rewardResponse.monsterIndex,
                            });
                        }
                    } else {
                        ShowNotice('Hụt rồiiii!', 'Một chú may mắn nữa là bạn có được quái vật nhưng, đen thôi !!!!');
                    }
                } else {
                    ShowNotice('Mua không thành công!', 'Số coin của bạn không đủ ');
                }
            };
        });

        faqBtn.onclick = () => {
            ShowNotice(
                'Thông tin về cửa hàng',
                'Với mỗi Đá quái vật sẽ có cấp bậc tương ứng với quái vật nhận được. Mỗi loại đá sẽ có tỉ lệ nhất định. Nếu nhận được quái vật đã có trong Sách quái vật của bạn, sẽ nhận 104% số tiền bỏ ra mua đá.'
            );
        };
    }
}

window.customElements.define('shop-screen', ShopScreen);
