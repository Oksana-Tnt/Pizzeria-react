import { createContext, useContext, useEffect, useState } from "react";

const AppContextOrder = createContext();

export function AppWrapperOrder({ children }) {
  const [orders, setOrder] = useState(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCard = (id) => {
    const existingProduct = orders.find((product) => product.dish_id === id);
    if (existingProduct) {
      setOrder((prev) =>
        prev.map((product) => {
          if (product.dish_id === id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
          return product;
        })
      );
    } else {
      return setOrder([
        ...orders,
        {
          dish_id: id,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCard = (id) => {
    setOrder((prev) => {
      const updatedOrder = prev.map((product) => {
        if (product.dish_id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      return updatedOrder.filter((product) => product.quantity > 0);
    });
  };

  const isOrder = (id) => orders.some((item) => item.dish_id === id);

  const ordersQuantity = () => {
    return orders.reduce((acc, order) => {
      return acc + order.quantity;
    }, 0);
  };

  return (
    <AppContextOrder.Provider
      value={{
        orders,
        addToCard,
        removeFromCard,
        isOrder,
        ordersQuantity,
        setOrder,
      }}
    >
      {children}
    </AppContextOrder.Provider>
  );
}

export function useAppContextOrder() {
  return useContext(AppContextOrder);
}

//------------------Search Context----------------------------------------------------

const AppContextSearch = createContext();

export function AppWrapperSearch({ children }) {
  const [search, setSearch] = useState(() => {
    const storedSearch = localStorage.getItem("search");
    return storedSearch ? JSON.parse(storedSearch) : "";
  });

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search));
  }, [search]);

  const setSearchQuery = (search) => {
    setSearch(search);
  };

  return (
    <AppContextSearch.Provider
      value={{
        setSearchQuery,
        search,
      }}
    >
      {children}
    </AppContextSearch.Provider>
  );
}

export function useAppContextSearch() {
  return useContext(AppContextSearch);
}
