import StorageService from "../services/Storage.service";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const requireLogin = (to: { meta: { auth: boolean; }; }, from: any, next: { (): void; redirect: (arg0: string) => void; }) => {
    console.log("Yes in if")
    if (to.meta.auth) {
        const authenticated = JSON.parse(StorageService.getCookies('user'));
        console.log(authenticated.accessToken)
        if (authenticated) {
            next();
        }
        next.redirect('/dashboard');
    } else if (!to.meta.auth) {
        console.log("Yes in")
        const authenticated = JSON.parse(StorageService.getCookies('user'));
        console.log(authenticated)
        console.log(authenticated.accessToken)
        if (authenticated) {
            next.redirect('/login');
        }
        next();
    } else {
        next();
    }
};