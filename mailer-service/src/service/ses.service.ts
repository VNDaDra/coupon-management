import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2';
import { AwsCredentialIdentity } from '@aws-sdk/types';
import {
   Injectable,
   Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SimpleEmailService {
   private readonly logger = new Logger(SimpleEmailService.name);
   private readonly FROM_ADDRESS: string;
   private readonly REGION: string;
   private readonly sesClient: SESv2Client;
   private readonly credentials: AwsCredentialIdentity;

   constructor(
      private readonly configService: ConfigService,
   ) {
      this.FROM_ADDRESS = configService.get<string>('aws.domain', '');
      this.REGION = configService.get<string>('aws.region', 'ap-southeast-1');
      this.credentials = {
         accessKeyId: configService.get<string>('aws.key', ''),
         secretAccessKey: configService.get<string>('aws.secret', ''),
      };

      this.sesClient = new SESv2Client({
         region: this.REGION,
         credentials: this.credentials,
      });
   }

   async sendAnEmail(emailContent: string, toAddresses: string[]) {
      try {
         const command = new SendEmailCommand({
            FromEmailAddress: this.FROM_ADDRESS,
            Destination: {
               ToAddresses: toAddresses,
            },
            Content: {
               Simple: { // Message
                  Subject: { // Content
                     Data: "COUPON MANAGEMENT", // required
                     Charset: "UTF-8",
                  },
                  Body: {
                     Html: {
                        Data: emailContent, // required
                        Charset: "UTF-8",
                     },
                  },
               },
            },
         });
         this.sesClient.send(command);
         
      } catch (error) {
         this.logger.error('sendAnEmail', error);
      }
   }

}
