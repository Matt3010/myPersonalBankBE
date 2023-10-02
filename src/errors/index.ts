import { castMongoIdHandler } from "./cast-error";
import { genericErrorHandler } from "./generic";
import { noFundsHandler } from "./no-funds";
import { notFoundHandler } from "./not-found";
import { IdRequiredHandler } from "./required-id.error";
import { validationErrorHandler } from "./validation";

export const errorHandlers = [notFoundHandler, castMongoIdHandler, noFundsHandler, IdRequiredHandler, validationErrorHandler, genericErrorHandler];