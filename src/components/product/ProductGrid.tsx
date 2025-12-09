import { Product } from "../../../sanity.types";
import Container from "../utils/Container";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ProductGridContent {
  title: string;
  description?: string;
  products: Product[];
}

const ProductGrid = ({ title, description, products }: ProductGridContent) => {
  return (
    <section className="py-16 bg-gray-100">
      <Container className="space-y-6">
        <div className="flex justify-between items-baseline">
          <div>
            <h1 className="text-2xl md:text-4xl font-heading font-medium">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {description}
            </p>
          </div>
        </div>

        <Carousel>
          <CarouselContent className="overflow-visible">
            {products.map((item) => (
              <CarouselItem
                key={item._id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 "
              >
                <ProductCard product={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden xl:flex" />
          <CarouselNext className="hidden xl:flex" />
        </Carousel>
      </Container>
    </section>
  );
};

export default ProductGrid;
