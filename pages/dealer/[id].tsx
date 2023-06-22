import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CarCard from "@/app/components/car";
import { Car, Dealer } from "@/app/models";
import Head from 'next/head'
import Script from "next/script";
import DealerCard from "@/app/components/dealer/card";
import { Grid } from "@nextui-org/react";


async function fetchDealer(dealer_code: string): Promise<Dealer> {
  const url = `https://failcat-rust.vteng.io/dealers/${dealer_code}`;
  return await fetch(url).then((res) => res.json());
}

async function fetchDealerCars(dealer_code: string): Promise<Car[]> {
  const url = `https://failcat-rust.vteng.io/dealers/${dealer_code}/cars`;
  return await fetch(url).then((res) => res.json());
}

export default function Page() {
  const router = useRouter();
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    router.query.id &&
      fetchDealer(router.query.id as string).then((Dealer) => setDealer(Dealer));
      fetchDealerCars(router.query.id as string).then((cars) => setCars(cars));
  }, [router.query.id]);

  const getTitle = () => {
    return Dealer  ?  `Failcat - Dealer: ${dealer?.dealer_code}` : `Failcat - Kia Telluride Vin Tracker: ${router.query.id}`
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
    <Grid.Container gap={2} justify="flex-start">
      <Grid xs={24} md={24}>
        { dealer && <DealerCard dealer={dealer} /> || <p>Loading...</p>}
      </Grid>
        {cars.map((car, index) => 
          <Grid xs={4} md={6} key={index}>
            <CarCard car={car} key={car.id}/>
          </Grid>)}
    </Grid.Container>
  </div>
  );
}
