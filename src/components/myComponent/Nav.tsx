"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

import { Logo, Sun, MenuBar } from "./icons"

import { Avatar, AvatarFallback } from "../ui/avatar"
import { IUser } from "@/type"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "../ui/menubar"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "../ui/separator"
import { account } from "@/lib/appwrite/config"
import { Loader2 } from "lucide-react"


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Kebutuhan Keamanan",
    href: "/kebutuhan-keamanan",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    title: "Praktik Keamanan",
    href: "/praktik-keamanan",
    description:
      "For sighted users to preview content available behind a link.",
  }
]

interface NavProps {
  user: IUser | null;
}

export default function Nav({ user }: NavProps) {
  // Ambil User Name, ambil awal huruf, 2case: jika 1 kata(2 huruf pertama), 2 kata (ambil awal kata)
  const userName = user?.name || "";
  const initials = userName
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const [loading, setLoading] = React.useState(false); // State to manage loading state

  async function handleLogout() {
    setLoading(true); // Set loading state to true

    try {
      await account.deleteSession("current");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div className="container flex h-14 max-w-screen-2xl items-center">

      {/* Mobile */}
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost"><MenuBar /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="pt-3">
            <SheetHeader>
              <SheetTitle className="mt-0 mb-4 text-left flex"><Logo />&nbsp; Risk Management</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-3">
              <a href="/kategori-aset">Kategori Aset</a>
              <a href="/aset-kritis">Aset Kritis</a>
              <a href="/komponen-aset">Komponen Aset</a>
              <Separator />
              <a href="/kebutuhan-keamanan">Kebutuhan Keamanan</a>
              <a href="/praktik-keamanan">Praktik Keamanan</a>
              <Separator />
              <a href="/kategori-ancaman">Kategori Ancaman</a>
              <a href="/identifikasi-ancaman">Identifikasi Ancaman</a>
              <Separator />
              <a href="/kelemahan-organisasi">Kelemahan Organisasi</a>
            </div>
          </SheetContent>
        </Sheet>
      </button>


      {/* Desktop */}
      <div className="mr-4 hidden md:flex">
        {/* Desktop Icon app */}
        <a href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
          <Logo />
          <span className="hidden font-bold lg:inline-block">Manage Risk</span>
        </a>
        {/* Desktop Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Aset</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-full md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr]">
                  <ListItem href="/kategori-aset" title="Kategori Aset" className="border-2 hover:bg-accent">
                    Lorem ipsum dolor sit, amet consectetur adipisicing.
                  </ListItem>
                  <ListItem href="/aset-kritis" title="Aset Kritis" className="border-2 hover:bg-accent">
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                  </ListItem>
                  <ListItem href="/komponen-aset" title="Komponen Aset" className="border-2 hover:bg-accent">
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Keamanan</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Ancaman</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-full md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  <ListItem href="/kategori-ancaman" title="Kategori Ancaman">
                    Lorem ipsum dolor sit, amet consectetur adipisicing.
                  </ListItem>
                  <ListItem href="/identifikasi-ancaman" title="Identifikasi Ancaman">
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/docs">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Kelemahan Organisasi
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>


      {/* Mobile & Desktop: Icons Profile and Theme */}
      <div className="flex flex-1 items-center justify-end md:justify-end">
        <Menubar>
          <MenubarMenu>
            {/* profile pic and Profile Name */}
            <MenubarTrigger>
              <Avatar className="hover:bg-accent hover:p-2">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent className="absolute right-[-3rem]">
              <MenubarItem className="font-bold">
                {user?.name}
              </MenubarItem>
              <MenubarItem className="font-light">
                {user?.email}
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Button
                  variant={"destructive"}
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : ("Logout")}
                </Button>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            {/* light mode dark mode */}
            <MenubarTrigger className="rounded-full m-0 ml-0 p-2 hover:bg-accent">
              <Sun />
            </MenubarTrigger>
            <MenubarContent className="absolute right-[-3rem]">
              <MenubarItem>Light</MenubarItem>
              <MenubarItem>Dark</MenubarItem>
              <MenubarItem>System</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  )
}



const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"