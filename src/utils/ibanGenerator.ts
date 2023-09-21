import bankAccountService from "../api/bankAccount/bankAccount.service";

export function generateUniqueITIban(): string {
    const countryCode = "IT";
    let iban: string;
    
    do {
      iban = countryCode;
      for (let i = 0; i < 25; i++) {
        iban += Math.floor(Math.random() * 10);
      }
    } while (!bankAccountService.isIbanUnique(iban));
  
    return iban;
  }