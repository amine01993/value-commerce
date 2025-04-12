
import style from "./page.module.css";
import Banners from "@/components/banners";
import FeaturedCategories from "@/components/featured-categories";
import FeaturedProducts from "@/components/featured-products";

export default function Home() {
    return (
        <>
        <Banners />
        <FeaturedCategories />
        <FeaturedProducts />
        </>
    );
}