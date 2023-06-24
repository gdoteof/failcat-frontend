"use client";

import useSWR from "swr";
import Script from "next/script";
import { Car, CarModel, Dealer } from "./models";
import CarList from "./components/carList";
import React, { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
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
import { MdOutlineHome } from "react-icons/md";
import { KiaTelluride } from "./types/KiaTelluride";
type OrderBy = "id" | "serial";
import ReactGA from "react-ga4";

const telluride = new KiaTelluride(2023);

export default function Page() {
  const [offset, setOffset] = React.useState<number>(0);

  const [perPage, _setPerPage] = React.useState<number>(25);
  const [dealer, _setDealer] = React.useState<string | null>(null);

  const [order, setOrder] = React.useState<OrderBy>("serial");
  const [models, setModels] = React.useState<string[]>(telluride.trims);

  const currentPage = () => offset / perPage + 1;
  ReactGA.send({
    hitType: "pageview",
    title: `Homepage page: ${currentPage()}`,
  });

  const nextPage = () => {
    ReactGA.send({
      hitType: "pageview",
      title: `Homepage page: ${currentPage()}`,
    });
    setOffset(offset + perPage);
  };
  const prevPage = () => {
    ReactGA.send({
      hitType: "pageview",
      title: `Homepage page: ${currentPage()}`,
    });
    if (offset - perPage < 0) {
      setOffset(0);
    }
    setOffset(offset - perPage);
  };

  const trimOptions = () => (
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
  );

  const NavItems = () => {
    return (
      <Row justify="space-between" align="center" css={{ p: "$12" }}>
        <Col>
          <Button
            icon={<MdOutlineHome />}
            onClick={() => setOffset(0)}
            css={{ px: "$5" }}
            auto
          />
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
                <Text>{currentPage()}</Text>
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
    );
  };
  return (
    <Container>
      <NavItems />
      <CarList
        perPage={perPage}
        offset={offset}
        dealer={dealer ?? ""}
        order={order}
      />
      <NavItems />
    </Container>
  );
}
