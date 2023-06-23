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
import { Car } from "../../models";
import {colorNameToImage, getCarImageSource, getImageDeliveryPath, getSwatchImageSrc, modelSlugMapping, modelToMaterial} from '../../helpers/carImages';



const CarCard: FC<{ car: Car }> = ({ car }: { car: Car }) => {
  const modelName = Object.keys(modelSlugMapping).find((model: string) => car.car_model.includes(model));


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
            src={getCarImageSource(car, "mediumCarCard")}
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
                    <Image src={getSwatchImageSrc(car)} width="40" height="40" alt="swatch"/>
                  </Suspense>
                </Row>
            </Card.Footer>
        </Card>
  );
};

export default CarCard;
