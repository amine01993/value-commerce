
import { Heading } from "@chakra-ui/react";
import style from "./product-desktop.module.scss";
import ProductSlider from "@/components/product/slider/desktop";
import ProductRating from "@/components/product/rating/desktop";
import ProductDetail from "@/components/product/detail/desktop";
import ProductSpecifications from "@/components/product/specifications/desktop";
import ProductDescription from "@/components/product/description/desktop";
import ProductReviews from "@/components/product/reviews/desktop";

interface ProductParams {
    varid: string;
}

export default function ProductDesktop({varid}: ProductParams) {

    return (
        <main className={style.page}>
            <section className="detail">
                <ProductSlider />
                <div>
                    <Heading as="h1" size="xl">Ear Muffs Winter Ear warmers Fleece Earwarmer Men Women Behind the Head Band lot</Heading>
                    <ProductRating />
                    <ProductDetail />
                </div>
            </section>
            <ProductSpecifications />
            <ProductDescription />
            <ProductReviews />
        </main>
    );
}