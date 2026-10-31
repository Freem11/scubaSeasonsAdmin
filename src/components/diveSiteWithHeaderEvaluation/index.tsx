import { useContext, useEffect, useState } from "react";

import DiveSitesWithHeadersView from "./view";
import { SelectedDiveSiteWithHeadersContext } from "../../contexts/diveSitesWithHeaders/selectedDiveSiteWithHeadersContext";
import { getDiveSitesHeadersBySiteId, getExistingHeader } from "../../apicalls/supabaseCalls/diveSiteHeadersSupabaseCalls";
import { DiveSiteWithHeader } from "../../entities/diveSiteWithHeader";

export default function DiveSiteWithHeaders() {
    const { selectedDiveSiteWithHeaders } = useContext(SelectedDiveSiteWithHeadersContext)
    const [currentPhoto, setCurrentPhoto] = useState<DiveSiteWithHeader | null>(null);
     const [headers, setheaders] = useState<DiveSiteWithHeader[]| null>(null);

    const diveSiteId = selectedDiveSiteWithHeaders?.dive_site_id

        const getSelectedHeader = async(diveSiteId: number) => {
            const existingHeader = await getExistingHeader(diveSiteId)
            setCurrentPhoto(existingHeader[0])
         };

    useEffect(() => {
    getHeadersList()
    if(diveSiteId) getSelectedHeader(diveSiteId)
    },[diveSiteId])


        const getHeadersList = async() => {
                const headersRecords = diveSiteId && await getDiveSitesHeadersBySiteId(diveSiteId)
            if(headersRecords){
                setheaders(headersRecords)
            }
         };



    return (
        <DiveSitesWithHeadersView
        headers={headers}
        setCurrentPhoto={setCurrentPhoto}
        currentPhoto={currentPhoto}
        />
    )
}