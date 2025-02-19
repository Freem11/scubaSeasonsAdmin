import React, {  useEffect, useState } from 'react';
import {  getDiveSitesByIDs } from '../../apicalls/supabaseCalls/diveSiteSupabaseCalls';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import SiteSelectorView from './view';

type SiteSelectorProps = {
  siteIds: number[]
  error: boolean
};

export default function SiteSelector(props: SiteSelectorProps) {
  const [sites, setSites] = useState<DiveSiteWithUserName[] | null>(null); // Site info

 
useEffect(() => {
  const fetchSites = async () => {
    if (props.siteIds && props.siteIds.length > 0) {
      try {
        const result = await getDiveSitesByIDs(props.siteIds);
        setSites(result);
      } catch (error) {
        console.error('Failed to fetch sites:', error);
      }
    }
  };

  fetchSites();
}, [props.siteIds]); 

  return (
    <SiteSelectorView
      sites={sites}
      error={props.error}
    />
  );
}
