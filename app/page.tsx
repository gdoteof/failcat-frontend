"use client";

import { Car, CarModel, Dealer } from "./models";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Grid, Switch, Table } from "@nextui-org/react";
import { MdPictureAsPdf } from "react-icons/md";
import {format} from "date-fns"

type OrderBy = "id" | "serial"

async function fetchCars(
  perPage: number,
  offset: number,
  dealer: string | null,
  order: OrderBy = "serial"
): Promise<Car[]> {
  const maybeDealerQuery = dealer ? `&dealer=${dealer}` : "";
  const url = `https://failcat-rust.vteng.io/cars?perpage=${perPage}&offset=${offset}${maybeDealerQuery}&order=${order}`;
  return await fetch( url).then((res) => res.json());
}

export default function Page() {
  const searchParams = useSearchParams();
  // use fetchCars(perPage, offset) to get data to show
  const offset: number = parseInt(searchParams.get("offset") ?? "") || 0;

  const [cars, setCars] = React.useState<Car[]>([]);
  const [perPage, setPerPage] = React.useState<number>(
    parseInt(searchParams.get("perPage") ?? "") || 25
  );
  const [dealer, setDealer] = React.useState<string | null>(
    searchParams.get("dealer")
  );

  const [order, setOrder] = React.useState<OrderBy>("serial");

  React.useEffect(() => {
    fetchCars(perPage, offset, dealer, order).then((cars) => {
      setCars(cars);
      console.log(cars);
    });
  }, [perPage, offset, dealer, order]);

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

  }


  return (
    <div>
      <Button.Group color="primary" bordered ghost>
        <Button onClick={() => setOrder("serial")}>Sort By Highest Vin</Button>
        <Button onClick={() => setOrder("id")}>Sort By Most Recently Scraped</Button>
      </Button.Group>
      <Table
        aria-label="Failcat"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
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
          {cars.map((car) => (
            <Table.Row key={car.serial_number}>
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
                <Link
                  className="px-12"
                  href={{
                    query: {
                      perPage: perPage,
                      offset: offset + perPage,
                      dealer: car.ship_to,
                    },
                  }}
                >
                  {car.ship_to}
                </Link>
              </Table.Cell>
              <Table.Cell>{car.model_year}</Table.Cell>
              <Table.Cell>{prettyDate(car.created_date)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Link
        className="px-12"
        href={{
          query: { perPage: perPage, offset: offset + perPage },
        }}
      >
        Next
      </Link>
      <Link
        className="px-12"
        href={{
          query: { perPage: perPage, offset: offset - perPage },
        }}
      >
        Previous
      </Link>
    </div>
  );
}
