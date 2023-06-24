"use client";

import CarList from "./components/carList";
import React, { Key, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { MdOutlineHome } from "react-icons/md";
import { KiaTelluride } from "./types/KiaTelluride";
type OrderBy = "id" | "serial";
import ReactGA from "react-ga4";
import { stateCodes } from "./helpers/forms";

const telluride = new KiaTelluride(2023);

type SelectionType = Set<Key>;

type Entry = {
  key: Key;
  value: any;
};

export default function Page() {
  const [offset, setOffset] = React.useState<number>(0);

  const [perPage, setPerPage] = React.useState<number>(25);
  const [dealer, _setDealer] = React.useState<string | null>(null);

  const [order, setOrder] = React.useState<OrderBy>("serial");
  const [trims, setTrims] = React.useState<Set<string>>(
    new Set<string>(telluride.trims)
  );
  const [dealerStates, setDealerStates] = React.useState<Set<string>>(new Set(stateCodes));

  const currentPage = () => offset / perPage + 1;
  useEffect(() => {
    ReactGA.initialize('G-DJE0ZYCWJE');
    ReactGA.send({
      hitType: "pageview",
      title: `Homepage page: ${currentPage()}`,
    });
  });

  const nextPage = () => {
    let nextOffset: number = offset + perPage;
    setOffset(nextOffset);
    ReactGA.send({
      hitType: "pageview",
      title: `Homepage page: ${currentPage()}`,
    });
  };
  const prevPage = () => {
    if (offset - perPage < 0) {
      setOffset(0);
    } else {
      setOffset(offset - perPage);
    }
    ReactGA.send({
      hitType: "pageview",
      title: `Homepage page: ${currentPage()}`,
    });
  };


  const handleStateOptions = (keys: any) => {
    const newStates = new Set<string>();
    keys.forEach((key: string) => {
      newStates.add(key);
    });
    setDealerStates(newStates);
    return newStates;
  };

  const stateCodesArray = stateCodes.map((code) => ({ label: code }));

  const dealerStateOptions = () => (
    <Dropdown>
      <Dropdown.Button flat color="error">Dealer States ({dealerStates.size})</Dropdown.Button>
      <Dropdown.Menu
        aria-label="Static Actions"
        selectionMode="multiple"
        disabledKeys={dealerStates}
        onSelectionChange={handleTrimOptions}
        items={stateCodesArray}
      >
        {(item: object) => {
          const typedItem = item as { label: string };
          return (
            <Dropdown.Item key={typedItem.label as unknown as Key}>
              {" "}
              {typedItem.label as string}{" "}
            </Dropdown.Item>
          );
        }}
      </Dropdown.Menu>
    </Dropdown>
  );

  const trimsArray = telluride.trims.map((trim) => ({ label: trim }));
  const handleTrimOptions = (keys: any) => {
    const newTrims = new Set<string>();
    keys.forEach((key: string) => {
      newTrims.add(key);
    });
    setTrims(newTrims);
    return newTrims;
  };

  const trimOptions = () => (
    <Dropdown>
      <Dropdown.Button flat>Trims ({trims.size})</Dropdown.Button>
      <Dropdown.Menu
        aria-label="Static Actions"
        selectionMode="multiple"
        selectedKeys={Array.from(trims)}
        onSelectionChange={handleTrimOptions}
        items={trimsArray}
      >
        {(item: object) => {
          const typedItem = item as { label: string };
          return (
            <Dropdown.Item key={typedItem.label as unknown as Key}>
              {" "}
              {typedItem.label as string}{" "}
            </Dropdown.Item>
          );
        }}
      </Dropdown.Menu>
    </Dropdown>
  );

  const perPageChoices: number[] = [25, 50, 100, 200];

  const handlePerPage = (event: Key) => {
    const newPerPage = perPageChoices[event as number];
    if (newPerPage != newPerPage + 0) {
      throw new Error("Invalid per page choice");
    }
    setPerPage(newPerPage + 0);
    ReactGA.event("click", {
      category: "Pagination",
      page: currentPage(),
      perPage: event as number,
    });
  };

  const perPageOptions = (perPageChoices: number[]) => (
    <Dropdown>
      <Dropdown.Button flat>Per Page </Dropdown.Button>
      <Dropdown.Menu aria-label="Static Actions" onAction={handlePerPage}>
        {perPageChoices.map((perPageOption, index) => {
          return <Dropdown.Item key={index}>{perPageOption}</Dropdown.Item>;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
  const Debugger = () => {
    process.env.NODE_ENV === "development" && (
      <div>
        <Text>Debug: </Text>
        <Text>{`perPage: ${perPage}`}</Text>
        <Text>{`offset: ${offset}`}</Text>
        <Text>
          {`trim: ${trims.forEach.toString}`}
          <ul>
            {telluride.trims.map((trim, index) => {
              return <li key={trim}>{trim}</li>;
            })}
          </ul>
        </Text>
        <Text>{`currentPage(): ${currentPage()}`}</Text>
        <Text>{`offset/perPage: ${offset / perPage}`}</Text>
      </div>
    );
  };

  const NavItems = () => {
    return (

      <>
        <Row>
          <Col>
            <Row justify="flex-start" css={{ p: "$6" }}>
              <Col>
                <Button
                  icon={<MdOutlineHome />}
                  onClick={() => setOffset(0)}
                  css={{ px: "$5" }}
                  auto
                />
              </Col>
              <Col>{trimOptions()}</Col>
              <Col>
                <Button.Group css={{pl: "0" }}>
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
            </Row>
          </Col>
          <Col>
            <Row justify="flex-start" css={{ p: "$6" }}>
              <Col>
                <Button onClick={prevPage} disabled={offset - perPage < 0} auto>
                  {`< Prev `}
                </Button>
              </Col>
              <Spacer x={1} />
              <Col>
                <Row justify="flex-start">
                  <Text b>Page:</Text>
                  <Spacer x={0.5} />
                  <Text>{currentPage()}</Text>
                </Row>
                <Row justify="flex-start">
                  <Text size={"$xs"} weight={"light"}>
                    Per Page:
                  </Text>
                  <Spacer x={0.5} />
                  <Text size={"$xs"} weight={"thin"}>
                    {perPage}
                  </Text>
                </Row>
              </Col>
              <Spacer x={1} />
              <Col>
                <Button onClick={nextPage} auto>
                  {`Next >`}
                </Button>
              </Col>
              <Spacer x={1.5} />
              <Col>{perPageOptions(perPageChoices)}</Col>
            </Row>
          </Col>
        </Row>
      </>
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
        trims={trims}
      />
      <NavItems />
      {process.env.NODE_ENV === "development" && (
        <div>
          <Text>Debug: </Text>
          <Text>{`perPage: ${perPage}`}</Text>
          <Text>{`trim: ${trims}`}</Text>
        </div>
      )}
    </Container>
  );
}
