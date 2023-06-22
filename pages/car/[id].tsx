"use client";

import CarCard from "@/app/components/car";
import { Car } from "@/app/models";
import { useRouter } from "next/router";
import React from "react";

async function fetchCar(
  id: number
): Promise<Car> {
  const url = `https://failcat-rust.vteng.io/car/${id}`;
  return await fetch(url).then((res) => res.json());
}

export default function Page() {
  const router = useRouter();
  const  id  = parseInt(router.query.id?.toString() ?? "-1");
  const [car, setCar] = React.useState<Car|null>(null);

  React.useEffect(() => {
    fetchCar(id).then((car) => {
      setCar(car);
      console.log(car);
    });
  }, [id]);

  return (
    id != -1 && car != null && <CarCard car={car} /> || <div>Serial: {id} not found, car: {car?.car_model}</div>
  )
}