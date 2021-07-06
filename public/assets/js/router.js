import { checkLogin, getMonsterBattle, ShowNotice } from './ultils/ultils.js';
import { config } from './config.js';

window.router = new Navigo(null, true, '#!');

let appContainer = document.querySelector('#app-content');
let appLoadingScreen = document.querySelector('#app-loading');
let appUserBar = document.querySelector('#app-bar');
let appMenuBar = document.querySelector('#app-menu');
let audioBackground = document.querySelector('#audiobackground');

function addBar() {
    appMenuBar.innerHTML = '<menu-bar></menu-bar>';
    appUserBar.innerHTML = '<user-bar></user-bar>';
    appUserBar.classList.remove('disable');
    appMenuBar.classList.remove('disable');
}

function hideBar() {
    appUserBar.classList.add('disable');
    appMenuBar.classList.add('disable');
}

// Hooks
const hooks = {
    before: function (done, params) {
        appLoadingScreen.classList.remove('disable');
        setTimeout(function () {
            done();
        }, 1300);
    },
    after: function (params) {
        setTimeout(function () {
            appLoadingScreen.classList.add('disable');
        }, 1000);
    },
    leave: function (params) {
        appLoadingScreen.classList.remove('disable');
    },
};

const hooksRedirectIfLogin = {
    before: function (done, params) {
        appLoadingScreen.classList.remove('disable');

        if (checkLogin()) {
            router.navigate('/home');
        } else {
            setTimeout(function () {
                done();
            }, 1300);
        }
    },
    after: function (params) {
        setTimeout(function () {
            appLoadingScreen.classList.add('disable');
        }, 1000);
    },
    leave: function (params) {
        appLoadingScreen.classList.remove('disable');
    },
};

const hooksRedirectIfNotLogin = {
    before: function (done, params) {
        appLoadingScreen.classList.remove('disable');
        if (!checkLogin()) {
            router.navigate('/login');
        } else {
            setTimeout(function () {
                done();
            }, 1300);
        }
    },
    after: function (params) {
        setTimeout(function () {
            appLoadingScreen.classList.add('disable');
        }, 1000);
    },
    leave: function (params) {
        appLoadingScreen.classList.remove('disable');
    },
};

const checkMonsterBattle = {
    before: function (done, params) {
        appLoadingScreen.classList.remove('disable');
        if (!checkLogin()) {
            router.navigate('/login');
        } else if (getMonsterBattle() > 1 || getMonsterBattle() == 0) {
            ShowNotice('Thông báo', 'Bạn chỉ được phép có <b>1 quái vật</b> ở trạng thái chiến đấu! Hãy vào <b>Sách quái vật</b> và chọn duy nhất 1 quái vật ở trạng thái <b>tham chiến</b>', '/home');
        } else {
            setTimeout(function () {
                done();
            }, 1300);
        }
    },
    after: function (params) {
        setTimeout(function () {
            appLoadingScreen.classList.add('disable');
        }, 1000);
    },
    leave: function (params) {
        appLoadingScreen.classList.remove('disable');
    },
};

// Loading
window.router
    .on(
        '/',
        function () {
            router.navigate('/login');
        },
        hooks
    )
    .on(
        'login',
        function () {
            appContainer.innerHTML = `<login-screen class="screen-top"></login-screen>`;
        },
        hooksRedirectIfLogin
    )
    .on(
        'sign-up',
        function () {
            appContainer.innerHTML = `<signup-screen class="screen-top"></signup-screen>`;
        },
        hooksRedirectIfLogin
    )
    .on(
        'home',
        function () {
            addBar();
            appContainer.innerHTML = `<home-screen></home-screen>`;
            audioBackground.src = `${config.audio_dir}main.mp3`;
            audioBackground.play();
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'map',
        function () {
            addBar();
            appContainer.innerHTML = `<map-screen></map-screen>`;
        },
        checkMonsterBattle
    )
    .on(
        'map/:id',
        function (params) {
            addBar();
            appContainer.innerHTML = `<map-detail-screen map_id="${params.id}"></map-detail-screen>`;
            audioBackground.src = `${config.audio_dir}map/map${params.id}.mp3`;
            audioBackground.play();
        },
        checkMonsterBattle
    )
    .on(
        'map/:id/fight/:monster',
        function (params) {
            hideBar();
            appContainer.innerHTML = `<map-fight-screen map_id="${params.id}" map_monster="${params.monster}"></map-fight-screen>`;
            audioBackground.src = `${config.audio_dir}map-fight/map${params.id}.mp3`;
            audioBackground.play();
        },
        checkMonsterBattle
    )
    .on(
        'news',
        function () {
            addBar();
            appContainer.innerHTML = `<news-screen></news-screen>`;
            audioBackground.src = `${config.audio_dir}news.mp3`;
            audioBackground.play();
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'news/:id',
        function (params) {
            addBar();
            appContainer.innerHTML = `<news-detail-screen post-id="${params.id}"></news-detail-screen>`;
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'chat',
        function () {
            addBar();
            appContainer.innerHTML = `<chat-screen></chat-screen>`;
            audioBackground.src = `${config.audio_dir}chat.mp3`;
            audioBackground.play();
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'monster-book',
        function () {
            addBar();
            appContainer.innerHTML = `<monster-book-screen></monster-book-screen>`;
            audioBackground.src = `${config.audio_dir}monsterbook.mp3`;
            audioBackground.play();
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'monster-book/:id',
        function (params) {
            addBar();
            appContainer.innerHTML = `<monster-book-detail-screen monster_id="${params.id}"></monster-book-detail-screen>`;
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'pvp',
        function () {
            addBar();
            appContainer.innerHTML = `<pvp-screen></pvp-screen>`;
            audioBackground.src = `${config.audio_dir}pvp.mp3`;
            audioBackground.play();
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'pvp/rank',
        function () {
            addBar();
            appContainer.innerHTML = `<pvp-rank-screen></pvp-rank-screen>`;
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'pvp/:roomId',
        function (params) {
            addBar();
            console.log(params);
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'shop/',
        function () {
            addBar();
            appContainer.innerHTML = `<shop-screen></shop-screen>`;
            audioBackground.src = `${config.audio_dir}shop.mp3`;
            audioBackground.play();
        },
        hooksRedirectIfNotLogin
    )
    .resolve();

// Not found
window.router.notFound(function () {
    if (!checkLogin()) {
        router.navigate('/login');
    } else {
        router.navigate('/home');
    }
}, hooks);
