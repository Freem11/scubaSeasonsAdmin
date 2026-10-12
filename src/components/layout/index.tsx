import { useState } from "react";
import { SeaLifePhotosContext } from "../../contexts/seaLifeEvals/seaLifePhotosContext";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";
import { UnverifiedDiveSitesContext} from "../../contexts/unverifieddiveSiteEvals/diveSitesContext";
import { PartnerRequestsContext } from '../../contexts/partnerRequestEvals/partnerRequestsContext';
import { TripRequestsContext } from "../../contexts/tripRequestEvals/tripRequestContext";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import LayoutMainView from "./view";
import { DiveSite } from "../../entities/diveSite";
import { DiveSiteContextProvider } from "../../contexts/diveSiteContextProvider";
import { PartnerRequest } from '../../entities/partnerRequest';
import { DiveShopContextProvider } from '../../contexts/diveShopContextProvider';
import { TripRequest } from "../../entities/tripRequest";
import { ReviewPhotoWithInfo } from "../../entities/reviewPhotoWithInfo";
import { PendingReviewPhotosContext } from "../../contexts/reviewPhotoEvals/reviewPhotoContext";
import { DiveSitesWithHeadersContext } from "../../contexts/diveSitesWithHeaders/diveSitesWithHeadersContext";
import { DiveSiteWithHeader } from "../../entities/diveSiteWithHeader";

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
