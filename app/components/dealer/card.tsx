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
        <Card>
          <Card.Body>
            <Text h4>{dealer.dealer_code}</Text>
            <Text h4>{dealer.address}</Text>
          </Card.Body>
        </Card>
  );
};

export default DealerCard;
