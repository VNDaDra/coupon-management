export enum ClaimStatus {
   SUCCESS = 'success',
   FAIL = 'fail',
}

export enum ClaimFailReason {
   NONE = '',
   INVALID_COUPON_CODE = 'claim_coupon_invalid_code',
   INVALID_USER = 'claim_coupon_invalid_user',
   ALREADY_CLAIMED = 'claim_coupon_already_claimed',
   OUT_OF_STOCK = 'claim_coupon_out_of_stock',
}
