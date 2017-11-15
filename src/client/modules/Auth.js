const ACCESS_TOKEN = 'accessToken';

export default class Auth {
    static authenticateUser(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
    }

    static isUserAuthenticated() {
        return localStorage.getItem(ACCESS_TOKEN) !== null;
    }

    static deauthenticateUser() {
        localStorage.removeItem(ACCESS_TOKEN);
    }
    static getToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }
}