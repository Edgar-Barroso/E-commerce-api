export class Cpf{
    #value:string;

    constructor(value:string){
        if(!this.validate(value)) throw new Error("Invalid cpf")
        this.#value = value
    }

    get value(){
        return this.#value
    }

    validate(cpf: string): boolean {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cpf)) return false;
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