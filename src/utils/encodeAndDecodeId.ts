import { ALPHABET, ENCODE_BASE } from './codingConstant';

export const encodeId = (id: number) => {
  let currentId = id;
  let encodedId = '';

  while (currentId > 0) {
    encodedId = ALPHABET.charAt(currentId % ENCODE_BASE) + encodedId;
    currentId = Math.floor(currentId / ENCODE_BASE);
  }

  return encodedId;
};

export const encodedIdWithCheckSum = (id: number) => {
  return generateCheckSum(id) + encodeId(id);
};

export const decodeId = (checkSumId: string) => {
  const encodedId = checkSumId.substring(2);
  let id = 0;

  for (var i = 0; i < encodedId.length; i++) {
    id = id * ENCODE_BASE + ALPHABET.indexOf(encodedId.charAt(i));
  }

  return id;
};

const generateCheckSum = (id: number) => {
  const checkSumValue = (id * 17 + 31) % (ENCODE_BASE * ENCODE_BASE);

  return encodeId(checkSumValue).padStart(2, ALPHABET.charAt(0));
};
