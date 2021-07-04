// Verify password
export const verifyPassword = (password) => {
    const re = /(?=.*[A-Z])[a-zA-Z0-9]{6,}/;
    return re.test(String(password));
};

// SHA1 password

export const sha1 = (password) => {
    return CryptoJS.SHA1(password).toString();
};

export async function ShowNotice(title, text, urlRedirect) {
    Swal.fire({
        title: title,
        html: text,
        confirmButtonText: '',
        backdrop: false,
        target: document.querySelector('#app'),
        buttonsStyling: false,
        width: '324px',
    }).then((result) => {
        if (urlRedirect) {
            if (result.isConfirmed) {
                router.navigate(urlRedirect);
            }
        }
    });
}

export function checkLogin() {
    return localStorage.getItem('token_login');
}

export function getUid() {
    return localStorage.getItem('uid');
}

export function addTokenLogin(token) {
    localStorage.setItem('token_login', token);
}

export function addUid(token) {
    localStorage.setItem('uid', token);
}

export function removeTokenLogin() {
    localStorage.removeItem('token_login');
}

export function removeUid() {
    localStorage.removeItem('uid');
}

export async function ShowNoticeFight(title, text, urlRedirect) {
    Swal.fire({
        title: title,
        html: text,
        confirmButtonText: '',
        backdrop: false,
        target: document.querySelector('#app'),
        buttonsStyling: false,
        width: '324px',
        customClass: {
            confirmButton: 'fight-back-map',
            denyButton: 'change-pass',
            container: 'fight-notice',
        },
    }).then((result) => {
        if (urlRedirect) {
            if (result.isConfirmed) {
                router.navigate(urlRedirect);
            }
        }
    });
}
