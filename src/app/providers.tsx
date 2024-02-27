"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "../components/layout/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import Footer from "@/components/layout/footer";
import { useState, createContext, useEffect } from "react";
import Swal from "sweetalert2";

export interface MyContextType {
  favorites: object;
  updateFavorite: (newFav: object) => void;
  compare: object;
  setupCompare: (addPoke: object) => void;
  handleOverloadCompare: () => void;
}

const initialState: MyContextType = {
  favorites: [],
  updateFavorite: () => {},
  compare: [],
  setupCompare: () => {},
  handleOverloadCompare: () => {},
};

export const MyContext = createContext<MyContextType>(initialState);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<object[] | []>([]);
  const [compare, setCompare] = useState<object[] | []>([]);

  const updateFavorite = (newFav: any) => {
    setFavorites((prevData) => {
      const newData = [...prevData, newFav];
      const lockData = JSON.stringify(newData);

      const checkID = prevData.find((pokemon: any) => pokemon.id === newFav.id);
      if (checkID) {
        const filteredData = prevData.filter(
          (pokemon: any) => pokemon.id !== newFav.id
        );
        sessionStorage.setItem("favorites", JSON.stringify(filteredData));
        return filteredData;
      } else {
        sessionStorage.setItem("favorites", lockData);
        return newData;
      }
    });
  };

  const setupCompare = (addPoke: any) => {
    setCompare([...compare, addPoke]);
  };

  const handleOverloadCompare = () => {
    setCompare(compare.slice(0, -1));
  };

  const checkSessionStorage = () => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const favoriteItem = window.sessionStorage.getItem("favorites");
      if (favoriteItem) {
        const parsedData = JSON.parse(favoriteItem);
        setFavorites(parsedData);
      }
    }
  };

  useEffect(() => {
    checkSessionStorage();
  }, []);

  const contextValue: MyContextType = {
    favorites,
    updateFavorite,
    compare,
    setupCompare,
    handleOverloadCompare,
  };

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration>
            <MyContext.Provider value={contextValue}>
              <Header />
              {children}
              <Footer />
            </MyContext.Provider>
          </ReactQueryStreamedHydration>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
