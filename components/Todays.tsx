import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Food {
  id: number;
  name: string;
  price: string;
  image: string;
  reviewCount: string;
}

const TodaysSpecial: React.FC = () => {
  const router = useRouter();

  const fetchData = async (): Promise<Food[]> => {
    const response = await fetch("https://dummyjson.com/recipes");
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    return data.recipes.slice(0, 3);
  };

  const { data, isLoading, error } = useQuery<Food[]>({
    queryKey: ["todaysSpecial"],
    queryFn: fetchData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  return (
    <section className="h-auto mx-auto">
      <div className="text-xl mx-auto max-w-screen-lg">
        <h1 className="text-center text-2xl font-semibold mb-6">Today's Special</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {data?.map((foodItem) => (
            <Card
              key={foodItem.id}
              className="w-[300px] rounded-lg border shadow-md hover:bg-slate-900 flex flex-col items-center justify-center mx-auto cursor-pointer"
              onClick={() => router.push(`/food/${foodItem.id}`)}
            >
                <CardHeader>
            <div>

              <Image
                src={foodItem.image}
                alt={foodItem.name}
                width={300}
                height={100}
                objectFit="cover"
                className=" object-contain rounded-t-lg w-[500px]"
              />
            </div>
                </CardHeader>
              <CardContent className="text-center p-4">
                <CardTitle>{foodItem.name}</CardTitle>
                <p>{foodItem.price}$</p>
                <p>Reviews: {foodItem.reviewCount}</p>
              </CardContent>
              <CardFooter className="flex justify-center p-4">
                <Button>Order now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodaysSpecial;
