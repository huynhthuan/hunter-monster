window.router = new Navigo(null, true, '#!');

let appContainer = document.querySelector('#app-content');
let appBar = document.querySelector('#app-bar');
let appMenu = document.querySelector('#app-menu');
let appLoadingScreen = document.querySelector('#app-loading');

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
    .on(
        'map',
        function () {
            appContainer.innerHTML = `<map-screen></map-screen>`;
        },
        hooks
    )
    .on('map/:id', function ({ params }) {
        console.log(params.id);
    })
    .on('map/fight/:id', function ({ params }) {
        console.log(params.id);
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
