import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional } from "class-validator";

export class GetClaimableCouponQuery {
   @IsEmail()
   email: string;

   @IsNumber()
   @Type(() => Number)
   skip: number;

   @IsNumber()
   @Type(() => Number)
   limit: number;
}

export class GetAllCouponQuery {
   @IsNumber()
   @Type(() => Number)
   skip: number;

   @IsNumber()
   @Type(() => Number)
   limit: number;
}