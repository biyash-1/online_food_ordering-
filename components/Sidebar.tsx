"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { MdDashboard, MdAddShoppingCart, MdList, MdShoppingCart } from "react-icons/md"; // Import icons
import Useritem from "./UserItem";

interface SidebarProps {
  setActiveComponent: (
    component: "dashboard" | "addProduct" | "listProducts" | "listOrder"
  ) => void;
}

const Sidebar = ({ setActiveComponent }: SidebarProps) => {
  return (
    <div className="w-1/6 h-screen border-r shadow-xl">
      <Useritem />
      <Command className="p-2">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="p-2 mt-2">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => setActiveComponent("dashboard")}
              className="flex items-center text-lg gap-2"
            >
              <MdDashboard className="text-xl" /> Dashboard
            </CommandItem>
            <CommandItem
              onSelect={() => setActiveComponent("addProduct")}
              className="flex items-center text-lg gap-2"
            >
              <MdAddShoppingCart className="text-xl" /> Add Product
            </CommandItem>
            <CommandItem
              onSelect={() => setActiveComponent("listProducts")}
              className="flex items-center text-lg gap-2"
            >
              <MdList className="text-xl" /> Products
            </CommandItem>
            <CommandItem
              onSelect={() => setActiveComponent("listOrder")}
              className="flex items-center text-lg gap-2"
            >
              <MdShoppingCart className="text-xl" /> Orders
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
};

export default Sidebar;
