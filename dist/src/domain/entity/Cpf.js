"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Cpf_value;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpf = void 0;
class Cpf {
    constructor(value) {
        _Cpf_value.set(this, void 0);
        if (!this.validate(value))
            throw new Error("Invalid cpf");
        __classPrivateFieldSet(this, _Cpf_value, value, "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _Cpf_value, "f");
    }
    validate(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11)
            return false;
        if (/^(\d)\1{10}$/.test(cpf))
            return false;
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador = resto > 9 ? 0 : resto;
        if (digitoVerificador !== parseInt(cpf.charAt(9))) {
            return false;
        }
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        digitoVerificador = resto > 9 ? 0 : resto;
        if (digitoVerificador !== parseInt(cpf.charAt(10))) {
            return false;
        }
        return true;
    }
}
exports.Cpf = Cpf;
_Cpf_value = new WeakMap();
