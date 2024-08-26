import { HttpHeaders } from "@angular/common/http";

function getCsrfToken(): string | null {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

export function getHeaders(): HttpHeaders {
    const csrfToken = getCsrfToken();
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || ''
    });
}
