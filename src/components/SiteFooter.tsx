const COLUMNS = [
  {
    title: "Support",
    links: [
      "Contact Us",
      "Rewards Scheme",
      "Delivery Information",
      "Warranty & Returns",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "Brand Directory",
      "Vape Discount Codes",
      "Black Friday",
      "Cyber Monday",
      "Store Finder",
      "Environment Policy",
      "Quality Policy",
    ],
  },
  {
    title: "Learn",
    links: [
      "Vaping Blogs",
      "Classic Vaping vs Sub-Ohm",
      "Vaping Top Tips",
      "Battery Safety",
      "Vaping Terms",
    ],
  },
  {
    title: "Shop",
    links: [
      "E-Liquid",
      "Classic Vape Kits",
      "Sub-Ohm Vape Kits",
      "Tanks",
      "Coils",
      "Accessories",
      "Best Sellers",
    ],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Terms & Conditions",
      "Cookie Policy",
      "Age Verification",
      "Direct Marketing Policy",
      "PECR Policy",
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#080f15] text-white">
      <div className="mx-auto max-w-[670px] px-4 py-9">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-bold mb-4 text-white/90">{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-white/60 hover:text-white transition-colors duration-[var(--duration-base)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/50">© 2026 Vapestore all rights reserved</p>
        </div>
      </div>
    </footer>
  );
}