"use client"
import { useEffect, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { fetchAllOrders, fetchFalseOrders, fetchTrueOrders } from "@/apis/services/orders/orders.services"
import { toJalaali } from 'jalaali-js';
import { fetchByIdUser } from "@/apis/services/users/userById.services";
import { useQuery } from "@tanstack/react-query";
import ViewOrders from "@/container/orders/viewOrders";

type User = {
    firstname: string;
    lastname: string;
};

const Orders = () => {

    const [users, setUsers] = useState<Record<string, User>>({});
    const [currentPage, setCurrentPage] = useState(1);

    const { data: orders } = useQuery({
        queryKey: ['repoDataAllOrders', currentPage],
        queryFn: () => fetchAllOrders(currentPage),
    });

    const { data: trueOrders } = useQuery({
        queryKey: ['repoDataTrueOrders'],
        queryFn: () => fetchTrueOrders()
    })
    const { data: falseOrders } = useQuery({
        queryKey: ['repoDataFalseOrders'],
        queryFn: () => fetchFalseOrders()
    })

    useEffect(() => {
        const fetchUsers = async () => {
            if (orders) {
                try {
                    if (orders.data?.orders) {
                        const userIds = [...new Set(orders.data.orders.map((order) => order.user))];
                        const userPromises = userIds.map((userId) =>
                            fetchByIdUser(userId).then((userData) => ({ userId, userData }))
                        );
                        const usersData = await Promise.all(userPromises);
                        const usersMap: Record<string, User> = {};
                        usersData.forEach(({ userId, userData }) => {
                            usersMap[userId] = userData.data.user;
                        });
                        setUsers(usersMap);

                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
        };

        fetchUsers();
    }, [orders]);
    //  Formatted Date
    const formattedDate = (date: string): string => {
        const gregorianDate = new Date(date);
        const jalaaliDate = toJalaali(gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, gregorianDate.getDate());
        return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
    };

    const handleNextPage = () => {
        if (currentPage < (orders?.total_pages ?? 1)) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
    return (
        <div className="w-full h-full md:h-screen">
            <div className="w-full h-full flex justify-center items-center">
                <Tabs defaultValue="Orders" className="w-[900px] max-w-[900px] h-80 border rounded-lg shadow-md">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="Orders awaiting shipment" className="font-DanaDemiBold">سفارشات در انتظار ارسال</TabsTrigger>
                        <TabsTrigger value="OrdersSent" className="font-DanaDemiBold">سفارشات ارسال شده</TabsTrigger>
                        <TabsTrigger value="Orders" className="font-DanaDemiBold">همه سفارشات</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Orders awaiting shipment" className="h-[85%] overflow-y-scroll">
                        <div className=" sm:rounded-lg h-full">
                            <table className="w-full  text-sm text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="sticky top-0 bg-slate-600 text-white">
                                        <th scope="col" className="px-6 py-3 font-DanaDemiBold dark:text-white border">
                                            وضعیت سفارش
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-DanaDemiBold dark:text-white border">
                                            زمان ثبت سفارش
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-DanaDemiBold dark:text-white border">
                                            مجموع مبلغ
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-DanaDemiBold dark:text-white border">
                                            نام کاربر
                                        </th>
                                    </tr>
                                </thead>
                                {falseOrders && falseOrders.data.orders.length > 0 ? (
                                    falseOrders.data.orders
                                        .map((order) => (
                                            <tr className="child:border child:text-center child:py-2" key={order._id}>
                                                <td>
                                                    <ViewOrders id={order._id} />
                                                </td>
                                                <td>{formattedDate(order.deliveryDate)}</td>
                                                <td className="flex items-center justify-center gap-x-1">
                                                    <span>تومان</span>
                                                    <span>{Number(order.totalPrice).toLocaleString()}</span>
                                                </td>
                                                <td className="font-medium">{users[order.user]
                                                    ? `${users[order.user].firstname} ${users[order.user].lastname}`
                                                    : "نامشخص"}</td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            سفارشات در انتظار ارسال یافت نشد.
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </div>
                    </TabsContent>
                    <TabsContent value="OrdersSent" className="h-[85%] overflow-y-scroll">
                        <div className="sm:rounded-lg h-full">
                            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="sticky top-0 bg-slate-600 text-white">
                                        <th scope="col" className="px-6 py-3 font-DanaDemiBold dark:text-white border">
                                            وضعیت سفارش
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-DanaDemiBold dark:text-white border">
                                            زمان ثبت سفارش
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-DanaDemiBold dark:text-white border">
                                            مجموع مبلغ
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-DanaDemiBold dark:text-white border">
                                            نام کاربر
                                        </th>
                                    </tr>
                                </thead>
                                {trueOrders && trueOrders?.data.orders.length > 0 ? (
                                    trueOrders.data.orders
                                        .map((order) => (
                                            <tr className="child:border child:text-center child:py-2" key={order._id}>
                                                <td className="text-green-800">
                                                    <ViewOrders id={order._id} />
                                                </td>
                                                <td>{formattedDate(order.deliveryDate)}</td>
                                                <td className="flex items-center justify-center gap-x-1">
                                                    <span>تومان</span>
                                                    <span>{Number(order.totalPrice).toLocaleString()}</span>
                                                </td>
                                                <td className="font-medium">{users[order.user]
                                                    ? `${users[order.user].firstname} ${users[order.user].lastname}`
                                                    : "نامشخص"}</td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            سفارشات در انتظار ارسال یافت نشد.
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </div>
                    </TabsContent>
                    <TabsContent value="Orders" className="overflow-auto">
                        <div className="relative overflow-x-auto sm:rounded-lg">
                            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-2 font-DanaDemiBold dark:text-white border">
                                            وضعیت سفارش
                                        </th>
                                        <th scope="col" className="px-4 py-2 font-DanaDemiBold dark:text-white border">
                                            زمان ثبت سفارش
                                        </th>
                                        <th scope="col" className="px-4 py-2 font-DanaDemiBold dark:text-white border">
                                            مجموع مبلغ
                                        </th>
                                        <th scope="col" className="px-4 py-2 font-DanaDemiBold dark:text-white border">
                                            نام کاربر
                                        </th>
                                    </tr>
                                </thead>
                                {orders && orders.data.orders.length > 0 ? (
                                    orders.data.orders
                                        .map((order) => (
                                            <tr className="child:border child:text-center child:py-2" key={order._id}>
                                                <td className="w-36">
                                                    <ViewOrders id={order._id} />
                                                </td>
                                                <td>{formattedDate(order.deliveryDate)}</td>
                                                <td className="flex items-center justify-center gap-x-1">
                                                    <span>تومان</span>
                                                    <span>{Number(order.totalPrice).toLocaleString()}</span>
                                                </td>
                                                <td className="font-medium">{users[order.user]
                                                    ? `${users[order.user].firstname} ${users[order.user].lastname}`
                                                    : "نامشخص"}</td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            سفارشات در انتظار ارسال یافت نشد.
                                        </td>
                                    </tr>
                                )}
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}>
                                            <div className="text-center my-2">
                                                <button
                                                    onClick={handleNextPage}
                                                    disabled={currentPage === orders?.total_pages}
                                                    className="px-4 py-2 bg-gray-200 disabled:bg-gray-400 rounded"
                                                >
                                                    صفحه بعد
                                                </button>
                                                <span className="inline-block mx-2">صفحه {currentPage} از {orders?.total_pages}</span>
                                                <button
                                                    onClick={handlePreviousPage}
                                                    disabled={currentPage === 1}
                                                    className="px-4 py-2 bg-gray-200 disabled:bg-gray-400 rounded"
                                                >
                                                    صفحه قبل
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Orders;