import {
  grabPartnerRequestById,
  insertNewShop,
  partnerRequests,
  updateValidatePartnerRequestByUserId,
  updateProfileByUserId
} from '../../api/supabase/partnerRequestSupabaseCalls';
import { SelectedPartnerRequestContext } from '../../state/partnerRequestEvals/selectedPartnerRequestContext';
import { PartnerRequestsContext } from '../../state/partnerRequestEvals/partnerRequestsContext';
import { useCallback, useContext, useEffect, useState } from 'react';
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
  }, [selectedPartnerRequest?.id, setPartnerRequests, setSelectedPartnerRequest])

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

    useEffect(() => {
        return () => {
            setSelectedPartnerRequest(null);
        }
    }, [setSelectedPartnerRequest]);

  return (
    <PartnerRequestEvalView
      onReject={onReject}
      isLoading={isLoading}
      onApprove={onApprove}
      partnerData={selectedPartnerRequest}
    />
  );
}
