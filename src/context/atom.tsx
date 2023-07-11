import { atom } from "recoil";

export const loginState = atom({
    key: "loginState",
    default: {
        state :false,
        name: null,
        info: null,
        email: null,
        token: null
    }
});
