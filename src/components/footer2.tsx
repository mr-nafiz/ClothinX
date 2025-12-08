import { Logo, LogoImage, LogoText } from "@/components/logo";
import Container from "./utils/Container";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "/logo.png",
    alt: "Clothing_X logo",
    title: "",
    url: "/",
  },
  tagline = "Discover premium Pakistani 3-piece suits crafted with quality, elegance, and comfort. We bring you stylish designs for every occasion at affordable prices.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Shop", url: "/shop" },
        { text: "Best Selling", url: "#" },
        { text: "Hot Deals", url: "#" },
        { text: "Featured", url: "#" },
        { text: "New Arrivals", url: "#" },
        { text: "Categories", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },

        { text: "Contact", url: "#" },
        { text: "Privacy", url: "/privacy-policy" },
      ],
    },

    {
      title: "Social",
      links: [
        { text: "Facebook", url: "https://www.facebook.com/share/1BnpTyQZx3/" },
        {
          text: "Instagram",
          url: "https://www.instagram.com/cx_clothing_x?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        },
        { text: "YouTube", url: "https://www.youtube.com/@CLOTHING_X" },
        {
          text: "X",
          url: "https://x.com/BmMejba18544?t=-lZZxgkKfabZtaM90OE3OA&s=07 ",
        },
      ],
    },
  ],
  copyright = "© 2026 clothing-x.com All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "/terms_and_condition" },
    { text: "Privacy Policy", url: "/privacy_policy" },
  ],
}: Footer2Props) => {
  return (
    <section className="py-10">
      <Container>
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url="https://shadcnblocks.com">
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-8 dark:invert"
                  />
                  <LogoText className="text-xl">{logo.title}</LogoText>
                </Logo>
              </div>
              <p className="mt-4 text-muted-foreground">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </Container>
    </section>
  );
};

export { Footer2 };
