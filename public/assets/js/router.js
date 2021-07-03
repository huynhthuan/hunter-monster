import { checkLogin } from './ultils/ultils.js';

window.router = new Navigo(null, true, '#!');

let appContainer = document.querySelector('#app-content');
let appLoadingScreen = document.querySelector('#app-loading');
let appUserBar = document.querySelector('#app-bar');
let appMenuBar = document.querySelector('#app-menu');

function addBar() {
    appUserBar.innerHTML = '<user-bar></user-bar>';
    appMenuBar.innerHTML = '<menu-bar></menu-bar>';
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

// Not found
window.router.notFound(() => {
    console.log('not found');
});

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
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'map',
        function () {
            addBar();
            appContainer.innerHTML = `<map-screen></map-screen>`;
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'map/:id',
        function (params) {
            addBar();
            appContainer.innerHTML = `<map-detail-screen map_id="${params.id}"></map-detail-screen>`;
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'map/:id/fight/:monster',
        function (params) {
            hideBar();
            appContainer.innerHTML = `<map-fight-screen map_id="${params.id}" map_monster="${params.monster}"></map-fight-screen>`;
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'news',
        function () {
            addBar();
            appContainer.innerHTML = `<news-screen></news-screen>`;
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
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'monster-book',
        function () {
            addBar();
            appContainer.innerHTML = `<monster-book-screen></monster-book-screen>`;
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'monster-book/:id',
        function (params) {
            addBar();
            appContainer.innerHTML = `<monster-book-detail-screen id="${params.id}"></monster-book-detail-screen>`;
        },
        hooksRedirectIfNotLogin
    )
    .on(
        'pvp',
        function () {
            addBar();
            appContainer.innerHTML = `<pvp-screen></pvp-screen>`;
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
        },
        hooksRedirectIfNotLogin
    )
    .resolve();
