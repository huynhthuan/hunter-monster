// Verify password
export const verifyPassword = (password) => {
    const re = /^(?=.*[A-Z]) [a-zA-Z0-9]{6,}$/;
    return re.test(String(password));
};

// SHA1 password

export const sha1 = (password) => {
    return CryptoJS.SHA1(password).toString();
};

export async function ShowNotice(title, text, urlRedirect) {
    Swal.fire({
        title: title,
        text: text,
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

export function addTokenLogin(token) {
    localStorage.setItem('token_login', token);
}

export function removeTokenLogin() {
    localStorage.removeItem('token_login');
}
