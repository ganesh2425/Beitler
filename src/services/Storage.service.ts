import Cookies from 'js-cookie';

export interface cookiesData {
    access_token: string;
    expires_in: string;
    refresh_token: any;
}

export default class StorageService {
    static cookies: any = Cookies;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static setCookies(key: string, data: any) {
        this.cookies.set(key, data);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static getCookies(key: string) {
        return this.cookies.get(key);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static isSignedIn() {
        const token: string = this.cookies.get('token');
        return token;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static clearCookies() {
        const cookies = this.cookies.get();
        for (const key in cookies) {
            this.cookies.remove(key);
        }
    }
}
