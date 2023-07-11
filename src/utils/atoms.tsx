import { atom } from "recoil";

export const loginState = atom({
    key: 'loginState',
    default: {
        state: false,
        id: -1,
        name: 'atom',
        info: null,
        email: null,
        token: null,
        department: '부서 0'
    }
});