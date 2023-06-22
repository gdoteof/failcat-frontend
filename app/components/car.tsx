// Importing necessary libraries and components
import {
  Grid,
  Card,
  Text,
  Spacer,
  Divider,
  useTheme,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Car } from "../models";
import Image from "next/image";
// import swatches from pages/car/black--leather--seat-trim.png pages/car/black--nappa--seat-trim.png pages/car/black--syntex--seat-trim.png pages/car/gray--leather--seat-trim.png pages/car/gray--nappa--seat-trim.png pages/car/gray--syntex--seat-trim.png pages/car/gray-and-navy--leather--seat-trim.png pages/car/gray-and-navy--nappa--seat-trim.png

// Car Detail Component
const colorNameToImage: { [key: string]: string } = {
  "BLACK": "black",
  "GRAY": "gray",
  "NAVY/GRAY": "gray-and-navy",
};

const modelSlugMapping: { [key: string]: string } = {
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

const modelToMaterial: { [key: string]: string } = {
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

// Import images
import blackLeatherTrim from './black--leather--seat-trim.png';
import blackNappaTrim from './black--nappa--seat-trim.png';
import blackSyntexTrim from './black--syntex--seat-trim.png';
import grayLeatherTrim from './gray--leather--seat-trim.png';
import grayNappaTrim from './gray--nappa--seat-trim.png';
import graySyntexTrim from './gray--syntex--seat-trim.png';
import grayAndNavyLeatherTrim from './gray-and-navy--leather--seat-trim.png';
import grayAndNavyNappaTrim from './gray-and-navy--nappa--seat-trim.png';

// Map images to material and color
const swatches = {
  black: {
    leather: blackLeatherTrim,
    nappa: blackNappaTrim,
    syntex: blackSyntexTrim,
  },
  gray: {
    leather: grayLeatherTrim,
    nappa: grayNappaTrim,
    syntex: graySyntexTrim,
  },
  'gray-and-navy': {
    leather: grayAndNavyLeatherTrim,
    nappa: grayAndNavyNappaTrim,
  },
};


const CarCard = ({ car }: { car: Car }) => {
  // Map color names to RGB values
  const interiorColorImage = colorNameToImage[car.int_color];
  const modelName = Object.keys(modelSlugMapping).find((model: string) => car.car_model.includes(model));

  // Function to get the image source based on car model and exterior color
  const getImageSource = () => {
    const modelSlug = modelSlugMapping[modelName??""];
    const colorSlug = car.ext_color.toLowerCase().replace(/ /g, "-"); // Convert color to lowercase and replace all spaces with hyphens

    return `/static/img/${modelSlug}/${colorSlug}/01.png`;
  };


  const getSwatchImage = () => {
    let material = modelToMaterial[modelName??""];
    let color = interiorColorImage.toLowerCase();
    return (swatches as any)[color][material];
  };

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={24} md={12}>
        <Card>
          <Card.Body>
            <Card.Image
              src={getImageSource()}
              alt="me"
              width="480"
              height="240"
            />
            <Text h3>{car.car_model}</Text>
            <Text h5>{car.year}</Text>
            <Divider y={1} />
            <Text>VIN: {car.vin}</Text>
            <Divider y={1} />
            <Text>Interior color: {car.int_color}</Text>
            <Image
              src={getSwatchImage()}
              alt={car.int_color}
              width="40"
              height="40"
            />
            <Spacer y={1} />
            <Text>Exterior color: {car.ext_color}</Text>
            <Divider y={1} />
            <Text>
              <Link className="px-12" href={`/?dealer=${car.ship_to}`}>
                {car.ship_to}
              </Link>
            </Text>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default CarCard;
