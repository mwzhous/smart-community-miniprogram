import http from "../utils/http";
// 登录模块
const port = '8089/api/'

// 第三方登录
export function ddLogin() {
    http.get(port + 'dd/render')
}
// 获取验证码
export function getCode(params) {
    return http.get(port + "code", params);
}

// 验证码登录
export function login(params) {
    return http.post(port + "phone/login", params, 'json');
}

// 账号密码登录
export function accountLogin(params) {
    return http.post(port + "account/login", params, 'json');
}

// 重置密码&&绑定密码
export function ChangePassword(params) {
    return http.post(port + "password/reset", params, 'json')
}

// 获取个人中心登录用户
export function getUser() {
    return http.get(port + "info");
}
