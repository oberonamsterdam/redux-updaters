// @flow

import snakeCase from 'snake-case/snake-case';
import { ACTION_PREFIX } from './createReducer';

export const actionName = (action: string, stateKey: string) =>
    ACTION_PREFIX + action + '_' + snakeCase(stateKey).toUpperCase();

export default (action: string, stateKey: string, value: any) => ({
    type: actionName(action, stateKey),
    meta: {
        path: stateKey,
    },
    payload: value,
});