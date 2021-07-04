import ItemMonster from './database/Items/ItemMonster.js';

const ItemsMonsters = [
    new ItemMonster('Đá quái vật bậc D', 'item-1', '100% cơ hội nhận được quái vật bậc D', 5000, [0, 1, 5, 3, 6, 4, 7, 9], 100),
    new ItemMonster('Đá quái vật bậc C', 'item-2', '80% cơ hội nhận được quái vật bậc C', 40000, [0, 1, 5, 3, 6, 4, 7, 9], 80),
    new ItemMonster('Đá quái vật bậc B', 'item-3', '50% cơ hội nhận được quái vật bậc B', 250000, [0, 1, 5, 3, 6, 4, 7, 9], 50),
    new ItemMonster('Đá quái vật bậc A', 'item-4', '10% cơ hội nhận được quái vật bậc A', 500000, [0, 1, 5, 3, 6, 4, 7, 9], 10),
    new ItemMonster('Đá quái vật bậc S', 'item-5', '1% cơ hội nhận được quái vật bậc S', 1000000, [0, 1, 5, 3, 6, 4, 7, 9], 1),
];

export default ItemsMonsters;
