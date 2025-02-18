
"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { FaCartArrowDown } from "react-icons/fa";
import { useCartStore } from "../app/stores/cartStore";
import { ModeToggle } from "./ModeToogle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuthStore from "../app/stores/authStore";

const Navbar = () => {
  const router = useRouter();
  const { totalItems, clearCart } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const { isLoggedIn, logout, role } = useAuthStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State for sheet visibility

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => unsubscribe();
  }, []);

  if (!isHydrated) {
    return (
      <div className="p-4 sticky top-0 shadow-sm bg-background">
        <div className="container mx-auto h-10"></div>
      </div>
    );
  }

  const handleLogin = () => {
    router.push("/login");
    setIsSheetOpen(false); // Close sheet
  };

  const handleSignup = () => {
    router.push("/signup");
    setIsSheetOpen(false); // Close sheet
  };

  const handleLogout = () => {
    logout();
    clearCart();
    router.push("/");
    setIsSheetOpen(false); // Close sheet
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsSheetOpen(false); // Close sheet on navigation
  };

  return (
    <nav className="p-4 sticky top-0 shadow-sm dark:bg-slate-950 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {role === "admin" ? (
          <div className="flex w-full justify-end items-center">
            <div className="flex items-center space-x-4">
              <Button
                className="hover:bg-blue-500 hover:text-white transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <ModeToggle />
            </div>
          </div>
        ) : (
          <>
            <div className="logo text-2xl font-bold">Burger<span className="text-yellow-500">hub</span></div>
            <div className="hidden flex-1 md:flex justify-center space-x-6 text-sm">
              <Link href="/" className="hover:text-blue-500 transition duration-300">
                Home
              </Link>
              <Link href="/food" className="hover:text-blue-500 transition duration-300">
                Items
              </Link>
              <Link href="/contact" className="hover:text-blue-500 transition duration-300">
                Contact
              </Link>
              <Link
                href="/orderconfirmation/orderhistory"
                className="hover:text-blue-500 transition duration-300"
              >
                Orders
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4 mr-6">
              <div className="relative">
                <Link href="/cart" className="text-2xl relative">
                  <FaCartArrowDown />
                  {isLoggedIn && totalItems > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
              {isLoggedIn ? (
                <Button
                  className="hover:bg-blue-500 hover:text-white transition duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    className="hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button
                    className="hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleSignup}
                  >
                    Signup
                  </Button>
                </>
              )}
              <ModeToggle />
            </div>
          </>
        )}

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger>
            <div className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Biyash Blog</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col space-y-6 text-lg items-center">
                  <button onClick={() => handleNavigation("/")}>Home</button>
                  <button onClick={() => handleNavigation("/food")}>Foods</button>
                  <button onClick={() => handleNavigation("/contact")}>Contact</button>
                  <button onClick={() => handleNavigation("/orderconfirmation/orderhistory")}>
                    Orders
                  </button>
                  <div className="flex flex-col items-center space-y-4">
                    {isLoggedIn ? (
                      <Button onClick={handleLogout}>Logout</Button>
                    ) : (
                      <>
                        <Button onClick={handleLogin}>Login</Button>
                        <Button onClick={handleSignup}>Signup</Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
