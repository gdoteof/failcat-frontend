"use client";

import { Car, CarModel, Dealer } from "./models";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Table } from "@nextui-org/react";

// add perpage and offset to fetchCars as query params to api/cars
async function fetchCars(perPage: number, offset: number): Promise<Car[]> {
  return await fetch(
    `https://fc-api.vteng.io/api/cars?perpage=${perPage}&offset=${offset}`
  ).then((res) => res.json());
}

export default function Page() {
  const searchParams = useSearchParams();
  // use fetchCars(perPage, offset) to get data to show
  const perPage: number = parseInt(searchParams.get("perPage") ?? "") || 10;
  const offset: number = parseInt(searchParams.get("offset") ?? "") || 0;

  const [cars, setCars] = React.useState<Car[]>([]);
  React.useEffect(() => {
    fetchCars(perPage, offset).then((cars) => {
      setCars(cars);
      console.log(cars);
    });
  }, [perPage, offset]);

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
          <Table.Column>Id</Table.Column>
          <Table.Column>Vin</Table.Column>
          <Table.Column>Ext Color</Table.Column>
          <Table.Column>Int Color</Table.Column>
          <Table.Column>Car Model</Table.Column>
          <Table.Column>Opt Code</Table.Column>
          <Table.Column>Ship To</Table.Column>
          <Table.Column>Sold To</Table.Column>
          <Table.Column>Serial Number</Table.Column>
          <Table.Column>Model Year</Table.Column>
        </Table.Header>
        <Table.Body>
          {cars.map((car) => (
            <Table.Row key={car.id}>
              <Table.Cell>{car.id}</Table.Cell>
              <Table.Cell>{car.vin}</Table.Cell>
              <Table.Cell>{car.ext_color}</Table.Cell>
              <Table.Cell>{car.int_color}</Table.Cell>
              <Table.Cell>{car.car_model}</Table.Cell>
              <Table.Cell>{car.opt_code}</Table.Cell>
              <Table.Cell>{car.ship_to}</Table.Cell>
              <Table.Cell>{car.sold_to}</Table.Cell>
              <Table.Cell>{car.serial_number}</Table.Cell>
              <Table.Cell>{car.model_year}</Table.Cell>
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
