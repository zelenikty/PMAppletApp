import { environment } from '../../environments/environment';

export const apiUrl = environment.apiUrl;
export const constType = { buy: 'buy', sell: 'sell' };
export const tabType = {
    contractData: 'contractData',
    outputControl: 'outputcontrol',
    paymentDelivery: 'paymentDelivery',
    text: 'text',
    tax: 'tax',
    notes: 'notes',
    references: 'references',
    technicalInfos: 'technicalInfos',
    repetition: 'repetition',
    prevention: 'prevention'
};
export const actionStateType = { check: 'check', save: 'save', reset: 'reset' };
export const pageType = { display: 'display' };
export const enteredResultType = { success: 'success', cancel: 'cancel' };
export const tabTypIds = {
    contractData: 1,
    paymentDelivery: 2,
    text: 3,
    outputControl: 4,
    tax: 5,
    references: 6,
    notes: 7,
    techInfos: 8,
    repitition: 9,
    prevention: 10
};
