import { useMemo, useState } from 'react';
import Tabs, { TabItem } from '../../shared/ui/tabs';
import DiveSiteEval from '../../features/diveSites/diveSiteEvaluation';
import UnverifiedDiveSiteEval from "../../features/diveSites/diveSiteEvaluationNew";
import DiveSiteList from '../../features/diveSites/diveSiteList';
import UnverfiedDiveSiteList from '../../features/diveSites/diveSiteListNew';
import PartnerRequestList from '../../features/partnerRequests/partnerRequestList';
import PartnerRequestEval from '../../features/partnerRequests/partnerRequestEvaluation';
import SeaLifePhotoEval from '../../features/seaLifePhotos/seaLifePhotoEvaluation';
import SeaLifePhotoList from '../../features/seaLifePhotos/seaLifePhotoList';
import TripRequestList from "../../features/tripRequests/tripRequestList";
import TripRequestEval from "../../features/tripRequests/tripRequestEvaluation";
import ReviewPhotoList from '../../features/reviewPhotos/reviewPhotoList';
import ReviewPhotoEval from '../../features/reviewPhotos/reviewPhotoEvaluation';
import PhotoAuditTool from '../../features/photoAudit/index';
import SeaLifeHeadersList from '../../features/seaLifeHeaders/seaLifeHeadersList';
import SeaLifeHeadersEval from '../../features/seaLifeHeaders/seaLifeHeaders';
import DiveSiteHeadersList from '../../features/diveSiteHeaders/diveSitesWithHeadersList';
import DiveSiteWithHeaders from '../../features/diveSiteHeaders/diveSiteWithHeaderEvaluation';


export default function LayoutMainView() {

    const tabs = useMemo(() => {
        return [
            { key: 't-1', title: 'Sea Life', content: SeaLifePhotoList, tabContent: <SeaLifePhotoEval /> },
            { key: 't-2', title: 'Dive Sites OLD', content: DiveSiteList, tabContent: <DiveSiteEval /> },
            { key: 't-3', title: 'Dive Sites', content: UnverfiedDiveSiteList, tabContent: <UnverifiedDiveSiteEval /> },
            { key: 't-4', title: 'Review Photos', content: ReviewPhotoList, tabContent: <ReviewPhotoEval />},
            { key: 't-5', title: 'Partner Requests', content: PartnerRequestList, tabContent: <PartnerRequestEval /> },
            { key: 't-6', title: 'Trip Requests', content: TripRequestList, tabContent: <TripRequestEval /> },
            { key: 't-7', title: 'Photo Bucket', content: PhotoAuditTool, tabContent: null},
            { key: 't-8', title: 'Sea Life Headers', content: SeaLifeHeadersList, tabContent: <SeaLifeHeadersEval/>},
            { key: 't-9', title: 'Dive Site Headers', content: DiveSiteHeadersList, tabContent: <DiveSiteWithHeaders/>}
        ]
    }, []);

    const [currentTab, setCurrentTab] = useState<TabItem>(tabs[0]);

    return (
        <div className="container-fluid">
            <div className="cols col-gapless">
                <div className="col-4" style={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
                    <Tabs data={tabs} onChange={setCurrentTab} />
                </div>
                <div className="col-8" style={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
                    {currentTab.tabContent}
                </div>
            </div>
        </div>
    );
}
