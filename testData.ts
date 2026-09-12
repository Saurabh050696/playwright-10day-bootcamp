const environment: string = 'somevalue';
const retryCount: number = 2; // taking example value
const headless: boolean = true;

const browsers: string[] = ['Chromium', 'Firefox', 'WebKit'];

export interface User {
    username: string;
    password: string;
    isLocked: boolean;
    tag: string;
}

export const users: User[] = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        isLocked: false,
        tag: '@smoke'
    },
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        isLocked: true,
        tag: '@regression'
    }
];