import isMyJsonValid from 'is-my-json-valid';
import schema from '../schema.json';

export const validate = isMyJsonValid(schema);
export const filter = isMyJsonValid.filter(schema);
