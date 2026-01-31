import { useCallback, useContext, useEffect } from "react";
import { SelectedSeaLifeContext } from "../../contexts/seaLifeEvals/selectedSeaLifePhotoContext";
import style from './styles.module.scss';
import { Species } from "../../entities/species";
import { SpeciesContext } from "../../contexts/seaLifeHeaders/speciesContext";

type SeaLifeHEadersListProps = {
    headerlessSpecies: Species[] | null
  };

export default function SeaLifeHeadersView(props: SeaLifeHEadersListProps) {
    const { selectedSeaLife, setSelectedSeaLife } = useContext(SelectedSeaLifeContext)

    const { setSpecies } = useContext(SpeciesContext)


    return (
        <div className="mt-4 flex-column">
            {props.headerlessSpecies && props.headerlessSpecies.map((record) => {

                return (
                    <div className={record.image_id ? style.cardMain : style.cardMainAlt} key={record.id} onClick={() => setSpecies(record.name)}>
                        <div className="full-height flex-column">
                            <div>{record.name}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}