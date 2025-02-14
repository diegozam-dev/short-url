import { ALPHABET, ENCODE_BASE } from './constants';

export const encodeId = (id: number) => {
  let encodedId = '';

  while (id > 0) {
    encodedId = ALPHABET.charAt(id % ENCODE_BASE) + encodedId;
    id = Math.floor(id / ENCODE_BASE);
  }

  return encodedId;
};

export const decodeId = (encodedId: string) => {
  let id = 0;

  for (var i = 0; i < encodedId.length; i++) {
    id = id * ENCODE_BASE + ALPHABET.indexOf(encodedId.charAt(i));
  }

  return id;
};
