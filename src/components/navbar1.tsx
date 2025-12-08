import { Menu } from "lucide-react";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Container from "./utils/Container";
import CartIcon from "./CartIcon";
import * as Icons from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignIn } from "./SignIn";
import SearchBox from "./SearchBox";
import { client } from "@/sanity/lib/client";

const categories = await client.fetch(`
      *[_type == "category"]{
      "slug": slug.current,
      name,
      description,
      "icon": icon,
      }
    `);

interface MenuItem {
  name: string;
  slug?: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = async ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
    title: "",
  },
  menu = [
    { name: "Home", slug: "/" },
    {
      name: "Shop",
      slug: "/shop",
    },
    {
      name: "Categories",

      items: categories,
    },
    {
      name: "About Us",
      slug: "/about",
    },
    {
      name: "Contact Us",
      slug: "/contact",
    },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
}: Navbar1Props) => {
  const user = await currentUser();

  return (
    <section className="fixed top-0 w-full py-4 border-b bg-white z-100">
      <Container>
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-6 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <SearchBox />
            <CartIcon />

            <ClerkLoaded>
              <SignedIn>
                <UserButton />
              </SignedIn>
              {!user && <SignIn />}
            </ClerkLoaded>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden space-y-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-6 dark:invert"
                alt={logo.alt}
              />
            </Link>
            <div className="flex items-center gap-2">
              <CartIcon />

              <ClerkLoaded>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                {!user && <SignIn />}
              </ClerkLoaded>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto mt-28  ">
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <SearchBox />
        </div>
      </Container>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.name}>
        <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.name} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.name}>
      <NavigationMenuLink
        href={item.slug}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.name}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.name} value={item.name} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.name}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.name} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.name}
      href={item.slug || "#"}
      className="text-md font-semibold"
    >
      {item.name}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  const Icon = Icons[
    item.icon as keyof typeof Icons
  ] as React.ComponentType<any>;
  return (
    <Link
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={`/category/${item.slug}`}
    >
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          {Icon && <Icon className="inline mr-2 text-foreground w-4 h-4" />}
          {item.name}
        </div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar1 };
