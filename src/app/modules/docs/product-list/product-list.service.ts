import { Injectable } from '@angular/core';
import { Product } from './product-model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductListService {

    constructor() { }

    getProducts(): Product[] {
        return [
            {
                id: this.getUUID(),
                name: 'Spigen Liquid Air Back Cover Case Designed for iPhone 11 - Black',
                brand: 'Spigen',
                description: 'Slim, form-fitted and lightweight. Form-fitted to maintain a slim profile and pocket-friendly. Anti-slip matte surface gives fingerprint-resistance and comfort in every grip. Mil-Grade protection and Air Cushion Technology for anti-shock protection. Compatible with iPhone 11.',
                price: 999,
                imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/6102vxfmeyL._SL1000_.jpg'
            },
            {
                id: this.getUUID(),
                name: 'boAt Rockerz 255 Sports in-Ear Bluetooth Neckband Earphone with Mic (Active Black)',
                brand: 'Boat',
                description: 'Battery: Rockerz 255 offers a playback time of up to 6 hours and gets charged to 100% in 1.5 hours. Bluetooth: It has Bluetooth v4.1 with a range of 10m and is compatible with Android & iOS. IPX rating: It has an IPX5 marked water & sweat resistance. ANC: NA. Talktime 6 hours. Standby Time 150 hours. No. of Mic: 1. Other Inclusions: Additional Earmuffs, Micro USB Charging Cable, Warranty Card, User Manual. Sports friendly design with Easy Controls. Instant Voice Assistant',
                price: 1399,
                imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61ku39qVEzL._SL1500_.jpg'
            },
            {
                id: this.getUUID(),
                name: 'ELV Car Mount Adjustable Car Phone Holder Universal Long Arm, Windshield for Smartphones - Black',
                brand: 'Elv',
                description: 'ELV Easy one touch mounting system locks and releases the device with just a push of a finger, Two step locking lever provides additional mounting support for multiple surfaces. Redesigned bottom foot ensures access to all your device ports. Super sticky gel pad sticks securely to most surfaces (including textured surfaces),Yet is still removable. Fully adjuestable with 360 degree rotation for quick portrait and landscape views, TELESCOPIC ARM New telescopic arm adds 2 inches to allow for closer device viewing.',
                price: 349,
                imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61sCL37xvlL._SL1080_.jpg'
            },
            {
                id: this.getUUID(),
                name: 'HP X1000 Wired Mouse (Black/Grey)',
                brand: 'HP',
                description: '3 buttons improve productivity. Optical sensor works on most surfaces. The sleek and modern HP Mouse X1000 adds an instant touch of trend-setting style to any work space. Glossy black and metallic gray shine with sophistication. 1 year warranty',
                price: 319,
                imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61mucoT%2BifL._SL1500_.jpg'
            },
            {
                id: this.getUUID(),
                name: 'Mi 10000mAH Li-Polymer Power Bank 3i with 18W Fast Charging (Midnight Black)',
                brand: 'MI',
                description: 'It will charge a 3000mAh phone battery 2.1 times and It will charge a 4000mAh phone battery 1.4 times. Body : Metal Frame | Weight : 251 grams. Output: Double USB output 9V|2A, 5.1|2.4A, 12V|1.5A, Upto 18 Watts Fast Charge. Warranty : 6 months domestic warranty. Time to Recharge - Approx 4.5 hours (18 W- 9V/2A charger, standard USB cable) OR Approx 6 hours( 10-5V/2A charger, standard USB cable). Included in box: 1 Micro USB Cable, 1 User Manual and 1 Power Bank (Charger not included)',
                price: 899,
                imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71Rcb9pnbEL._SL1500_.jpg'
            }
        ];
    }

    getUUID(): string {
        return uuidv4();
    }
}