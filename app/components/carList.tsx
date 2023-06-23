"use client";

import useSWR from "swr";
import React, { FC } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Button,
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

type OrderBy = "id" | "serial";

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

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
const CarList: FC<{ perPage: number, offset: number, dealer: string, order: OrderBy }> = ({ perPage, offset, dealer, order }: { perPage: number, offset: number, dealer: string, order: OrderBy }) => {
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
          <Table.Column>Serial Number</Table.Column>
          <Table.Column>Vin</Table.Column>
          <Table.Column>Ext Color</Table.Column>
          <Table.Column>Int Color</Table.Column>
          <Table.Column>Car Model</Table.Column>
          <Table.Column>Opt Code</Table.Column>
          <Table.Column>Dealer</Table.Column>
          <Table.Column>Model Year</Table.Column>
          <Table.Column>Date Scraped</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((car: Car) => (
            <Table.Row key={car.serial_number}>
              <Table.Cell>
                <Link href={`/car/${car.id}`}>
                  <Button auto>Details</Button>
                </Link>
              </Table.Cell>
              <Table.Cell>{car.serial_number}</Table.Cell>
              <Table.Cell>
                {highlightLastSix(car.vin)}
                <a
                  href={`https://failcat-rust.vteng.io/window-sticker/${car.vin}`}
                >
                  <MdPictureAsPdf />
                </a>
              </Table.Cell>
              <Table.Cell>{car.ext_color}</Table.Cell>
              <Table.Cell>{car.int_color}</Table.Cell>
              <Table.Cell>{car.car_model}</Table.Cell>
              <Table.Cell>{car.opt_code}</Table.Cell>
              <Table.Cell>
                <Button auto>
                  <Link href={`/dealer/${car.ship_to}`}>
                    {car.ship_to}
                  </Link>
                </Button>
              </Table.Cell>
              <Table.Cell>{car.model_year}</Table.Cell>
              <Table.Cell>{prettyDate(car.created_date)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Link
        color="secondary"
        className="px-12"
        href={{
          query: { perPage: perPage, offset: offset + perPage },
        }}
      >
        Next offset: {offset} new offset: {offset + perPage}
      </Link>
      <Link
        className="px-12"
        href={{
          query: { perPage: perPage, offset: offset - perPage },
        }}
      >
        Previous offset: {offset} new offset: {offset - perPage}
      </Link>
    </div>
  );
}

export default CarList;