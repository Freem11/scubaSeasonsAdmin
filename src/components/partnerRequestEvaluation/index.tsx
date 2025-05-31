import { useContext, useEffect } from 'react';
import { SelectedPartnerRequestContext } from '../../contexts/partnerRequestEvals/selectedPartnerRequestContext';
import PartnerRequestEvalView from './view';
import { PartnerRequestsContext } from '../../contexts/partnerRequestEvals/partnerRequestsContext';
import { deletePartnerRequest, grabPartnerRequestById, insertNewShop, partnerRequests } from '../../apicalls/supabaseCalls/partnerRequestSupabaseCalls';

export default function PartnerRequestEval() {
    const { selectedPartnerRequest, setSelectedPartnerRequest } = useContext(SelectedPartnerRequestContext)
    const { setPartnerRequests } = useContext(PartnerRequestsContext)
  const ValidatePartnerRequest = async (id: number| undefined) => {
    if(id){
      const partnerRequestById = await grabPartnerRequestById(id);
      await insertNewShop(partnerRequestById && partnerRequestById[0])
      await deletePartnerRequest(id)
      setSelectedPartnerRequest(null)
      const { data } = await partnerRequests();
      setPartnerRequests(data);
    }
  };

  const RejectPartnerRequest = async(id: number| undefined) => {
    if(id){
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
            validatePartnerRequest={ValidatePartnerRequest}
            rejectPartnerRequest={RejectPartnerRequest}
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
