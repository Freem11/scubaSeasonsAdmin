import { useContext, useEffect } from "react";
import { DiveSitesWithHeadersContext } from "../../contexts/diveSitesWithHeaders/diveSitesWithHeadersContext";
import { getDiveSitesWithHeaders } from "../../apicalls/supabaseCalls/diveSiteHeadersSupabaseCalls";
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