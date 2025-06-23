import {
  grabPartnerRequestById,
  insertNewShop,
  partnerRequests,
  updateValidatePartnerRequestByUserId,
  updateProfileByUserId
} from '../../apicalls/supabaseCalls/partnerRequestSupabaseCalls';
import { SelectedPartnerRequestContext } from '../../contexts/partnerRequestEvals/selectedPartnerRequestContext';
import { PartnerRequestsContext } from '../../contexts/partnerRequestEvals/partnerRequestsContext';
import { useCallback, useContext, useState } from 'react';
import PartnerRequestEvalView from './view';

export default function PartnerRequestEval() {
  const { selectedPartnerRequest, setSelectedPartnerRequest } = useContext(SelectedPartnerRequestContext);
  const { setPartnerRequests } = useContext(PartnerRequestsContext);
  const [isLoading, setIsLoading] = useState(false)
  
  const onApprove = useCallback(async () => {
    if (selectedPartnerRequest?.id) {
      try {
        setIsLoading(true);
        const partnerRequestById = await grabPartnerRequestById(selectedPartnerRequest.id);
        await insertNewShop(partnerRequestById);
        await updateValidatePartnerRequestByUserId(partnerRequestById.userId, true);
        await updateProfileByUserId(partnerRequestById.userId, true);
        setSelectedPartnerRequest(null);
        const { data } = await partnerRequests();
        setPartnerRequests(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedPartnerRequest?.id, selectedPartnerRequest?.userId, setPartnerRequests, setSelectedPartnerRequest])
  
  const onReject = useCallback(async () => {
    if (selectedPartnerRequest?.id) {
      try {
        setIsLoading(true);
        await updateValidatePartnerRequestByUserId(selectedPartnerRequest.userId, false);
        await updateProfileByUserId(selectedPartnerRequest.userId, false);
        setSelectedPartnerRequest(null);
        const { data } = await partnerRequests();
        setPartnerRequests(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedPartnerRequest?.id, selectedPartnerRequest?.userId, setPartnerRequests, setSelectedPartnerRequest])

  return (
    <PartnerRequestEvalView
      onReject={onReject}
      isLoading={isLoading}
      onApprove={onApprove}
      partnerData={selectedPartnerRequest}
    />
  );
}
