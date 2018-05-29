const isTypeOf = (value: any, type: string): boolean => typeof value === type;

export const isBoolean = (value: any): boolean => isTypeOf(value, 'boolean');
export const isFunction = (value: any): boolean => isTypeOf(value, 'function');
export const isNumber = (value: any): boolean => isTypeOf(value, 'number');
export const isObject = (value: any): boolean => isTypeOf(value, 'object');
export const isString = (value: any): boolean => isTypeOf(value, 'string');
export const isSymbol = (value: any): boolean => isTypeOf(value, 'symbol');
export const isUndefined = (value: any): boolean => isTypeOf(value, 'undefined');