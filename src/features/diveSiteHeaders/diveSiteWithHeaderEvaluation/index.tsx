import { useContext, useEffect, useState } from "react";

import DiveSitesWithHeadersView from "./view";
import { SelectedDiveSiteWithHeadersContext } from "../../../state/diveSitesWithHeaders/selectedDiveSiteWithHeadersContext";
import { getDiveSitesHeadersBySiteId, getExistingHeader } from "../../../api/supabase/diveSiteHeadersSupabaseCalls";
import { DiveSiteWithHeader } from "../../../shared/entities/diveSiteWithHeader";

export default function DiveSiteWithHeaders() {
    const { selectedDiveSiteWithHeaders } = useContext(SelectedDiveSiteWithHeadersContext)
    const [currentPhoto, setCurrentPhoto] = useState<DiveSiteWithHeader | null>(null);
     const [headers, setheaders] = useState<DiveSiteWithHeader[]| null>(null);

    const diveSiteId = selectedDiveSiteWithHeaders?.dive_site_id

        const getSelectedHeader = async(diveSiteId: number) => {
            const existingHeader = await getExistingHeader(diveSiteId)
            setCurrentPhoto(existingHeader)
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
        diveSiteId={diveSiteId}
        headers={headers}
        setCurrentPhoto={setCurrentPhoto}
        currentPhoto={currentPhoto}
        />
    )
}