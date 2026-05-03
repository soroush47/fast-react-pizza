const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // آدرس Vite React
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(async (req, res, next) => {
  await delay(1000);
  next(); // ✅ حالا برو route اصلی
});

// Temporary data storage (you can replace this with a database later)
let menu = [
  {
    id: 1,
    name: "Margherita",
    unitPrice: 12,
    ingredients: ["tomato", "mozzarella", "basil"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/margherita.jpg",
  },
  {
    id: 2,
    name: "Pepperoni",
    unitPrice: 14,
    ingredients: ["tomato", "mozzarella", "pepperoni"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/pepperoni.jpg",
  },
  {
    id: 3,
    name: "Hawaiian",
    unitPrice: 15,
    ingredients: ["tomato", "mozzarella", "ham", "pineapple"],
    soldOut: true,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/hawaiian.jpg",
  },
  {
    id: 4,
    name: "Veggie Delight",
    unitPrice: 13,
    ingredients: [
      "tomato",
      "mozzarella",
      "bell pepper",
      "onion",
      "mushroom",
      "olive",
    ],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/veggie.jpg",
  },
  {
    id: 5,
    name: "BBQ Chicken",
    unitPrice: 16,
    ingredients: [
      "bbq sauce",
      "mozzarella",
      "chicken",
      "red onion",
      "cilantro",
    ],
    soldOut: false,
    imageUrl:
      "https://react-fast-pizza-api.jonas.io/img/pizzas/bbq-chicken.jpg",
  },
  {
    id: 6,
    name: "Four Cheese",
    unitPrice: 14,
    ingredients: ["mozzarella", "cheddar", "parmesan", "gorgonzola"],
    soldOut: false,
    imageUrl:
      "https://react-fast-pizza-api.jonas.io/img/pizzas/four-cheese.jpg",
  },
  {
    id: 7,
    name: "Meat Lovers",
    unitPrice: 18,
    ingredients: [
      "tomato",
      "mozzarella",
      "pepperoni",
      "sausage",
      "bacon",
      "ham",
    ],
    soldOut: false,
    imageUrl:
      "https://react-fast-pizza-api.jonas.io/img/pizzas/meat-lovers.jpg",
  },
  {
    id: 8,
    name: "Spicy Italian",
    unitPrice: 17,
    ingredients: ["tomato", "mozzarella", "spicy salami", "jalapeno"],
    soldOut: false,
    imageUrl:
      "https://react-fast-pizza-api.jonas.io/img/pizzas/spicy-italian.jpg",
  },
  {
    id: 9,
    name: "Mushroom Special",
    unitPrice: 13,
    ingredients: ["tomato", "mozzarella", "mushroom", "garlic"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/mushroom.jpg",
  },
  {
    id: 10,
    name: "Chicken Alfredo",
    unitPrice: 17,
    ingredients: ["alfredo sauce", "mozzarella", "chicken", "spinach"],
    soldOut: false,
    imageUrl:
      "https://react-fast-pizza-api.jonas.io/img/pizzas/chicken-alfredo.jpg",
  },
  {
    id: 11,
    name: "Mediterranean",
    unitPrice: 15,
    ingredients: ["tomato", "feta", "olive", "sun-dried tomato", "spinach"],
    soldOut: false,
    imageUrl:
      "https://react-fast-pizza-api.jonas.io/img/pizzas/mediterranean.jpg",
  },
  {
    id: 12,
    name: "Buffalo Chicken",
    unitPrice: 16,
    ingredients: ["buffalo sauce", "mozzarella", "chicken", "blue cheese"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/buffalo.jpg",
  },
  {
    id: 13,
    name: "Tuna Supreme",
    unitPrice: 14,
    ingredients: ["tomato", "mozzarella", "tuna", "onion", "olive"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/tuna.jpg",
  },
  {
    id: 14,
    name: "Truffle Mushroom",
    unitPrice: 19,
    ingredients: ["truffle oil", "mozzarella", "mushroom", "parmesan"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/truffle.jpg",
  },
  {
    id: 15,
    name: "Classic Sausage",
    unitPrice: 15,
    ingredients: ["tomato", "mozzarella", "italian sausage"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/sausage.jpg",
  },
  {
    id: 16,
    name: "Pesto Veggie",
    unitPrice: 14,
    ingredients: ["pesto sauce", "mozzarella", "zucchini", "cherry tomato"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/pesto.jpg",
  },
  {
    id: 17,
    name: "Shrimp Delight",
    unitPrice: 20,
    ingredients: ["garlic sauce", "mozzarella", "shrimp", "parsley"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/shrimp.jpg",
  },
  {
    id: 18,
    name: "Capricciosa",
    unitPrice: 16,
    ingredients: ["tomato", "mozzarella", "ham", "mushroom", "artichoke"],
    soldOut: false,
    imageUrl:
      "https://react-fast-pizza-api.jonas.io/img/pizzas/capricciosa.jpg",
  },
  {
    id: 19,
    name: "Greek Special",
    unitPrice: 15,
    ingredients: ["tomato", "feta", "olive", "cucumber", "red onion"],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/greek.jpg",
  },
  {
    id: 20,
    name: "Ultimate Supreme",
    unitPrice: 21,
    ingredients: [
      "tomato",
      "mozzarella",
      "pepperoni",
      "sausage",
      "olive",
      "onion",
      "bell pepper",
    ],
    soldOut: false,
    imageUrl: "https://react-fast-pizza-api.jonas.io/img/pizzas/supreme.jpg",
  },
];

let orders = [
  {
    id: 1,
    customer: "Jonas",
    phone: "123456789",
    address: "Arroios, Lisbon , Portugal",
    priority: true,
    estimatedDelivery: "2027-04-25T10:00:00",
    cart: [
      {
        pizzaId: 7,
        name: "Napoli",
        quantity: 3,
        unitPrice: 16,
        totalPrice: 48,
      },
      {
        pizzaId: 5,
        name: "Diavola",
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
      },
      {
        pizzaId: 3,
        name: "Romana",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
      },
    ],
    position: "-9.000,38.000",
    orderPrice: 95,
    priorityPrice: 19,
  },
  {
    id: 2,
    customer: "Soroush",
    phone: "123456789",
    address: "Arroios, Lisbon , Portugal",
    priority: true,
    estimatedDelivery: "2027-04-25T10:00:00",
    cart: [
      {
        pizzaId: 7,
        name: "Napoli",
        quantity: 3,
        unitPrice: 16,
        totalPrice: 48,
      },
      {
        pizzaId: 5,
        name: "Diavola",
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
      },
      {
        pizzaId: 3,
        name: "Romana",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
      },
    ],
    position: "-9.000,38.000",
    orderPrice: 95,
    priorityPrice: 19,
  },
];

// CRUD Operations

// Get all menu
app.get("/menu", (req, res) => {
  const data = {
    data: menu,
  };
  res.json(data);
});

// Get all orders
app.get("/order", (req, res) => {
  res.json(orders);
});

// Get an order by ID
app.get("/order/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((o) => o.id === orderId);
  const data = { data: order };
  if (order) {
    res.json(data);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// Create a new order
app.post("/order", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
});

// Update an existing order
app.put("/order/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex] = { ...orders[orderIndex], ...req.body };
    res.json(orders[orderIndex]);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// Delete an order
app.delete("/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
