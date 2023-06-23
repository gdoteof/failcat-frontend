"use client";

import Script from "next/script";
import { Car, CarModel, Dealer } from "./models";
import React, { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Badge,
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

type OrderBy = "id" | "serial";

async function fetchCars(
  perPage: number,
  offset: number,
  dealer: string | null,
  order: OrderBy = "serial"
): Promise<Car[]> {
  const maybeDealerQuery = dealer ? `&dealer=${dealer}` : "";
  const url = `https://failcat-rust.vteng.io/cars?perpage=${perPage}&offset=${offset}${maybeDealerQuery}&order=${order}`;
  return await fetch(url).then((res) => res.json());
}

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const offset = parseInt(searchParams?.get("offset") ?? "") || 0;

  const [_, setOffset] = React.useState<number>(
    parseInt(searchParams?.get("offset") ?? "") || 0
  );

  const router = useRouter();

  const [cars, setCars] = React.useState<Car[]>([]);
  const [perPage, setPerPage] = React.useState<number>(
    parseInt(searchParams?.get("perPage") ?? "") || 25
  );
  const [dealer, setDealer] = React.useState<string | null>(
    searchParams?.get("dealer") ?? null
  );

  const [order, setOrder] = React.useState<OrderBy>(
    (searchParams?.get("order") as OrderBy) ?? ("serial" as OrderBy)
  );

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
  };

  return (
    <div>
      <Grid.Container gap={2} justify="center">
        <Grid xs={3}>
          <Card>
            <Card.Body>
              <Row justify="center" align="center">
                <Text h6 size={15} css={{ m: 0 }}>
                  Sort by highest vin
                </Text>
                <Spacer x={0.5} />
                <Switch
                  checked={order != "id"}
                  onChange={() => {
                    setOrder(order == "serial" ? "id" : "serial");
                  }}
                />
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={9}>
          <Card>
            <Card.Body>
              <Row justify="center" align="center">
                <Button.Group color="secondary" light bordered>
                  <Button>
                    <Link
                      color="secondary"
                      className="px-12"
                      href={{
                        query: {
                          perPage: perPage,
                          offset: offset + perPage,
                          order: order,
                        },
                      }}
                    >
                      Next
                    </Link>
                  </Button>
                  <Button disabled={offset <= 0}>
                    <Link
                      color="secondary"
                      className="px-12"
                      href={{
                        query: {
                          perPage: perPage,
                          offset: offset - perPage > 0 ? offset - perPage : 0,
                          order: order,
                        },
                      }}
                    >
                      Previous
                    </Link>
                  </Button>
                </Button.Group>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

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
          {cars.map((car) => (
            <Table.Row key={car.serial_number}>
              <Table.Cell>
                <Link href={`/car/${car.id}`}>
                  <Button auto>
                    Details
                  </Button>
                </Link>
              </Table.Cell>
              <Table.Cell>
                  {car.serial_number}
              </Table.Cell>
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
              <Table.Cell>
                  {car.car_model}
              </Table.Cell>
              <Table.Cell>{car.opt_code}</Table.Cell>
              <Table.Cell>
                <Button>
                  <Link
                    className="px-12"
                    href={`/dealer/${car.ship_to}`}
                  >
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
