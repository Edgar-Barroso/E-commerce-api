import { Cpf } from "@/domain/entity/Cpf";

describe('Cpf', () => {
  test('deve criar uma instância válida de CPF', () => {
    const cpf = new Cpf('12345678909');
    expect(cpf.value).toBe('12345678909');
  });

  test('deve lançar um erro ao criar uma instância inválida de CPF', () => {
    expect(() => new Cpf('12345678901')).toThrow('Invalid cpf');
  });

  test('deve validar corretamente um CPF válido', () => {
    const cpf = new Cpf('12345678909');
    expect(cpf.validate(cpf.value)).toBe(true);
  });

  test('deve retornar falso para um CPF inválido', () => {
    const cpf = new Cpf('12345678909');
    expect(cpf.validate('12345678901')).toBe(false);
  });
});
