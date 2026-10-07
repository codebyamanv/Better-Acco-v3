import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { PROPERTIES } from "../data/mockData";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem("betteracco_wishlist");
      return saved ? JSON.parse(saved) : ["compass-birmingham", "serene-retreat-lake"];
    } catch {
      return ["compass-birmingham", "serene-retreat-lake"];
    }
  });
  const [shortlistedProperties, setShortlistedProperties] = useState([]);

  // Fetch from server if authenticated
  useEffect(() => {
    async function fetchShortlists() {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem("betteracco_token");
          const res = await axios.get("/api/v1/shortlists", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data?.data) {
            const props = res.data.data;
            setShortlistedProperties(props);
            const ids = props.map((p) => p.slug || p.id);
            setWishlistIds(ids);
            localStorage.setItem("betteracco_wishlist", JSON.stringify(ids));
            return;
          }
        } catch (err) {
          console.warn("Could not fetch remote shortlists:", err.message);
        }
      }

      // Offline / fallback resolution
      const matched = PROPERTIES.filter((p) => wishlistIds.includes(p.id) || wishlistIds.includes(p.slug));
      setShortlistedProperties(matched);
    }

    fetchShortlists();
  }, [isAuthenticated, wishlistIds]);

  const isWishlisted = (idOrSlug) => {
    return wishlistIds.includes(idOrSlug);
  };

  const toggleWishlist = async (idOrSlug) => {
    const exists = wishlistIds.includes(idOrSlug);
    const updatedIds = exists
      ? wishlistIds.filter((id) => id !== idOrSlug)
      : [...wishlistIds, idOrSlug];

    setWishlistIds(updatedIds);
    localStorage.setItem("betteracco_wishlist", JSON.stringify(updatedIds));

    // Update property list
    const matched = PROPERTIES.filter((p) => updatedIds.includes(p.id) || updatedIds.includes(p.slug));
    setShortlistedProperties(matched);

    if (isAuthenticated) {
      try {
        const token = localStorage.getItem("betteracco_token");
        await axios.post(
          `/api/v1/shortlists/${idOrSlug}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.warn("Server shortlist sync error:", err.message);
      }
    }
  };

  const value = {
    wishlistIds,
    shortlistedProperties,
    isWishlisted,
    toggleWishlist,
    count: wishlistIds.length,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
