import { useContext, useEffect } from 'react';
import { partnerRequests as getAllPartnerRequests } from '../../apicalls/supabaseCalls/partnerRequestSupabaseCalls';
import PartnerRequestListView from './view';
import { PartnerRequestsContext } from '../../contexts/partnerRequestEvals/partnerRequestsContext';

export default function PartnerRequestList() {
  const { partnerRequests, setPartnerRequests } = useContext(
    PartnerRequestsContext,
  );

  useEffect(() => {
    getPartnerRequests();
  }, []);

  const getPartnerRequests = async () => {
    const response = await getAllPartnerRequests();

    if (!response.error) {
      setPartnerRequests(response.data);
      return;
    }

    console.log({ title: 'Error', message: response.error.message });
  };

  return <PartnerRequestListView partnerRequestsList={partnerRequests} />;
}
