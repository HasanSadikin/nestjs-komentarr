import { Injectable } from '@nestjs/common';
import { generate } from 'otp-generator';

@Injectable()
export class OtpService {
  generateOtp() {
    return generate(16, {
      lowerCaseAlphabets: true,
      digits: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
  }
}
