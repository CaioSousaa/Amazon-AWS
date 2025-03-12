export function validateCPF(cpf: string): boolean {
  let sum = 0;
  let remainder: number;

  const sanitizedCPF = cpf.replace(/\D/g, '');

  if (sanitizedCPF.length !== 11) return false;

  if (
    [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ].includes(sanitizedCPF)
  ) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(sanitizedCPF[i - 1]) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(sanitizedCPF[9])) return false;

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(sanitizedCPF[i - 1]) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  return remainder === parseInt(sanitizedCPF[10]);
}
