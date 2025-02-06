"use client";

import Image from "next/image";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Food {
  id: number;
  name: string;
  price: string;
  image: string;
  reviewCount: string;
}

const Page = () => {

  const router = useRouter();
  const fetchdata = async () => {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    return data.recipes; 
  };

  const { isLoading, error, data } = useQuery<Food[]>({
    queryKey: ["food"],
    queryFn: fetchdata,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  return (
    <div className="h-screen p-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-3 gap-9">
        {data &&
          data.map((foods: Food) => (
            <Card
              key={foods.id}
              className="w-[300px] rounded-lg border shadow-md flex flex-col items-center justify-center  hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:bg-slate-900"
              onClick={() => router.push(`/food/${foods.id}`)}
           
           >
              <CardHeader>
                <div>
                  <Image
                    src={foods.image}
                    alt={foods.name}
                    width={300}
                    height={200}
                    className="rounded-lg object-contain"
                  />
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle>{foods.name}</CardTitle>
                <p>{foods.price}$</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="mb-3" onClick={() => router.push(`/food/${foods.id}`)}>Order now</Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Page;
