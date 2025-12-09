import Container from "@/components/utils/Container";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full h-[680px] md:h-[calc(100vh-70px)] ">
      <Image
        src="/images/hero-image.png"
        alt="Hero Background"
        fill
        className="object-cover object-center -z-10 hidden md:block"
      />
      <Image
        src="/images/mobile-hero-banner.png"
        alt="Hero Background Mobile"
        fill
        className="object-cover object-center -z-10 md:hidden"
      />
      <Container className="h-full flex flex-row items-center  justify-between">
        <div className="space-y-6 flex flex-col items-center md:items-start">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-6xl text-center md:text-start font-heading text-background font-medium md:font-normal">
              Clothing X – <br /> Celebrate in Stunning <br /> Pakistani Fashion
            </h1>
            <p className=" text-center md:text-start mt-2 text-zinc-100">
              Vibrant colors, intricate details, and outfits made to shine at
              every event. <strong>Clothing X</strong>
            </p>
          </div>
          <Link href="/shop">
            <Button variant={"default"} size={"lg"}>
              Explore the Collection <ArrowRight />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
