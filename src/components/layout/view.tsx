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

export default function LayoutMainView() {

    const tabs = useMemo(() => {
        return [
            { key: 't-1', title: 'Sea Life', content: SeaLifePhotoList, tabContent: <SeaLifePhotoEval /> },
            { key: 't-2', title: 'Dive Sites', content: DiveSiteList, tabContent: <DiveSiteEval /> },
            { key: 't-3', title: 'Review Photos', content: ReviewPhotoList, tabContent: <ReviewPhotoEval />},
            { key: 't-3', title: 'Partner Requests', content: PartnerRequestList, tabContent: <PartnerRequestEval /> },
            { key: 't-4', title: 'Trip Requests', content: TripRequestList, tabContent: <TripRequestEval /> }
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
