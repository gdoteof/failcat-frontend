import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Car } from "@/app/models";
import Head from "next/head";
import CarCard from "@/app/components/car/card";
import ReactGA from "react-ga4";

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
      fetchCar(id).then((car) => {
        setCar(car)
        ReactGA.send({
          hitType: "pageview",
          title: `Car Detail page: ${car?.car_model} - ${car?.vin}`,
          car: car,
        });
      });
    }
  }, [car, router.query.id]);

  const getTitle = () => {
    return car
      ? `Failcat - ${car?.car_model} - ${car?.vin}`
      : `Failcat - Kia Telluride Vin Tracker: ${router.query.id}`;
  };

  //
  return (
    <div>
      <Head>
        <title>{getTitle()}</title>
      </Head>
      {(car && <CarCard car={car} />) || <p>Loading...</p>}
    </div>
  );
}
