"use client"
import { useEffect, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { fetchOrders } from "@/apis/services/orders/orders.services"
import { toJalaali } from 'jalaali-js';
import { fetchByIdUser } from "@/apis/services/users/userById.services";

type User = {
    firstname: string;
    lastname: string;
};

const Orders = () => {

    const [orders, setOrders] = useState<order[] | null>(null);
    const [users, setUsers] = useState<Record<string, User>>({});

    useEffect(() => {
        const getOrders = async () => {
            const fetchedOrders = await fetchOrders();
            if (fetchedOrders?.data?.orders) {
                setOrders(fetchedOrders.data.orders);
                const userIds = [...new Set(fetchedOrders.data.orders.map((order: order) => order.user))];
                const userPromises = userIds.map((userId) =>
                    fetchByIdUser(userId).then((userData) => ({ userId, userData }))
                );
                const usersData = await Promise.all(userPromises);
                const usersMap: Record<string, User> = {};
                usersData.forEach(({ userId, userData }) => {
                    usersMap[userId] = userData.data.user;
                });
                setUsers(usersMap);
                console.log(usersMap);

            }
        };
        getOrders();
    }, []);
    const formattedDate = (date: string): string => {
        const gregorianDate = new Date(date);
        const jalaaliDate = toJalaali(gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, gregorianDate.getDate());
        return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
    };
    return (
        <div className="w-full h-full md:h-screen">
            <div className="w-full h-full flex justify-center items-center">
                <Tabs defaultValue="Orders" className="w-[900px] max-w-[900px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="Orders awaiting shipment" className="font-DanaDemiBold">سفارشات در انتظار ارسال</TabsTrigger>
                        <TabsTrigger value="OrdersSent" className="font-DanaDemiBold">سفارشات ارسال شده</TabsTrigger>
                        <TabsTrigger value="Orders" className="font-DanaDemiBold">همه سفارشات</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Orders awaiting shipment">
                        <Table className="border-2 rounded-lg">
                            <TableCaption className="py-2 font-DanaDemiBold">سفارشات در انتظار ارسال</TableCaption>
                            <TableHeader>
                                <TableRow className="child:border-l-2">
                                    <TableHead className="text-center">عملیات</TableHead>
                                    <TableHead className="text-center">زمان ثبت سفارش</TableHead>
                                    <TableHead className="text-center">مجموع مبلغ</TableHead>
                                    <TableHead className="text-center">نام کاربر</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-center">
                                {orders && orders.length > 0 ? (
                                    orders
                                        .filter((order) => !order.deliveryStatus)
                                        .map((order) => (
                                            <TableRow className="child:border-l-2" key={order._id}>
                                                <TableCell>
                                                    <button className="border  py-1 px-2 rounded-lg bg-red-300" title="تغییر وضعیت به ارسال شده">{order.deliveryStatus ? "ارسال شده" : "در انتظار ارسال"}</button>
                                                </TableCell>
                                                <TableCell>{formattedDate(order.deliveryDate)}</TableCell>
                                                <TableCell>{order.totalPrice} تومان</TableCell>
                                                <TableCell className="font-medium">{users[order.user]
                                                    ? `${users[order.user].firstname} ${users[order.user].lastname}`
                                                    : "نامشخص"}</TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            سفارشات در انتظار ارسال یافت نشد.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="OrdersSent">
                        <Table className="border-2 rounded-lg">
                            <TableCaption className="py-2 font-DanaDemiBold">سفارشات ارسال شده</TableCaption>
                            <TableHeader>
                                <TableRow className="child:border-l-2">
                                    <TableHead className="text-center">عملیات</TableHead>
                                    <TableHead className="text-center">زمان ثبت سفارش</TableHead>
                                    <TableHead className="text-center">مجموع مبلغ</TableHead>
                                    <TableHead className="text-center">نام کاربر</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-center">
                                {orders && orders.length > 0 ? (
                                    orders
                                        .filter((order) => order.deliveryStatus)
                                        .map((order) => (
                                            <TableRow className="child:border-l-2" key={order._id}>
                                                <TableCell className="text-green-800">
                                                    {order.deliveryStatus ? "ارسال شده" : "در انتظار ارسال"}✔
                                                </TableCell>
                                                <TableCell>{formattedDate(order.deliveryDate)}</TableCell>
                                                <TableCell>{order.totalPrice} تومان</TableCell>
                                                <TableCell className="font-medium">{users[order.user]
                                                    ? `${users[order.user].firstname} ${users[order.user].lastname}`
                                                    : "نامشخص"}</TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            سفارشات در انتظار ارسال یافت نشد.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="Orders">
                        <Table className="border-2 rounded-lg text-center">
                            <TableCaption className="font-DanaDemiBold">لیست همه سفارشات</TableCaption>
                            <TableHeader>
                                <TableRow className="child:text-center">
                                    <TableHead className="w-[100px]">عملیات</TableHead>
                                    <TableHead>زمان ثبت سفارش</TableHead>
                                    <TableHead>مجموع مبلغ</TableHead>
                                    <TableHead className="text-right">نام کاربر</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders && orders.length > 0 ? (
                                    orders
                                        .map((order) => (
                                            <TableRow className="child:border-l-2" key={order._id}>
                                                <TableCell className="w-36">
                                                    {order.deliveryStatus ? "ارسال شده" : "در انتظار ارسال"}
                                                </TableCell>
                                                <TableCell>{formattedDate(order.deliveryDate)}</TableCell>
                                                <TableCell>{order.totalPrice} تومان</TableCell>
                                                <TableCell className="font-medium">{users[order.user]
                                                    ? `${users[order.user].firstname} ${users[order.user].lastname}`
                                                    : "نامشخص"}</TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            سفارشات در انتظار ارسال یافت نشد.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Orders;