import { Model } from 'mongoose';
import { validateModelID } from './validate-model-id.middleware';
import { validateMongoIdParam } from './validate-mongoid-param.middleware';
import { validateAmount } from './validate-amount.middleware copy';

const compose = require("compose-middleware").compose;

type ValidationType = "body" | "query" | "params";

export const validateId = (model: Model<any>, origin: ValidationType = 'params', param: string = 'id') => {
  return compose([
    validateMongoIdParam(param),
    validateModelID(model, origin, param),
  ]);
};

export const validateIdAndAmount = (model: Model<any>, origin: ValidationType = 'params', param: string = 'id') => {
  return compose([
    validateMongoIdParam(param),
    validateModelID(model, origin, param),
    validateAmount(model, origin, param)
  ]);
};


