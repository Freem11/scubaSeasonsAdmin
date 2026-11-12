import { useContext, useEffect } from "react";
import { DiveSitesWithHeadersContext } from "../../../state/diveSitesWithHeaders/diveSitesWithHeadersContext";
import { getDiveSitesWithHeaders } from "../../../api/supabase/diveSiteHeadersSupabaseCalls";
import DiveSiteWithHeadersView from "./view";

export default function DiveSiteHeadersList() {
    const { diveSitesWithHeaders, setDiveSitesWithHeaders} = useContext(DiveSitesWithHeadersContext)


    useEffect(() => {
    getDiveSitesWithHeadersList()
    },[])

    const getDiveSitesWithHeadersList = async() => {
        const diveSites = await getDiveSitesWithHeaders()
        if(diveSites){
            setDiveSitesWithHeaders(diveSites)
        }
     
     };

    return (
        <DiveSiteWithHeadersView diveSitesWithHeaders={diveSitesWithHeaders} />
    )
}