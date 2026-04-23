import { createContext } from "react";

interface GlobalContextType {
    setGlobalState?: (state: any) => void;
    [key: string]: any;
}

export const GlobalContext = createContext<GlobalContextType>({});