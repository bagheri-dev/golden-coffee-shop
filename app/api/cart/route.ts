import fs from "fs";
import path from "path";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface User {
  userId: string;
  cart: CartItem[];
}

const cartFilePath = path.join(process.cwd(), "app", "data", "cart.json");

const getCartByUserId = (userId: string): CartItem[] => {
  const data = JSON.parse(fs.readFileSync(cartFilePath, "utf8")) as {
    users: User[];
  };
  const userCart = data.users.find((user) => user.userId === userId);
  return userCart ? userCart.cart : [];
};

const saveCartForUser = (userId: string, cart: CartItem[]): void => {
  const data = JSON.parse(fs.readFileSync(cartFilePath, "utf8")) as {
    users: User[];
  };
  const userIndex = data.users.findIndex((user) => user.userId === userId);

  if (userIndex !== -1) {
    data.users[userIndex].cart = cart;
  } else {
    data.users.push({ userId, cart });
  }

  fs.writeFileSync(cartFilePath, JSON.stringify(data, null, 2));
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const cart = getCartByUserId(userId);
  return new Response(JSON.stringify({ cart }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  const { cart, userId } = await request.json();

  if (!cart || !userId) {
    return new Response(
      JSON.stringify({ message: "Cart and User ID are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  saveCartForUser(userId, cart);
  return new Response(
    JSON.stringify({ message: "Cart updated successfully" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
