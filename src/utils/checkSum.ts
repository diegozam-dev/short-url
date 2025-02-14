import { encodeId, decodeId } from './encoding';
import { ALPHABET, ENCODE_BASE } from './constants';
import { createHmac } from 'node:crypto';
import { CHECKSUM_KEY } from '../config';

export const createCheckSum = (id: number) => {
  const hash = createHmac('sha256', CHECKSUM_KEY || 'my secret key')
    .update(id.toString())
    .digest('hex');

  const checkSumValue =
    parseInt(hash.slice(0, 4), 16) % (ENCODE_BASE * ENCODE_BASE);

  return encodeId(checkSumValue).padStart(2, ALPHABET.charAt(0));
};

export const encodedIdWithCheckSum = (id: number) => {
  return createCheckSum(id) + encodeId(id);
};

export const decodeIdWithCheckSum = (checkSumId: string) => {
  return decodeId(checkSumId.slice(2));
};

export const isValidCheckSum = (checkSumId: string) => {
  const id = decodeIdWithCheckSum(checkSumId);
  return checkSumId.startsWith(createCheckSum(id));
};
