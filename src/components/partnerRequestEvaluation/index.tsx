import { useContext, useEffect } from 'react';

import { deletePartnerRequest, grabPartnerRequestById, insertNewShop, partnerRequests } from '../../apicalls/supabaseCalls/partnerRequestSupabaseCalls';
import { SelectedPartnerRequestContext } from '../../contexts/partnerRequestEvals/selectedPartnerRequestContext';
import { PartnerRequestsContext } from '../../contexts/partnerRequestEvals/partnerRequestsContext';
import PartnerRequestEvalView from './view';

export default function PartnerRequestEval() {
    const { selectedPartnerRequest, setSelectedPartnerRequest } = useContext(SelectedPartnerRequestContext)
    const { setPartnerRequests } = useContext(PartnerRequestsContext)

    const validatePartnerRequest = async (id: number| undefined) => {
        if (id) {
            const partnerRequestById = await grabPartnerRequestById(id);
            await insertNewShop(partnerRequestById && partnerRequestById[0])
            await deletePartnerRequest(id)
            setSelectedPartnerRequest(null)
            const { data } = await partnerRequests();
            setPartnerRequests(data);
        }
    };

    const rejectPartnerRequest = async(id: number| undefined) => {
        if (id) {
            await deletePartnerRequest(id);
            setSelectedPartnerRequest(null)
            const { data } = await partnerRequests();
            setPartnerRequests(data);
        }
    };

    useEffect(() => {
        return () => {
            setSelectedPartnerRequest(null);
        }
    }, [setSelectedPartnerRequest]);

    return (
        <PartnerRequestEvalView
            validatePartnerRequest={validatePartnerRequest}
            rejectPartnerRequest={rejectPartnerRequest}
            partnerRequest={selectedPartnerRequest}
            values={{
                businessName: selectedPartnerRequest?.businessName,
                latitude: selectedPartnerRequest?.latitude,
                longitude: selectedPartnerRequest?.longitude,
                webpageLink: selectedPartnerRequest?.webpageLink
            }}
        />
    );
}
