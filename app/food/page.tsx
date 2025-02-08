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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Food {
  id: number;
  name: string;
  price: string;
  image: string;
  reviewCount: string;
}

const Page = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const fetchdata = async () => {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
   
    return data;
  };

  const { isLoading, error, data } = useQuery<Food[]>({
    queryKey: ["food"],
    queryFn: fetchdata,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  const filteredData = data?.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesPrice =
      priceFilter === "all" || Number(food.reviewCount) <= Number(priceFilter);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="h-screen p-4">
      {/* Search & Filter Controls */}
      <div className="flex justify-between mb-6 gap-4">
        <h1 className="text-2xl p-2">
          All <span className="text-yellow-500">
          items</span>
        </h1>
        <Input
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/4 p-2 border rounded-lg shadow-sm dark:bg-slate-800"
        />
        <div>
          <h1>
            Categories
          </h1>

        </div>

       
 
        <Select onValueChange={(value) => setPriceFilter(value)} value={priceFilter}>
         
          <SelectTrigger className="w-1/6">
            <SelectValue placeholder="Filter by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="10">Under $10</SelectItem>
            <SelectItem value="20">Under $20</SelectItem>
            <SelectItem value="50">Under $50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Food Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData?.map((food: Food) => (
          <Card
            key={food.id}
            className="w-[300px] rounded-lg border shadow-md flex flex-col items-center justify-center hover:shadow-xl transition-all duration-500 transform hover:scale-105 dark:hover:bg-slate-900 hover:bg-gray-300 cursor-pointer"
            onClick={() => router.push(`/food/${food.id}`)}
          >
            <CardHeader>
              <Image
                src={food.image}
                alt={food.name}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle>{food.name}</CardTitle>
              <p className="text-lg font-bold dark:text-yellow-400">${food.reviewCount}</p>
              <p className="text-sm text-gray-400">⭐ {food.reviewCount} Reviews</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="mb-3" onClick={() => router.push(`/food/${food.id}`)}>
                Order Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
