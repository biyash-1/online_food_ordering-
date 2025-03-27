"use client";
import TodaysSpecial from "@/components/Todays";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/app/stores/cartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface FoodDetail {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  reviewCount: string;
}
interface AuthState{
  isLoggedIn: boolean
}

const fetchFoodDetail = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("Fetched Food Detail:", data); // Debugging log
  return data;
};

const FoodDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [value, setValue] = useState(1);
  const decrease = () => setValue((prev) => Math.max(1, prev - 1));
  const increase = () => setValue((prev) => prev + 1); // Changed from value to quantity for clarity
  const { addToCart } = useCartStore();
 


  const { data, isLoading, error } = useQuery<FoodDetail>({
    queryKey: ["food", id],
    queryFn: () => fetchFoodDetail(id),
  });

  const handleCart = () => {
   

      if (data) {
        addToCart({
          id: data.id,
          title: data.name, 
          reviewCount: Number(data.reviewCount), 
          image: data.image,
          quantity:value
        });
      
    }
    toast.success("item added to cart sucessfully");
    router.push('/cart')
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  return (
    <div className="p-2">
      <div className="flex items-center justify-center gap-6">
        <Image
          src={data?.image ?? ""}
          alt={data?.name ?? "Food image"}
          width={200}
          height={300}
          className="rounded-lg"
        />

        <div className="flex flex-col items-start gap-2">
          <h1 className="text-2xl font-bold">{data?.name}</h1>
          <p className="text-lg">Price: {data?.reviewCount}$</p>
          <p>{data?.description}</p>
          <div className="flex items-center gap-2 justify-center">
            <h1>Quantity</h1>
            <span
              className="bg-red-600 px-2 rounded-2xl cursor-pointer"
              onClick={decrease}
            >
              -
            </span>
            <input
              type="text"
              className="w-8 rounded-lg border bg-slate-500 text-center"
              value={value}
              readOnly
            />
            <span
              className="bg-green-600 px-2 rounded-lg cursor-pointer"
              onClick={increase}
            >
              +
            </span>
          </div>
          <Button className="mt-3" onClick={handleCart}>
            Add to cart
          </Button>
        </div>
      </div>

      <div className="mt-12 py-4">
        <TodaysSpecial />
      </div>
    </div>
  );
};

export default FoodDetailPage;
