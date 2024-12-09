import Category from "@/container/products/category/category";
import ProductsList from "@/container/shop/productsList";

const ProductsPage = () => {
    return (
        <main>
            <div>
                <Category />
            </div>
            <ProductsList />
        </main>
    );
}

export default ProductsPage;