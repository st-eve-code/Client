import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FavouritesContent } from "@/components/FavouritesContent";

export const metadata = {
  title: "Favourites",
};

export default function FavouritesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col flex-1">
        <FavouritesContent />
      </main>
      <SiteFooter />
    </>
  );
}
