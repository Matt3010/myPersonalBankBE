import { genericErrorHandler } from "./generic";
import { noFundsHandler } from "./no-founds";
import { notFoundHandler } from "./not-found";
import { validationErrorHandler } from "./validation";

export const errorHandlers = [notFoundHandler, noFundsHandler, validationErrorHandler, genericErrorHandler];