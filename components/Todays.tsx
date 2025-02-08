import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {String(error)}</p>;

  return (
    <section className="mx-auto md:h-[80vh] mt-12 py-7 px-4">
    <h1 className="text-center text-2xl font-semibold mb-8">Today's Special</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
      {data?.map((foodItem) => (
        <Card
          key={foodItem.id}
          className="w-full max-w-[300px] min-h-[400px] flex flex-col justify-between shadow-lg  hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:bg-slate-900 cursor-pointer"
          onClick={() => router.push(`/food/${foodItem.id}`)}
        >
            <CardHeader>
          <div className="relative h-[250px] w-full">
            <Image
              src={foodItem.image}
              alt={foodItem.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              />
          </div>
              </CardHeader>
              <CardContent className="text-center">
            <CardTitle className="text-xl font-bold">{foodItem.name}</CardTitle>
            <p className="text-lg font-bold dark:text-yellow-400">${foodItem.reviewCount}</p>
            <p className="text-sm text-gray-400">⭐ {foodItem.reviewCount} Reviews</p>
              </CardContent>
            
          <CardFooter className="flex justify-center p-4">
            <Button>Order now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </section>
  
  );
};

export default TodaysSpecial;
