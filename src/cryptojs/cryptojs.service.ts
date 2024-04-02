import { Injectable } from '@nestjs/common';
import { AES as crypto, enc } from 'crypto-js';

@Injectable()
export class CryptojsService {
  encrypt(str: string, key: string) {
    return crypto
      .encrypt(str, key, { iv: enc.Utf8.parse('asdasdasdasdas') })
      .toString();
  }

  decrypt(str: string, key: string) {
    return crypto
      .decrypt(str, key, { iv: enc.Utf8.parse('asdasdasdasdas') })
      .toString(enc.Utf8);
  }
}
