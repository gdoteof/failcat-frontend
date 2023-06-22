// Importing necessary libraries and components
import {
  Grid,
  Card,
  Text,
  Spacer,
  Divider,
  Image,
  useTheme,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect, FC, ReactElement, Suspense } from "react";
import dynamic from 'next/dynamic';
import { Car } from "../models";

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

const CarCard: FC<{ car: Car }> = ({ car }: { car: Car }) => {
  const interiorColorImage = colorNameToImage[car.int_color];
  const modelName = Object.keys(modelSlugMapping).find((model: string) => car.car_model.includes(model));

  const getImageSource = (): string => {
    const modelSlug = modelSlugMapping[modelName??""];
    const colorSlug = car.ext_color.toLowerCase().replace(/ /g, "-"); // Convert color to lowercase and replace all spaces with hyphens

    return `/static/img/${modelSlug}/${colorSlug}/01.png`;
  };

  const getSwatchImageSrc = (): string => {
    let material = modelToMaterial[modelName??""];
    let color = interiorColorImage.toLowerCase();

    return `/static/img/${color}--${material}--seat-trim.png`;
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
            {/* Wrap the DynamicImage component with Suspense and provide a fallback */}
            <Suspense fallback={<div>Loading...</div>}>

              <Image src={getSwatchImageSrc()} width="40" height="40" alt="swatch"/>
            </Suspense>
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
