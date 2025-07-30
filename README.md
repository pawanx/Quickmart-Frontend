# QuickMart - A 10 min quick delivery application.

A full-stack quick ecommerce app where you can browse, search, order and view the products.  
Built with a React frontend, bootstrap, Express/Node backend, MongoDB database.

---

## Demo Link

[Live Demo](https://quickmart-frontend-sand.vercel.app/)

---

## Quick Start

```
git clone https://github.com/pawanx/Quickmart-Frontend.git
cd Quickmart-Frontend
npm install
npm run dev
```

---

## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB
- Bootstrap

---

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app:
[Loom Video Link](https://www.loom.com/share/091d68ef79934709a4eefac69874e5e5?sid=92ae95f8-ddde-490e-9650-317724f80949)

---

## Features

**Home**

- Displays a list of all categories of products.
- search products by name.

**Product Listing**

- Filters by rating, price and sort by price.
- Add to cart button to add products to cart.

**Product Details**

- View full product information (name, price, rating, images)
- "Buy Now" to instantly buy products or "Add to cart" for adding to cart.

**User Details**

- View user details (name, email, phone, Address)
- "Manage address" to edit, delete or view the addresses of the same user.
- Order histoy to see past orders.

**Cart**

- View items added to cart.
- See details like price, discount and product quantity.
- "Checkout" to go to place order and select address.

**Wishlist**

- View items added to wishlist.
- See details like price and image.
- "Move to cart" to add product to the cart and remove from wishlist.

---

## API References

### **GET /api/categories**<br>

List all categories of products<br>
Sample Response:<br>

```
[{ _id, title, summary, image}, …]
```

### **GET /api/products**<br>

Get all products of a particular category<br>
Sample Response:<br>

```
{ _id, title, description, category, price, rating, image }
```

### **GET /api/products/:id**<br>

Find one product<br>
Sample Response:<br>

```
{ _id, title, description, category, price, rating, image }
```

### **POST /api/addresses/**<br>

Create new address<br>
Sample Response:<br>

```
{message: "Address create successfully.", _id}
```

### **GET /api/addresses/**<br>

Get all addresses<br>
Sample Response:<br>

```
[{_id, name, street, pincode}]
```

### **POST /api/order/**<br>

Create new order<br>
Sample Response:<br>

```{message: "Order created successfully.", _id}

```

### **GET /api/orders/**<br>

Get all orders<br>
Sample Response:<br>

```
[{ _id, title, description, category, price, rating, image}]
```

### **GET /api/orders/:id**<br>

Get one orders<br>
Sample Response:<br>

```
{ _id, title, description, category, price, rating, image}
```

---

## Contact

For bugs or feature requests, please reach out to pawanmishra196@gmail.com
