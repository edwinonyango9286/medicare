import { createContext, useState } from "react";

export const StoreContext = createContext(null)

export default ({children}) => {
    const [refresh,setRefresh] = useState(false)

    const store = {
        refresh : [refresh,setRefresh]
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}