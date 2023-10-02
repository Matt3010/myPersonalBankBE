import { Model } from 'mongoose';
import { validateAmountTransferOrMobile } from './validate-amount-transfer-mobile.middleware';
import { validateBankAccountOwner } from './validate-bankAccount-owner.middleware';
import { validateModelID } from './validate-model-id.middleware';
import { validateMongoIdParam } from './validate-mongoid-param.middleware';
import { validateAmountTransaction } from './validate-amount-transaction.middleware';

const compose = require("compose-middleware").compose;

type ValidationType = "body" | "query" | "params";

export const validateId = (model: Model<any>, details: boolean = false, origin: ValidationType = 'params', param: string = 'id') => {
  return compose([
    validateMongoIdParam(param),
    validateBankAccountOwner(details, origin, param),
    validateModelID(model, origin, param),
  ]);
};

export const validateIdAndAmount = (transaction:  'Transfer' | 'Mobile' | 'Transaction', model: Model<any>, details : boolean = false, origin: ValidationType = 'params', param: string = 'id') => {
  if(transaction === 'Mobile' || transaction === 'Transfer') {
    return compose([
      validateMongoIdParam(param),
      validateBankAccountOwner(details, origin, param),
      validateModelID(model, origin, param),
      validateAmountTransferOrMobile(origin, param)
    ]);
  } else {
    return compose([
      validateMongoIdParam(param),
      validateBankAccountOwner(details, origin, param),
      validateModelID(model, origin, param),
      validateAmountTransaction(origin, param)
    ]);
  }
};
