window.router = new Navigo(null, true, '#!');

let appContainer = document.querySelector('#app-content');
let appBar = document.querySelector('#app-bar');
let appMenu = document.querySelector('#app-menu');
let appLoadingScreen = document.querySelector('#app-loading');

// Hooks
const hooks = {
    before: function (done, params) {
        setTimeout(function () {
            appLoadingScreen.classList.remove('disable');
            done();
        }, 1800);
    },
    after: function (params) {
        appLoadingScreen.classList.add('disable');
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
        hooks
    )
    .on(
        'sign-up',
        function () {
            appContainer.innerHTML = `<signup-screen class="screen-top"></signup-screen>`;
        },
        hooks
    )
    .on(
        'home',
        function () {
            appContainer.innerHTML = `<home-screen></home-screen>`;
        },
        hooks
    )
    .on('map', function () {
        console.log('map');
    })
    .on('map/:mapId', function ({ data }) {
        console.log(data);
    })
    .on(
        'news',
        function () {
            appContainer.innerHTML = `<news-screen></news-screen>`;
        },
        hooks
    )
    .on(
        'news/:id',
        function (params) {
            appContainer.innerHTML = `<news-detail-screen post-id="${params.id}"></news-detail-screen>`;
        },
        hooks
    )
    .on(
        'chat',
        function () {
            appContainer.innerHTML = `<chat-screen></chat-screen>`;
        },
        hooks
    )
    .on('monster-book', function () {
        console.log('monster book');
    })
    .on('monster-book/:monsterId', function ({ data }) {
        console.log(data);
    })
    .on('fight/:map/:monsterId', function ({ data }) {
        console.log(data);
    })
    .on('pvp', function () {
        console.log('pvp');
    })
    .on('pvp/rank', function () {
        console.log('pvp rank');
    })
    .on('pvp/:roomId', function ({ data }) {
        console.log(data);
    })
    .on('shop/', function () {
        console.log('shop');
    })
    .resolve();
