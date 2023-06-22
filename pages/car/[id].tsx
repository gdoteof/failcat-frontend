import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CarCard from "@/app/components/car";
import { Car } from "@/app/models";
import Head from 'next/head'
import Script from "next/script";


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
    return car  ?  `Failcat - ${car?.car_model} - ${car?.vin}` : `Failcat - Kia Telluride Vin Tracker: ${router.query.id}`
  }

//
  return (
  <div>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DJE0ZYCWJE');
  `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DJE0ZYCWJE"
          strategy="afterInteractive"
        ></Script>
    <Head>
      <title>
        {getTitle()}
      </title>
    </Head>
    { car && <CarCard car={car} /> || <p>Loading...</p>}
  </div>
  );
}
