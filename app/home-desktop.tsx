
import BannersDesktop from "@/components/banners/desktop";
import FeaturedCategoriesDesktop from "@/components/featured-categories/desktop";
import FeaturedProductsDesktop from "@/components/featured-products/desktop";

export default function HomeDesktop() {
    return (
        <main>
            <BannersDesktop />
            <FeaturedCategoriesDesktop />
            <FeaturedProductsDesktop />
        </main>
    );
}