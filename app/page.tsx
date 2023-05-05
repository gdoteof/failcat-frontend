"use client";

import { Car, CarModel, Dealer } from "./models";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// add perpage and offset to fetchCars as query params to api/cars
async function fetchCars(perPage: number, offset: number): Promise<Car[]> {
  return await fetch(
    `http://localhost:8787/api/cars?perpage=${perPage}&offset=${offset}`
  ).then((res) => res.json());
}

export default function Page() {
  // use fetchCars(perPage, offset) to get data to show
  const perPage: number =
    parseInt(useSearchParams().get("perPage") ?? "") || 10;
  const offset: number = parseInt(useSearchParams().get("offset") ?? "") || 0;

  const [cars, setCars] = React.useState<Car[]>([]);
  React.useEffect(() => {
    fetchCars(perPage, offset).then((cars) => {
      setCars(cars);
      console.log(cars);
    });
  }, [perPage, offset]);

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Vin</th>
              <th className="px-4 py-2">Ext Color</th>
              <th className="px-4 py-2">Int Color</th>
              <th className="px-4 py-2">Car Model</th>
              <th className="px-4 py-2">Opt Code</th>
              <th className="px-4 py-2">Ship To</th>
              <th className="px-4 py-2">Sold To</th>
              <th className="px-4 py-2">Created Date</th>
              <th className="px-4 py-2">Serial Number</th>
              <th className="px-4 py-2">Model Year</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="border px-4 py-2">{car.id}</td>
                <td className="border px-4 py-2">{car.vin}</td>
                <td className="border px-4 py-2">{car.ext_color}</td>
                <td className="border px-4 py-2">{car.int_color}</td>
                <td className="border px-4 py-2">{car.car_model}</td>
                <td className="border px-4 py-2">{car.opt_code}</td>
                <td className="border px-4 py-2">{car.ship_to}</td>
                <td className="border px-4 py-2">{car.sold_to}</td>
                <td className="border px-4 py-2">{car.created_date}</td>
                <td className="border px-4 py-2">{car.serial_number}</td>
                <td className="border px-4 py-2">{car.model_year}</td>
              </tr>
            ))}
          </tbody>
          <Link
            href={{
              query: { perPage: perPage, offset: offset + perPage },
            }}
          >
            Next
          </Link>
        </table>
      </div>
    </main>
  );
}
