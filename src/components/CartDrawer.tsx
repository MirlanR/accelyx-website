"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-catch-dark z-50 flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-catch-mid">
          <span className="label-xs text-catch-white">
            Your Bag {items.length > 0 && `(${items.reduce((s, i) => s + i.quantity, 0)})`}
          </span>
          <button
            onClick={closeCart}
            className="text-catch-muted hover:text-catch-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
              <ShoppingBag size={40} className="text-catch-mid" />
              <p className="label-xs">Your bag is empty</p>
              <Link href="/shop" onClick={closeCart} className="btn-outline mt-2">
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-catch-mid">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 px-6 py-5"
                >
                  {/* Image */}
                  <div className="relative w-20 h-24 flex-shrink-0 bg-catch-gray overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-catch-white text-sm font-medium leading-snug">
                        {item.product.name}
                      </p>
                      <p className="label-xs mt-1">Size: {item.size}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="text-catch-muted hover:text-catch-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm text-catch-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="text-catch-muted hover:text-catch-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price + Remove */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-catch-white">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-catch-muted hover:text-catch-white transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-catch-mid px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="label-xs">Subtotal</span>
              <span className="text-catch-white font-medium">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-catch-muted">
              Shipping and taxes calculated at checkout
            </p>
            <button className="btn-primary w-full text-center">
              Proceed to Checkout
            </button>
            <button
              onClick={closeCart}
              className="btn-ghost w-full text-center"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
