import { customAlphabet } from 'nanoid/async';

const nanoId = customAlphabet('1234567890abcdef', 12);

export async function generateCouponCode(): Promise<string> {
   return (await nanoId()).toUpperCase();
}
