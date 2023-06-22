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
import { Dealer } from "@/app/models";


const DealerCard: FC<{ dealer: Dealer }> = ({ dealer }: { dealer: Dealer }) => {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={24} md={12}>
        <Card>
          <Card.Body>
            <Text h4>{dealer.dealer_code}</Text>
            <Text h4>{dealer.address}</Text>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default DealerCard;
