
import Banners from "@/components/banners";
import FeaturedCategories from "@/components/featured-categories";
import FeaturedProducts from "@/components/featured-products";

export default function Home() {
    return (
        <main>
            <Banners />
            <FeaturedCategories />
            <FeaturedProducts />
        </main>
    );
}