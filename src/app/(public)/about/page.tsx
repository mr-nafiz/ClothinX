import { Container } from "lucide-react";

export const metadata = {
  title: "About Clothing X – Premium Pakistani Clothing & 3-Piece Suits",
  description:
    "Learn about Clothing X, your trusted store for premium Pakistani 3-piece suits, luxury lawn, chiffon, and embroidered dresses. Quality, comfort & style delivered worldwide.",
  keywords: [
    "About Clothing X",
    "Pakistani clothing brand",
    "Pakistani dresses online",
    "Clothing X story",
    "Luxury Pakistani suits",
  ],
  openGraph: {
    title: "About Clothing X – Pakistani Fashion Brand",
    description:
      "Discover the story behind Clothing X, offering premium Pakistani 3-piece suits and luxury embroidered dresses.",
    url: "https://clothing-x.com/about",
    siteName: "Clothing X",
    images: [
      {
        url: "https://clothing-x.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Clothing X",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Clothing X – Premium Pakistani Clothing",
    description:
      "Learn about Clothing X and our mission to deliver premium Pakistani suits to customers worldwide.",
    images: ["https://clothing-x.com/og-about.jpg"],
  },
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <section>
      <Container>
        <h1 className="text-3xl font-bold mb-4">About Clothing X</h1>

        <p className="mb-4 text-gray-700">
          Clothing X was founded with a commitment to bring premium Pakistani
          fashion to customers worldwide. Our collection features luxurious
          lawn, chiffon, and embroidered 3-piece suits designed for elegance,
          comfort, and everyday wear.
        </p>

        <p className="text-gray-700">
          At Clothing X, quality and customer satisfaction come first. We offer
          exclusive designs, affordable prices, and fast delivery to ensure a
          truly exceptional shopping experience at{" "}
          <strong>clothing-x.com</strong>.
        </p>
      </Container>
    </section>
  );
};

export default page;
