import { Button } from "@/components/ui/button";
import Container from "@/components/utils/Container";
import {
  MapPin,
  MessageCircleMoreIcon,
  MessageSquareDashedIcon,
  MessageSquareMore,
  MessagesSquare,
  Phone,
} from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className="py-20">
      <Container className=" flex flex-col items-center justify-center gap-32 py-40">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium ">
            Contact Our Frindly Team
          </h1>
          <p className="text-lg mt-4">Let us know how we can help</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white border rounded-lg p-4 h-60 flex flex-col justify-between">
            <Button variant={"outline"} size={"icon-lg"}>
              <MessageSquareMore className="size-6" />
            </Button>

            <div>
              <h3 className="text-xl font-medium">Chat to sale</h3>
              <p className="text-muted-foreground pb-2">
                Speak to our frindly team
              </p>
              <span className="underline cursor-pointer">
                clothingx@gmail.com
              </span>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4 h-60 flex flex-col justify-between">
            <Button variant={"outline"} size={"icon-lg"}>
              <MessagesSquare className="size-6" />
            </Button>

            <div>
              <h3 className="text-xl font-medium">Chat to support</h3>
              <p className="text-muted-foreground pb-2">We're here to help</p>
              <span className="underline cursor-pointer">
                support@clothingx.com
              </span>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4 h-60 flex flex-col justify-between">
            <Button variant={"outline"} size={"icon-lg"}>
              <MapPin className="size-6" />
            </Button>

            <div>
              <h3 className="text-xl font-medium">Visit Us</h3>
              <p className="text-muted-foreground pb-2">Visit our office HQ</p>
              <span className="underline cursor-pointer">
                view on google maps
              </span>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4 h-60 flex flex-col justify-between">
            <Button variant={"outline"} size={"icon-lg"}>
              <Phone className="size-6" />
            </Button>

            <div>
              <h3 className="text-xl font-medium">Call Us</h3>
              <p className="text-muted-foreground pb-2">
                Mon-Fri from 8am to 5pm
              </p>
              <span className="underline cursor-pointer">+88017885784574</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default page;
