import CarCard from "@/app/components/car";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const  id  = parseInt(router.query.id?.toString() ?? "-1");
  
  if (id === -1) {
    return (
      { notFound: true }
    )
  }

  return (
    <CarCard id={id} />
  )
}