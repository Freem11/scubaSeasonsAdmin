import { useState } from "react";
import { SeaLifePhotosContext } from "../../state/seaLifeEvals/seaLifePhotosContext";
import { PendingDiveSitesContext } from "../../state/diveSiteEvals/diveSitesContext";
import { UnverifiedDiveSitesContext} from "../../state/unverifieddiveSiteEvals/diveSitesContext";
import { PartnerRequestsContext } from '../../state/partnerRequestEvals/partnerRequestsContext';
import { TripRequestsContext } from "../../state/tripRequestEvals/tripRequestContext";
import { SeaLifePhoto } from "../../shared/entities/seaLifePhoto";
import LayoutMainView from "./view";
import { DiveSite } from "../../shared/entities/diveSite";
import { DiveSiteContextProvider } from "../../state/diveSiteContextProvider";
import { PartnerRequest } from '../../shared/entities/partnerRequest';
import { DiveShopContextProvider } from '../../state/diveShopContextProvider';
import { TripRequest } from "../../shared/entities/tripRequest";
import { ReviewPhotoWithInfo } from "../../shared/entities/reviewPhotoWithInfo";
import { PendingReviewPhotosContext } from "../../state/reviewPhotoEvals/reviewPhotoContext";
import { DiveSitesWithHeadersContext } from "../../state/diveSitesWithHeaders/diveSitesWithHeadersContext";
import { DiveSiteWithHeader } from "../../shared/entities/diveSiteWithHeader";

export default function LayoutMain() {
  const [photoRecords, setPhotoRecords] = useState<SeaLifePhoto[] | null>(null)
  const [pendingDiveSites, setPendingDiveSites] = useState<DiveSite[] | null>(null)
  const [unverifiedDiveSites, setUnverifiedDiveSites] = useState<DiveSite[] | null>(null)
  const [pendingReviewPhotos, setPendingReviewPhotos] = useState<ReviewPhotoWithInfo[] | null>(null)
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[] | null>(null)
  const [tripRequests, setTripRequests] = useState<TripRequest[] | null>(null)
  const [diveSitesWithHeaders, setDiveSitesWithHeaders] = useState<DiveSiteWithHeader[]>([])

  return (
    <DiveSiteContextProvider>
      <DiveShopContextProvider>
        <DiveSitesWithHeadersContext.Provider value={{ diveSitesWithHeaders, setDiveSitesWithHeaders}}>
        <UnverifiedDiveSitesContext.Provider value={{ unverifiedDiveSites, setUnverifiedDiveSites }}>
        <PendingDiveSitesContext.Provider value={{ pendingDiveSites, setPendingDiveSites }}>
          <PartnerRequestsContext.Provider value={{ partnerRequests, setPartnerRequests }}>
            <PendingReviewPhotosContext.Provider value={{ pendingReviewPhotos, setPendingReviewPhotos }}>
            <SeaLifePhotosContext.Provider value={{ photoRecords, setPhotoRecords }}>
              <TripRequestsContext.Provider value={{ tripRequests, setTripRequests }}>
                <LayoutMainView/>
              </TripRequestsContext.Provider>
            </SeaLifePhotosContext.Provider>
            </PendingReviewPhotosContext.Provider>
          </PartnerRequestsContext.Provider>
        </PendingDiveSitesContext.Provider>
        </UnverifiedDiveSitesContext.Provider>
        </DiveSitesWithHeadersContext.Provider>
      </DiveShopContextProvider>
    </DiveSiteContextProvider>
  )
}
