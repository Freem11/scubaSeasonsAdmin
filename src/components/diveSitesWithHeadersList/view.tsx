import { useContext } from "react";
import style from './styles.module.scss';
import { DiveSiteWithHeader } from "../../entities/diveSiteWithHeader";
import { SelectedDiveSiteWithHeadersContext } from "../../contexts/diveSitesWithHeaders/selectedDiveSiteWithHeadersContext";

type SeaLifeHEadersListProps = {
    diveSitesWithHeaders: DiveSiteWithHeader[] | null
  };

export default function DiveSiteWithHeadersView(props: SeaLifeHEadersListProps) {
    const { setSelectedDiveSiteWithHeaders } = useContext(SelectedDiveSiteWithHeadersContext)


    return (
        <div className="mt-4 flex-column">
            {props.diveSitesWithHeaders && props.diveSitesWithHeaders.map((record) => {

                return (
                    <div className={record.photo_path ? style.cardMain : style.cardMainAlt} key={record.id} onClick={() => setSelectedDiveSiteWithHeaders(record)}>
                        <div className="full-height flex-column">
                            <div>{record.diveSites.name}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}