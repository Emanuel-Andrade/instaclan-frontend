import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import Search from "../pages/Search/Search"

export const useQuery = () => {
    const  {search}  = useLocation()

    return useMemo(()=> new URLSearchParams(search),[search])
}

 