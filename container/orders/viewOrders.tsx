import { toJalaali } from 'jalaali-js';
import { editOrderById, fetchOrderById } from "@/apis/services/orders/orders.services"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from 'react-hot-toast';

const ViewOrders = ({ id }: { id: string }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (deliveryStatus: boolean) => editOrderById(id, deliveryStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['repoDataAllOrders'] });
            queryClient.invalidateQueries({ queryKey: ['repoDataTrueOrders'] });
            queryClient.invalidateQueries({ queryKey: ['repoDataFalseOrders'] });
            toast.success("سفارش با موفقیت ارسال شد✨");
        },
        onError: () => {
            toast.error("دوباره تلاش کنید");
        },
    });

    const { isPending, error, data } = useQuery({
        queryKey: ['repoDataOrderById', id],
        queryFn: () => fetchOrderById(id)
    });

    if (isPending) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    if (!data || !data.data || !data.data.order) {
        return <div>No data found</div>;
    }

    const order = data.data.order;

    //  Formatted Date
    const formattedDate = (date: string): string => {
        const gregorianDate = new Date(date);
        const jalaaliDate = toJalaali(gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, gregorianDate.getDate());
        return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
    };

    const handelEditOrder = () => {
        const newDeliveryStatus = !order.deliveryStatus;
        mutation.mutate(newDeliveryStatus);
    };

    return (
        <div className="">
            <Dialog>
                <DialogTrigger>بررسی سفارش</DialogTrigger>
                <DialogContent className="text-right">
                    <DialogHeader>
                        <DialogTitle className="text-right pt-6">
                            بررسی سفارش کاربر {order.user.firstname} {order.user.lastname}
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        <div>
                            <p>آدرس : {order.user.address}</p>
                            <p>تلفن : {order.user.phoneNumber}</p>
                            <p>زمان تحویل : {formattedDate(order.deliveryDate)}</p>
                            <p>زمان سفارش : {formattedDate(order.createdAt)}</p>
                        </div>
                        <div className='py-2 max-h-80 overflow-y-scroll'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='child:text-center bg-teal-500 text-gray-700 sticky top-0'>
                                        <th>کالا</th>
                                        <th>قیمت</th>
                                        <th>تعداد</th>
                                    </tr>
                                </thead>
                                <tbody className='child:border-2'>
                                    {order.products.map((item : OrderProduct) => (
                                        <tr key={item._id} className='child:text-center child:py-1 child:border-2'>
                                            <td>{item.product.name}</td>
                                            <td>{item.product.price.toLocaleString()} تومان</td>
                                            <td>{item.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='py-2'>مجموع کل خرید : {Number(data.data.order.totalPrice).toLocaleString()}</p>
                            {order.deliveryStatus === false ? (
                                <button onClick={handelEditOrder} className='text-red-500 border rounded-lg py-1 px-2'>در انتظار ارسال</button>
                            ) : (
                                <p className='text-green-500 py-1 px-2'>سفارش ارسال شده است.</p>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ViewOrders;