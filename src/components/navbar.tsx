import React from 'react'
import { Menu } from 'lucide-react';
import Image from 'next/image';
import logo from '/public/next.svg'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
  import Link from "next/link";
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  
function navbar() {

    const components: { title: string; href: string; description: string }[] = [
        {
          title: "All products",
          href: "/docs/primitives/alert-dialog",
          description:
            "A modal dialog that interrupts the user with important content and expects a response.",
        },
        {
          title: "mac",
          href: "/docs/primitives/hover-card",
          description:
            "For sighted users to preview content available behind a link.",
        },
        {
          title: "iphone",
          href: "/docs/primitives/progress",
          description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
        },
        {
          title: "macbook",
          href: "/docs/primitives/scroll-area",
          description: "Visually or semantically separates content.",
        },
        {
          title: "ipad",
          href: "/docs/primitives/tabs",
          description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
        },
        {
          title: "Tooltip",
          href: "/docs/primitives/tooltip",
          description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        },
      ]
    
  return (
    <div className="flex w-full justify-between py-4">
         <Image
            className='md:hidden'
            src={logo}
            alt="Next.js Logo"
            width={80} // Adjust width as needed
            height={80} // Adjust height as needed
            />
        <Sheet>
            <SheetTrigger className='md:hidden' ><Button size={'icon'} variant={'outline'}><Menu/></Button></SheetTrigger>
            <SheetContent className='md:hidden'>
                <SheetHeader>
                <SheetTitle className='text-left'>
                Menu
                </SheetTitle>
                <SheetDescription>
                <ul className="grid w-full gap-3  text-left grid-cols lg:w-[600px] ">
                {components.map((component) => (
                    <a
                        className='hover:bg-gray-700 py-2 px-2  rounded-sm capitalize' 
                    key={component.title}
                    href={component.href}
                    >
                    {component.title}
                    </a>
                ))}
                </ul>
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
      <NavigationMenu className='md:block hidden'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
             Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Store</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] text-left grid-cols lg:w-[600px] ">
              {components.map((component) => (
                <a
                    className='hover:bg-gray-700 py-2 px-2  rounded-sm capitalize' 
                  key={component.title}
                  href={component.href}
                  >
                  {component.title}
                </a>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <div className=" items-center justify-center gap-2 max-w-[400px] md:flex hidden ">
        <Input
          type="text"
          className="placeholder:capitalize"
          placeholder="What would you like to search for?"
        />
        <Button
          variant={"default"}
          size={"sm"}
          className="capitalize"
        >
          Search
        </Button>
      </div>
      </div>
  )
}

export default navbar