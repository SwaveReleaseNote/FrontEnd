import { atom } from "recoil";

// export const loginState = atom({
//     key: "loginState",
//     default: {
//         state :false,
//         img: null,
//         name: null,
//         info: null,
//         email: null,
//         token: null
//     }
// });

/**
 * 사이드바에 해당하는 내용이다
 * 프로젝트 리스트, 릴리즈노트 리스트
 */
export const sideBarState = atom({
    key: 'sideBarState',
    default: {
        projectList : [],
        releaseNoteList : []
    }
});