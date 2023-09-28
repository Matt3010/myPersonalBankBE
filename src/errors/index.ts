import { genericErrorHandler } from "./generic";
import { noFundsHandler } from "./no-funds";
import { notFoundHandler } from "./not-found";
import { validationErrorHandler } from "./validation";

export const errorHandlers = [notFoundHandler, noFundsHandler, validationErrorHandler, genericErrorHandler];