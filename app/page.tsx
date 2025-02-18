"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TodaysSpecial from "@/components/Todays";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

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

  const faqs = [
    {
      question: "Do you offer vegetarian options?",
      answer: "Yes, we have a variety of vegetarian options available. You can find them in our menu under the 'Vegetarian' section.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you will receive a tracking link via SMS or email. You can also track your order directly on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, digital wallets like PayPal and Google Pay, and cash on delivery.",
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel your order within 5 minutes of placing it. After that, the order will be processed and cannot be canceled.",
    },
  ];

  return (
    <main className="overflow-x-hidden">
      <div className="min-h-[90vh] flex flex-col justify-center items-center pt-16 md:pt-0 px-4 md:px-6">
        <section className="landing flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-6xl">
          <div className="w-full md:w-auto text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Enjoy the Best <span className="text-yellow-700">Burger</span> in <br className="md:hidden" /> the Town!
            </h1>
            <p className="text-base md:text-lg mb-4 max-w-[400px] mx-auto md:mx-0">
              Craving something delicious? Our burgers are made with the finest ingredients, crafted to perfection just for you. Come take a bite of the best flavors in town!
            </p>
            <Button className="bg-yellow-500">Explore now</Button>
          </div>
          <div className="w-full md:w-auto flex justify-center mt-2 md:mt-0">
            <Image 
              src="/burger2.png" 
              height={400} 
              width={350} 
              alt="Burger Image"
              className="max-w-full h-auto" 
            />
          </div>
        </section>
      </div>

      <TodaysSpecial />

      <section className="py-16 px-4 md:px-6">
        <h1 className="text-center text-2xl font-semibold mb-8">Our Services</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -150 : 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="w-full"
            >
              <Card className="h-[400px] mx-auto flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 dark:hover:bg-slate-900 hover:bg-gray-300 cursor-pointer">
                <div className="relative h-[250px] w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-6 max-w-4xl mx-auto mb-16">
        <h1 className="text-center text-2xl font-semibold mb-8">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-20 px-4 md:px-6 min-h-[60vh] ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Get exclusive deals, updates, and delicious offers straight to your inbox!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-700 w-full md:w-auto"
            />
            <Button className="bg-yellow-700 hover:bg-yellow-800 w-full md:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Burger Palace</h3>
            <p className="text-sm text-gray-300">
              Serving the best burgers since 2015. Quality ingredients, unforgettable taste.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>123 Burger Street</li>
              <li>New York, NY 10001</li>
              <li>Tel: (555) 123-4567</li>
              <li>Email: info@burgerpalace.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300 transition-colors">Facebook</a>
              <a href="#" className="hover:text-yellow-300 transition-colors">Instagram</a>
              <a href="#" className="hover:text-yellow-300 transition-colors">Twitter</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Burger Palace. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}