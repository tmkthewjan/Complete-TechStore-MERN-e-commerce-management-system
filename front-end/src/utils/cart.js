const CART_KEY = "cart";

export function getCart() {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

export function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.productId === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.productId !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
  return cart;
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}