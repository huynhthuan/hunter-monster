const domain = '';

const config = {
    domain: domain,
    img_dir: domain + '/assets/img/',
    style_dir: domain + '/assets/css/',
    js_dir: domain + '/assets/js/',
    upload_dir: domain + '/assets/uploads/',
};

let firebaseConfig = {
    apiKey: 'AIzaSyA9CyqReZBPcE4Q-ZSAiH75WfwkpV1fDLU',
    authDomain: 'huntermonster-2714.firebaseapp.com',
    projectId: 'huntermonster-2714',
    storageBucket: 'huntermonster-2714.appspot.com',
    messagingSenderId: '608945541659',
    databaseURL: 'https://huntermonster-2714.firebaseio.com',
    appId: '1:608945541659:web:4090c1d7cce1acc3af5ebe',
};

firebase.initializeApp(firebaseConfig);

let FS = firebase.firestore();
let AU = firebase.auth();

export { config, FS, AU };
