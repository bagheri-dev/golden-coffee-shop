import useCartStore from "@/store/cart";
import { CartItems } from "@/types/products/catr";
import Image from "next/image";
import Link from "next/link";

const RowItem = ({ id, title, image, price, quantity }: CartItems) => {
    const { removeFromCart, updateQuantity } = useCartStore()

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
        } else {
            updateQuantity(id, newQuantity);
        }
    };

    const handleRemove = () => {
        removeFromCart(id);
    };

    return (
        <tr key={id} className="child:text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
                <Image src={`http://localhost:8000/images/products/images/${image}`} alt={title} width={200} height={200} />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <Link href={`/shop/${id}`}>{title}</Link>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                    <button
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                        type="button"
                        onClick={() => handleQuantityChange(quantity - 1)}
                    >
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg px-2.5 py-1"
                    />
                    <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                        type="button"
                        onClick={() => handleQuantityChange(quantity + 1)}
                    >
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {Number(price).toLocaleString()}
            </td>
            <td className="px-6 py-4">
                <button onClick={handleRemove} className="font-medium text-red-600 dark:text-red-500 hover:underline">حذف</button>
            </td>
        </tr>
    );
}

export default RowItem;