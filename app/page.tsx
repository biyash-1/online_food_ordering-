"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TodaysSpecial from "@/components/Todays";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const services = [
    {
      image: "/delivery.jpg",
      title: "Fast Delivery",
      description: "Get your food delivered to your doorstep in record time. We prioritize speed without compromising quality.",
    },
    {
      image: "/easypayment.jpg",
      title: "Easy Payment Methods",
      description: "Enjoy hassle-free payments with multiple options, including credit/debit cards, digital wallets, and cash on delivery.",
    },
    {
      image: "/ordertracking.jpg",
      title: "Real-Time Order Tracking",
      description: "Track your order in real-time from the restaurant to your location. Know exactly when your food will arrive.",
    },
  ];

  return (
    <>
      <div className="min-h-[90vh] flex flex-col justify-center items-center pt-16 md:pt-0">
        <section className="landing flex flex-col md:flex-row justify-around items-center gap-2 md:gap-14">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Enjoy the Best <span className="text-yellow-700">Burger</span> in <br className="md:hidden" /> the Town!
            </h1>
            <p className="text-base md:text-lg mb-4 max-w-[400px]">
              Craving something delicious? Our burgers are made with the finest ingredients, crafted to perfection just for you. Come take a bite of the best flavors in town!
            </p>
            <Button>Explore now</Button>
          </div>
          <div className="flex justify-center mt-2 md:mt-0">
            <Image src={"/burger2.png"} height={400} width={350} alt="Burger Image" />
          </div>
        </section>
      </div>

      <TodaysSpecial />

      <section className="cheif h-screen mx-auto mt-12 py-7">
        <h1 className="text-center text-2xl font-semibold mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center px-4">
          {services.map((service, index) => (
            <Card key={index} className="w-full max-w-[300px] h-[400px] flex flex-col  justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-[300px] w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  layout="fill"
                  
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold ">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}