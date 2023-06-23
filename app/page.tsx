"use client";

import useSWR from "swr";
import Script from "next/script";
import { Car, CarModel, Dealer } from "./models";
import CarList from "./components/carList";
import React, { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Grid,
  Row,
  Spacer,
  Switch,
  Table,
  Text,
} from "@nextui-org/react";
import { KiaTelluride } from "./types/Telluride";
import { MdOutlineHome } from "react-icons/md";
type OrderBy = "id" | "serial";

const telluride = new KiaTelluride(2023);


export default function Page() {
  const [offset, setOffset] = React.useState<number>(0);

  const [perPage, _setPerPage] = React.useState<number>(25);
  const [dealer, _setDealer] = React.useState<string | null>(null);

  const [order, setOrder] = React.useState<OrderBy>("serial");
  const [models, setModels] = React.useState<string[]>(telluride.trims);

  const nextPage = () => {
    setOffset(offset + perPage);
  };
  const prevPage = () => {
    if (offset - perPage < 0) {
      setOffset(0);
    }
    setOffset(offset - perPage);
  };
  const trimOptions =  () => 
            <Dropdown>
              <Dropdown.Button flat>Trims</Dropdown.Button>
              <Dropdown.Menu
                aria-label="Static Actions"
                selectionMode="multiple"
                selectedKeys={models}
              >
                {models.map((model) => {
                  return <Dropdown.Item key={model}>{model}</Dropdown.Item>;
                })}
              </Dropdown.Menu>
            </Dropdown>

  return (
    <Container>
      <Row justify="space-between" align="center" css={{ p: "$12" }}>
        <Col>
          <Button icon={<MdOutlineHome/>} onClick={() => setOffset(0)} css={{ px: "$5" }} auto/>
          <Spacer x={1} />
        </Col>
        <Col>
          <Button.Group>
            <Button
              onClick={() => setOrder("serial")}
              color={order == "serial" ? "secondary" : "primary"}
              bordered={order == "serial" ? false : true}
            >
              Vin Sort
            </Button>
            <Button
              onClick={() => setOrder("id")}
              color={order == "id" ? "secondary" : "primary"}
              bordered={order == "id" ? false : true}
            >
              Scrape Sort
            </Button>
          </Button.Group>
        </Col>
        <Col>
            <Row justify="space-around">
              <Col>
                <Button onClick={prevPage} disabled={offset - perPage < 0} auto>
                  {`< Prev `}
                </Button>
              </Col>
              <Col>
                <Row>
                  <Text b>Page:</Text>
                  <Spacer x={0.5} />
                  <Text>{offset / perPage}</Text>
                </Row>
              </Col>
              <Col>
                <Button onClick={nextPage} auto>
                  {`Next >`}
                </Button>
              </Col>

            </Row>
        </Col>
      </Row>
      
      <CarList
        perPage={perPage}
        offset={offset}
        dealer={dealer ?? ""}
        order={order}
      />
      <Row>
        <Text h4>Debug</Text>
        <Text>sort: {order}</Text>
        <Text>offset: {offset}</Text>
        <Text>perPage: {perPage}</Text>
      </Row>
    </Container>
  );
}
