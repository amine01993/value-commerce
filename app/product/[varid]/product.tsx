
import { Heading } from "@chakra-ui/react";
import style from "./product.module.scss";
import ProductRating from "@/components/product-rating";
import ProductSlider from "@/components/product-slider";
import ProductDetail from "@/components/product-detail";
import ProductSpecifications from "@/components/product-specifications";
import ProductDescription from "@/components/product-description";
import ProductReviews from "@/components/product-reviews";

interface ProductParams {
    varid: string;
}

export default function Product({varid}: ProductParams) {

    return (
        <main className={style.page}>
            <section>
                <Heading as="h1" size="lg">Ear Muffs Winter Ear warmers Fleece Earwarmer Men Women Behind the Head Band lot</Heading>
                <ProductRating />
                <ProductSlider />
            </section>
            <ProductDetail />
            <ProductSpecifications />
            <ProductDescription />
            <ProductReviews />
        </main>
    );
}