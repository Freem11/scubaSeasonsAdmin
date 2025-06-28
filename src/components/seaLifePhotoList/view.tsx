import { useCallback, useContext, useEffect } from "react";
import { SelectedSeaLifeContext } from "../../contexts/seaLifeEvals/selectedSeaLifePhotoContext";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import style from './styles.module.scss';

type SeaLifePhotoListProps = {
    photoRecords: SeaLifePhoto[] | null
  };

export default function SeaLifePhotoListView(props: SeaLifePhotoListProps) {
    const { selectedSeaLife, setSelectedSeaLife } = useContext(SelectedSeaLifeContext)

    const setupSeaLife = useCallback((record: SeaLifePhoto) => {
        setSelectedSeaLife(record)
    }, [setSelectedSeaLife]);

    useEffect(() => {
        if (props.photoRecords && props.photoRecords.length > 0 && !selectedSeaLife) {
            setupSeaLife(props.photoRecords[0]);
        }
    }, [props.photoRecords, selectedSeaLife, setupSeaLife]);

    return (
        <div className="mt-4 flex-column">
            {props.photoRecords && props.photoRecords.map((record) => {
                const photoName = record.photofile.split('/').pop();

                return (
                    <div className={style.cardMain} key={record.id} onClick={() => setupSeaLife(record)}>
                        <div className={style.pic}>
                            <img
                                src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
                                width={200}
                                style={{borderRadius: "5%"}}
                            />
                        </div>
                        <div className="full-height flex-column">
                            <div>{record.label}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}