import { Car } from "../models";

// Car Detail Component
export const colorNameToImage: { [key: string]: string } = {
  "BLACK": "black",
  "GRAY": "gray",
  "NAVY/GRAY": "gray-and-navy",
};

export const modelSlugMapping: { [key: string]: string } = {
  "SX-PRESTIGE X-LINE": "sxp-x-line",
  "SX-PRESTIGE X-PRO": "sxp-x-pro",
  "SX-PRESTIGE": "sxp",
  "SX X-PRO": "sx-x-pro",
  "SX X-LINE": "sx-x-line",
  "EX X-LINE": "ex-x-line",
  "LX": "lx",
  "SX": "sx",
  "EX": "ex",
  "S": "s",
};

export const modelToMaterial: { [key: string]: string } = {
  "LX": "syntex",
  "S": "syntex",
  "SX-PRESTIGE X-PRO": "nappa",
  "SX-PRESTIGE X-LINE": "nappa",
  "SX-PRESTIGE": "nappa",
  "EX": "leather",
  "SX": "leather",
  "EX X-LINE": "leather",
  "SX X-PRO": "leather",
  "SX X-LINE": "leather",
};

export const getImageDeliveryPath = (path: string, variant: string): string => {
  if (process.env.NODE_ENV === 'production') {
    return `/cdn-cgi/imagedelivery/9ezxd7-onYNaEN1_lszogQ/${path}/${variant}`;
  }
  return `/static/img/${path}`;
};

export  const getCarImageSource = (car: Car, variant: string): string => {
    const modelName = Object.keys(modelSlugMapping).find((model: string) => car.car_model.includes(model));
    const modelSlug = modelSlugMapping[modelName??""];
    const colorSlug = car.ext_color.toLowerCase().replace(/ /g, "-"); // Convert color to lowercase and replace all spaces with hyphens

    return getImageDeliveryPath(`${modelSlug}/${colorSlug}/01.png`, variant);
  };

export const getSwatchImageSrc = (car: Car): string => {
    const interiorColorImage = colorNameToImage[car.int_color];
    const modelName = Object.keys(modelSlugMapping).find((model: string) => car.car_model.includes(model));
    let material = modelToMaterial[modelName??""] ?? "syntex";
    console.log(car.car_model,modelName,material);
    let color = interiorColorImage.toLowerCase();

    return getImageDeliveryPath(`${color}--${material}--seat-trim.png`,'public');
};