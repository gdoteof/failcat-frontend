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

// Car Detail Component
const colorNameToImage: { [key: string]: string } = {
  BLACK: "black",
  GRAY: "gray",
  "NAVY/GRAY": "gray-and-navy",
};

const modelToMaterial: { [key: string]: string } = {
  LX: "syntex",
  S: "syntex",
  SXP: "nappa",
  EX: "leather",
  SX: "leather",
  "EX X-LINE": "leather",
  "SX X-PRO": "nappa",
  "SXP X-LINE": "nappa",
};

const CarCard = ({ car }: { car: Car }) => {
  // Map color names to RGB values
  const interiorColorImage = colorNameToImage[car.int_color];

  // Function to get the image source based on car model and exterior color
  const getImageSource = () => {
    const modelSlugMapping: { [key: string]: string } = {
      "EX X-LINE": "ex-x-line",
      LX: "lx",
      "SX X-LINE": "sx-x-line",
      SX: "sx",
      SXP: "sxp",
      EX: "ex",
      S: "s",
      "SX X-PRO": "sx-x-pro",
      "SXP X-LINE": "sxp-x-line",
    };
    const modelName = car.car_model.split(" ")[2]; // Assuming the model name is always the third word
    const modelSlug = modelSlugMapping[modelName];
    const colorSlug = car.ext_color.toLowerCase().replace(/ /g, "-"); // Convert color to lowercase and replace all spaces with hyphens

    return `/static/img/${modelSlug}/${colorSlug}/01.png`;
  };

  const getSwatchImage = () => {
    let material = modelToMaterial[car.car_model.split(" ")[2]];
    return `/static/img/${car.int_color.toLowerCase()}--${material}--seat-trim.png`;
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
              width="50"
              height="50"
            />
            <Spacer y={1} />
            <Text>Exterior color: {car.ext_color}</Text>
            <Divider y={1} />
            <Text>
              Dealer: <Link className="px-12" href={`/?dealer=${car.ship_to}`}>
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
