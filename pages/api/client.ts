import { HolodexApiClient } from 'holodex.js';

export const client = new HolodexApiClient({apiKey: process.env.HOLODEX_API!})