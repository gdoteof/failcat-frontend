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
  Row,
  Col,
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
    let material = modelToMaterial[modelName??""] ?? "syntex";
    console.log(car.car_model,modelName,material);
    let color = interiorColorImage.toLowerCase();

    return `/static/img/${color}--${material}--seat-trim.png`;
  };

  return (
        <Card>
        <Card.Header>
          <Col>
          <Row justify="space-between" align="center" css={{p: '$12'}}>
            <Text>{car.ext_color}</Text>
            <Text weight="bold">
              {modelName}
            </Text>
          </Row>
          </Col>
        </Card.Header>
          <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={getImageSource()}
            alt="me"
            width="480"
            height="240"
          />
          </Card.Body>
          <Card.Footer>
                <Row justify="space-between" css={{p: '$12'}}>
                  <Col>
                      <Text size={12}>
                        {car.vin}
                      </Text>
                  </Col>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Image src={getSwatchImageSrc()} width="40" height="40" alt="swatch"/>
                  </Suspense>
                </Row>
            </Card.Footer>
        </Card>
  );
};

export default CarCard;
