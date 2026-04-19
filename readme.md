# 🛍️ The Ethnic — Bag Page

A fully responsive, production-ready **My Bag** page built with React, Redux Toolkit, and CSS Modules — designed for The Ethnic, an Indian ethnic fashion e-commerce platform.

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| State Management | Redux Toolkit + React-Redux |
| Routing | React Router DOM v6 |
| Styling | CSS Modules |
| Font | Cormorant Garamond (Google Fonts) |
| Build Tool | Vite (assumed) |

---

## 🗂️ Project Structure

```
src/
├── mocks/
│   └── dummyCart.js              # Demo cart items + "Complete Your Look" data
│
├── features/
│   └── cart/
│       ├── cartSlice.js          # Redux slice — all cart state & selectors
│       └── components/
│           ├── CartItem.jsx      # Individual cart item card
│           ├── CartItem.module.css
│           ├── OrderSummary.jsx  # Sticky right panel with totals + coupon
│           └── OrderSummary.module.css
│
├── pages/
│   ├── BagPage.jsx               # Main page — layout, empty state, look section
│   └── BagPage.module.css
│
├── routes/
│   └── AppRoutes.jsx             # Route definitions (/bag wired here)
│
├── store/
│   └── store.js                  # Redux store config
│
└── App.jsx                       # Root — Provider + BrowserRouter wrapper
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install @reduxjs/toolkit react-redux react-router-dom
```

### 2. Add the font to `public/index.html`

Inside the `<head>` tag:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap"
  rel="stylesheet"
/>
```

### 3. Paste the files

Follow the dependency order below (paste bottom-up so imports never break):

| Order | File | Destination |
|---|---|---|
| 1 | `dummyCart.js` | `src/mocks/dummyCart.js` |
| 2 | `cartSlice.js` | `src/features/cart/cartSlice.js` |
| 3 | `store.js` | `src/store/store.js` |
| 4 | `CartItem.jsx` | `src/features/cart/components/CartItem.jsx` |
| 5 | `CartItem.module.css` | `src/features/cart/components/CartItem.module.css` |
| 6 | `OrderSummary.jsx` | `src/features/cart/components/OrderSummary.jsx` |
| 7 | `OrderSummary.module.css` | `src/features/cart/components/OrderSummary.module.css` |
| 8 | `BagPage.jsx` | `src/pages/BagPage.jsx` |
| 9 | `BagPage.module.css` | `src/pages/BagPage.module.css` |
| 10 | `AppRoutes.jsx` | `src/routes/AppRoutes.jsx` |
| 11 | `App.jsx` | `src/App.jsx` |

### 4. Run the dev server

```bash
npm run dev
```

Visit: **`http://localhost:5173/bag`**

---

## ✅ Features

### Cart Items
- Displays product image, name, subtitle, price and original price
- Per-item discount badge (e.g. `14% OFF`)
- Quantity controls (+ / −) capped at 1–10
- Remove item with a smooth fade-out animation
- Per-item savings shown in green
- Save for Later button (UI ready, logic hookable)

### Order Summary (sticky panel)
- Live-calculated subtotal, bag discount, delivery fee, and total
- Free delivery automatically applied for orders above ₹5,000
- Coupon code input — try `ETHNIC10` for 10% off
- Coupon apply / remove toggle with success feedback
- Proceed to Checkout button (routes to `/checkout`)
- Trust badges: Secure Payment, Easy Returns, Authentic, Pan India

### Complete Your Look
- Horizontal product grid below the cart
- Hover reveals an add-to-bag button per card
- Smooth image zoom on hover

### Empty Bag State
- Illustrated empty bag icon
- Call-to-action linking to `/shop`

### Responsive Layout
- Two-column layout (cart + summary) on desktop (≥ 900px)
- Stacks to single column on tablet and mobile
- Cart item cards go full-width on mobile with image on top

---

## 🗄️ State Management

All cart state lives in `src/features/cart/cartSlice.js`.

### Available Actions

```js
import {
  incrementQty,   // increase qty of item by id
  decrementQty,   // decrease qty of item by id
  removeItem,     // remove item from cart by id
  setCoupon,      // update coupon input field value
  applyCoupon,    // validate and apply coupon code
  removeCoupon,   // clear applied coupon
} from '../features/cart/cartSlice';
```

### Available Selectors

```js
import {
  selectCartItems,     // array of all cart items
  selectCoupon,        // { code, discount, applied }
  selectOrderSummary,  // { subtotal, bagDiscount, couponSaving, delivery, total, itemCount }
} from '../features/cart/cartSlice';
```

---

## 🔌 Connecting to a Real Backend

The mock data in `src/mocks/dummyCart.js` is the only thing you need to replace. When your API is ready:

1. Open `src/features/cart/cartSlice.js`
2. Change the `initialState.items` from `dummyCartItems` to `[]`
3. Add an async thunk using `createAsyncThunk` to fetch cart items from your API
4. Dispatch the thunk on `BagPage` mount using `useEffect`

Example:

```js
// In cartSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const res = await fetch('/api/cart');
  return res.json();
});
```

```jsx
// In BagPage.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../features/cart/cartSlice';

useEffect(() => {
  dispatch(fetchCart());
}, [dispatch]);
```

---

## 🧩 Demo Coupon Code

| Code | Discount |
|---|---|
| `ETHNIC10` | 10% off the subtotal |

Add more coupon codes inside the `applyCoupon` reducer in `cartSlice.js`.

---

## 📱 Breakpoints

| Breakpoint | Layout |
|---|---|
| ≥ 900px | Two-column (cart left, summary right sticky) |
| < 900px | Single column, summary below cart |
| < 480px | Cart item image full-width on top, details below |

---

## 🔮 What's Next

- [ ] Connect cart to Node.js backend via `cartApi.js`
- [ ] Add wishlist / Save for Later page
- [ ] Persist cart to `localStorage` between sessions
- [ ] Add loading skeletons while fetching cart data
- [ ] Integrate Razorpay / payment gateway on Checkout page

---

## 👤 Author

Built as part of **The Ethnic** frontend project.  
Assigned feature: **My Bag Page** — `BagPage.jsx`
