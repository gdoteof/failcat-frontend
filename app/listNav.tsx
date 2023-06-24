import React, { createContext, useState , useContext} from "react";
import { CarType, KiaTelluride } from "./types/KiaTelluride";

const telluride = new KiaTelluride(2023);

type Filter<CarType> = {
    order: "id" | "serial";
    perPage: number;
    offset: number;
    ext_colors: typeof telluride.ext_colors[number];
}

const defaultFilter: Filter<CarType> = {
    order: "serial",
    perPage: 25,
    offset: 0,
    ext_colors: telluride.ext_colors[0],
}

const ListNavContext = createContext(defaultFilter);

export const ListNav= () => {
    const [filter, setFilter] = useState<Filter<CarType>>({
        order: "serial",
        perPage: 25,
        offset: 0,
        ext_colors: telluride.ext_colors[0],
    });

    return (
        <>
        <ListNavContext.Provider value={filter}>
        </ListNavContext.Provider>
        </>
    );
} 