import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CarCard from "@/app/components/car";
import { Car } from "@/app/models";
import Head from 'next/head'


async function fetchCar(id: number): Promise<Car> {
  const url = `https://failcat-rust.vteng.io/car/${id}`;
  return await fetch(url).then((res) => res.json());
}

export default function Page() {
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (router.query.id) {
      const id = parseInt(router.query.id as string);
      fetchCar(id).then((car) => setCar(car));
    }
  }, [router.query.id]);

  const getTitle = () => {
    return `Failcat - ${car?.car_model} - ${car?.vin}`
  }

//
  return (
  <div>
    <Head>
      <title>
        {getTitle()}
      </title>
    </Head>
    { car && <CarCard car={car} /> || <p>Loading...</p>}
  </div>
  );
}
