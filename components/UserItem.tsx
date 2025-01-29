import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Useritem = () => {
  return (
    <div className='flex   border-2 items-center gap-3 rounded-l-xl py-4 px-3 w-full'>
      <Avatar className=''>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className='flex flex-col items-start'>
        <span className='text-xl'>Admin</span>
        <span className='text-sm'>biyash12@gmail.com</span>
      </div>
    </div>
  );
};

export default Useritem;
