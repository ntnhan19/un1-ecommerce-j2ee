# Wishlist Feature Implementation Plan

## Overview

Create a complete wishlist/favorites feature that allows users to save products they like, view them on a dedicated wishlist page, and manage their favorites across the application.

## Proposed Changes

### Component 1: Wishlist Context

#### [NEW] [WishlistContext.jsx](file:///d:/GitHub/un1-ecommerce-j2ee/frontend/src/context/WishlistContext.jsx)

Create a new context following the CartContext pattern to manage wishlist state:
- State: `wishlist` array of product objects
- Actions:
  - `addToWishlist(product)` - Add product to wishlist
  - `removeFromWishlist(productId)` - Remove product from wishlist
  - `isInWishlist(productId)` - Check if product is in wishlist
  - `clearWishlist()` - Clear all wishlist items
- Use localStorage to persist wishlist data
- Provide `totalWishlistItems` count for header badge

---

### Component 2: Wishlist Page

#### [NEW] [Wishlist.jsx](file:///d:/GitHub/un1-ecommerce-j2ee/frontend/src/pages/Wishlist.jsx)

Create a new wishlist page similar to ShoppingCart:
- Display all wishlist items in a grid layout
- Each item shows: image, name, price
- Actions per item:
  - Remove from wishlist (heart icon or X button)
  - Add to cart button
  - Link to product detail
- Empty state when no items
- Header and Footer integration

#### [NEW] [Wishlist.css](file:///d:/GitHub/un1-ecommerce-j2ee/frontend/src/styles/components/Wishlist.css)

CSS following the project's design system:
- Fixed header padding (92px)
- Grid layout for products
- Card design with hover effects
- Responsive breakpoints
- Empty state styling

---

### Component 3: Product Card Enhancement

#### [MODIFY] [ProductCard.jsx](file:///d:/GitHub/un1-ecommerce-j2ee/frontend/src/components/product/ProductCard.jsx)

Add favorite/wishlist functionality:
- Import `useWishlist` hook
- Add heart icon button (top-right corner of product image)
- Toggle wishlist state on click
- Visual feedback: filled heart when in wishlist, outline when not
- Smooth animation on toggle

#### [MODIFY] [product-card.css](file:///d:/GitHub/un1-ecommerce-j2ee/frontend/src/styles/components/product-card.css)

Add styling for wishlist button:
- Position absolute in top-right corner
- Heart icon styling (outline and filled states)
- Hover effect
- Click animation

---

### Component 4: Header Integration

#### [MODIFY] [Header.jsx](file:///d:/GitHub/un1-ecommerce-j2ee/frontend/src/components/common/Header.jsx)

Add Link to wishlist icon:
- Wrap wishlist icon with `<Link to="/wishlist">`
- Optionally add badge showing wishlist item count

---

### Component 5: Routes Configuration

#### [MODIFY] [routes.jsx](file:///d:/GitHub/un1-ecommerce-j2ee/frontend/src/routes.jsx)

Add wishlist route:
- Import Wishlist page
- Add route: `<Route path="/wishlist" element={<Wishlist />} />`
- Wrap with WishlistProvider

---

## Verification Plan

### Automated Tests
- Run `npm run dev` to ensure no build errors
- Verify all imports resolve correctly

### Manual Verification

1. **Wishlist Context**
   - Add products to wishlist from different pages
   - Verify localStorage persistence (refresh page, items remain)
   - Check wishlist count updates in header

2. **Product Card**
   - Click heart icon to add/remove from wishlist
   - Verify heart icon state (filled vs outline)
   - Check smooth animation on toggle
   - Test on multiple product cards

3. **Wishlist Page**
   - Navigate to `/wishlist` from header icon
   - Verify all wishlist items display correctly
   - Test "Add to Cart" button on wishlist items
   - Test "Remove from Wishlist" button
   - Verify empty state when no items
   - Check responsive layout on mobile/tablet

4. **Header Integration**
   - Click wishlist icon in header
   - Verify navigation to `/wishlist`
   - Check wishlist count badge (if implemented)

5. **Cross-Page Functionality**
   - Add item to wishlist from home page
   - Navigate to products page, verify heart icon is filled
   - Remove from wishlist page, verify icon updates on products page
