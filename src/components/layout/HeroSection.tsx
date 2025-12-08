"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/utils/Container";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const router = useRouter();
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
            <h1 className="text-4xl md:text-6xl text-center md:text-start font-heading max-w-xl text-background font-medium md:font-normal">
              Celebrate in Stunning Pakistani Fashion
            </h1>
            <p className=" text-center md:text-start mt-2 text-zinc-100">
              Vibrant colors, intricate details, and outfits made to shine at
              every event.
            </p>
          </div>
          <Button
            variant={"default"}
            size={"lg"}
            onClick={() => router.push("/shop")}
          >
            Explore the Collection <ArrowRight />
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
