import { useContext, useEffect } from 'react';
import DiveSiteFlagListView from './view';
import { getDiveSiteFlags as getAllDiveSiteFlags } from '../../apicalls/supabaseCalls/userRequestSupabaseCalls';
import { DiveSiteFlagsContext } from '../../contexts/diveSiteFlagEvals/diveSiteFlagsContext';

export default function DiveSiteFlagList() {
  const { diveSiteFlags, setDiveSiteFlags } = useContext(DiveSiteFlagsContext);

  useEffect(() => {
    getDiveSiteFlags();
  }, []);

  const getDiveSiteFlags = async () => {
    const response = await getAllDiveSiteFlags();

    if (!response.error) {
      setDiveSiteFlags(response.data);
      return;
    }

    console.log({ title: 'Error', message: response.error.message });
  };

  return <DiveSiteFlagListView diveSiteFlagsList={diveSiteFlags} />;
}
