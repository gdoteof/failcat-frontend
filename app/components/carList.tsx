"use client";
import ReactGA from "react-ga4";
import useSWR from "swr";
import React, { FC } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Image,
  Card,
  Container,
  Grid,
  Row,
  Spacer,
  Switch,
  Table,
  Text,
} from "@nextui-org/react";
import { MdPictureAsPdf } from "react-icons/md";
import { format } from "date-fns";
import { Car } from "../models";
import {
  getCarImageSource,
  getSwatchImageSrc,
  modelSlugMapping,
} from "../helpers/carImages";

type OrderBy = "id" | "serial";

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

const sameBeginning = (a: string, b: string) => {
  return a.slice(0, b.length) === b;
};

function getCarUrl(
  perPage: number,
  offset: number,
  dealer: string | null,
  order: OrderBy = "serial"
): string {
  const maybeDealerQuery = dealer ? `&dealer=${dealer}` : "";
  const url = `https://failcat-rust.vteng.io/cars?perpage=${perPage}&offset=${offset}${maybeDealerQuery}&order=${order}`;
  return url;
}
const CarList: FC<{
  perPage: number;
  offset: number;
  dealer: string;
  order: OrderBy;
  trims: Set<string>;
}> = ({
  perPage,
  offset,
  dealer,
  order,
  trims,
}: {
  perPage: number;
  offset: number;
  dealer: string;
  order: OrderBy;
  trims: Set<string>;
}) => {
  const { data, error, isLoading } = useSWR(
    getCarUrl(perPage, offset, dealer, order),
    fetcher
  );

  const highlightLastSix = (vin: string) => {
    const lastSix = vin.slice(-6);
    const rest = vin.slice(0, -6);
    return (
      <>
        {rest}
        <span style={{ fontWeight: "bold" }}>{lastSix}</span>
      </>
    );
  };

  const prettyDate = (date: Date) => {
    try {
      date = new Date(date);
      return format(date, "yyyy-MM-dd hh:mm");
    } catch (e) {
      return "";
    }
  };

  const trackSelection = (car: Car) => {
    //chatgpt fill this in
    ReactGA.event("select_item", {
      dealer: car.dealer,
      model: car.model,
      color: car.ext_color,
      type: "car",
    });
  };

  const trackWindowSticker = (car: Car) => {
    //chatgpt fill this in
    ReactGA.event("select_item", {
      dealer: car.dealer,
      model: car.model,
      color: car.ext_color,
      type: "window_sticker",
    });
  };

  const normalizedModelName = (car: Car) => {
    Object.keys(modelSlugMapping).find((model: string) =>
      car.car_model.includes(model)
    );
  };
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <Table
        aria-label="Failcat"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Details</Table.Column>
          <Table.Column>Vin</Table.Column>
          <Table.Column>Ext Color</Table.Column>
          <Table.Column>Int Color</Table.Column>
          <Table.Column>Trim</Table.Column>
          <Table.Column>Opt Code</Table.Column>
          <Table.Column>Dealer</Table.Column>
          <Table.Column>Model Year</Table.Column>
          <Table.Column>Date Scraped</Table.Column>
        </Table.Header>
        <Table.Body>
          {data
            .filter((car: Car) => {
                const modelName = Object.keys(modelSlugMapping).find(
                    (model: string) => car.car_model.includes(model)
                );
                return modelName ? trims.has(modelName) : false;
            })
            .map((car: Car) => (
              <Table.Row key={car.serial_number}>
                <Table.Cell>
                  <Link href={`/car/${car.id}`}>
                    <Button auto onClick={() => trackSelection(car)}>
                      Details
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {highlightLastSix(car.vin)}
                  <a
                    onClick={() => trackWindowSticker(car)}
                    href={`https://failcat-rust.vteng.io/window-sticker/${car.vin}`}
                  >
                    <MdPictureAsPdf />
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <Image
                    src={getCarImageSource(car, "carSwatch")}
                    width="80px"
                    height="40px"
                    alt={car.ext_color}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Image
                    src={getSwatchImageSrc(car)}
                    width="40"
                    height="40"
                    alt={car.int_color}
                  />
                </Table.Cell>
                <Table.Cell>{car.car_model.slice(14)}</Table.Cell>
                <Table.Cell>{car.opt_code}</Table.Cell>
                <Table.Cell>
                  <Button auto>
                    <Link href={`/dealer/${car.ship_to}`}>{car.ship_to}</Link>
                  </Button>
                </Table.Cell>
                <Table.Cell>{car.model_year}</Table.Cell>
                <Table.Cell>{prettyDate(car.created_date)}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CarList;
