import axios from 'axios';
import pdfjs from 'pdfjs-dist';
import { Car, CarModel, Dealer } from './models'; 

const headers = {
  'cache-control': 'no-cache',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'sec-gpc': '1',
  'sec-fetch-site': 'none',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-user': '?1',
  'sec-fetch-dest': 'document',
  'accept-language': 'en-US,en;q=0.9',
  'kiaws-api-key': '15724294-592e-4067-93af-515da5d1a5f2',
  'origin': 'https://www.kia.com',
  'Referer': 'https://www.kia.com/',
  'dnt': '1',
};

async function scrapeVin(vin: string): Promise<[Car, Dealer, CarModel]> {
  const MODEL = 'MODEL/OPT.CODE';
  const EXT_COLOR = 'EXTERIOR COLOR';
  const INT_COLOR = 'INTERIOR COLOR';
  const VIN = 'VEHICLE ID NUMBER';
  const PORT = 'PORT OF ENTRY';
  const SOLD_TO = 'Sold To';
  const SHIP_TO = 'Ship To';
  const url = `https://prod.idc.kia.us/sticker/find/${vin}`;
  const MODEL_YEAR = 'TELLURIDE';

  const response = await axios.get(url, { headers, responseType: 'arraybuffer' });
  const pdfData = new Uint8Array(response.data);
  const pdfDocument = await pdfjs.getDocument({ data: pdfData }).promise;
  const page = await pdfDocument.getPage(1);
  const content = await page.getTextContent();
  const pdfText = content.items.map(item => item).join(' ');

  let start = 0;
  let end = pdfText.indexOf(MODEL_YEAR);
  const modelYear = parseInt(pdfText.substring(start, end));
  end = pdfText.indexOf(MODEL);
  const carDescription = pdfText.substring(start, end);

  start = end + MODEL.length + 1;
  end = pdfText.indexOf(EXT_COLOR);
  const vinCode = pdfText.substring(start, end).split('/').map(x => x.trim());
  const modelCode = vinCode[0];
  const optCode = vinCode[1];

  start = end + EXT_COLOR.length + 1;
  end = pdfText.indexOf(INT_COLOR);
  const extColor = pdfText.substring(start, end);

  start = end + INT_COLOR.length + 1;
  end = pdfText.indexOf(VIN);
  const intColor = pdfText.substring(start, end);

  start = end + VIN.length + 1;
  end = pdfText.indexOf(PORT);
  vin = pdfText.substring(start, end);

  start = pdfText.indexOf(SOLD_TO) + SOLD_TO.length + 2;
  end = pdfText.indexOf(SHIP_TO);
  const soldTo = pdfText.substring(start, end);
  
  start = end + SHIP_TO.length + 2;
  end = start + 5;
  const shipTo = pdfText.substring(start, end);
  const dealerAddress = soldTo.replace(shipTo, '');
  const zip = dealerAddress.slice(dealerAddress.length - 5);
  
  const car = new Car(0, vin, extColor, intColor, carDescription, optCode, shipTo, soldTo, new Date(), 0, modelYear);
  const carModel = new CarModel(modelCode, carDescription);
  const dealer = new Dealer(shipTo, dealerAddress, zip, 0);

  return [car, dealer, carModel];
  }
  
  
  // Usage example
  scrapeVin('SAMPLE_VIN')
  .then(([car, dealer, carModel]) => {
  console.log(car);
  console.log(dealer);
  console.log(carModel);
  })
  .catch(error => {
  console.error(error);
  });
