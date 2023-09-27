import bankAccountService from "../api/bankAccount/bankAccount.service";

export function generateUniqueITIban(): string {
  const countryCode = "IT";
  const controlDigits = "00";
  const bankIdentifier = "L23H5";
  const accountNumber = generateRandomAccountNumber(); 
  const iban = `${countryCode}${controlDigits}${bankIdentifier}${accountNumber}`;

  return iban;
}

function generateRandomAccountNumber(): string {
  let accountNumber = "";
  for (let i = 0; i < 14; i++) {
    accountNumber += Math.floor(Math.random() * 10);
  }
  return accountNumber;
}
