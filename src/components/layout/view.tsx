import { useMemo, useState } from 'react';
import Tabs, { TabItem } from '../../reusables/tabs';
import DiveSiteEval from '../diveSiteEvaluation';
import DiveSiteList from '../diveSiteList';
import PartnerRequestList from '../partnerRequestList';
import PartnerRequestEval from '../partnerRequestEvaluation';
import SeaLifePhotoEval from '../seaLifePhotoEvaluation';
import SeaLifePhotoList from '../seaLifePhotoList';
import TripRequestList from "../tripRequestList";
import TripRequestEval from "../tripRequestEvaluation";
import ReviewPhotoList from '../reviewPhotoList';
import ReviewPhotoEval from '../reviewPhotoEvaluation';
import PhotoGallery from '../test';
import SeaLifeHeadersList from '../seaLifeHeadersList';
import SeaLifeHeadersEval from '../seaLifeHeaders';

export default function LayoutMainView() {

    const tabs = useMemo(() => {
        return [
            { key: 't-1', title: 'Sea Life', content: SeaLifePhotoList, tabContent: <SeaLifePhotoEval /> },
            { key: 't-2', title: 'Dive Sites', content: DiveSiteList, tabContent: <DiveSiteEval /> },
            { key: 't-3', title: 'Review Photos', content: ReviewPhotoList, tabContent: <ReviewPhotoEval />},
            { key: 't-4', title: 'Partner Requests', content: PartnerRequestList, tabContent: <PartnerRequestEval /> },
            { key: 't-5', title: 'Trip Requests', content: TripRequestList, tabContent: <TripRequestEval /> },
            { key: 't-6', title: 'Photo Bucket', content: PhotoGallery, tabContent: null},
            { key: 't-7', title: 'Sea Life Headers', content: SeaLifeHeadersList, tabContent: <SeaLifeHeadersEval/>}
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
