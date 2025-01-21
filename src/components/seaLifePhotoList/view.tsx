import { useContext } from "react";
import readableDate from "../../helpers/readableDate";
import { SelectedSeaLifeContext } from "../../contexts/selectSeaLifePhotoContext";

export type SeaLifePhoto = {
    id: number
    created_at: string
    photofile: string
    label: string
    dateTaken: string
    latitude: number
    longitude: number
    userid: string
    username: null | string
    newusername: string
  };

type SeaLifePhotoListProps = {
    photoRecords: SeaLifePhoto[] | null
  };

export default function SeaLifePhotoListView(props: SeaLifePhotoListProps) {
    const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext)

    console.log(props.photoRecords)

return (
    <div>
    {props.photoRecords && props.photoRecords.map((record) => {
          const photoName = record.photofile.split('/').pop();
        return (
        <div key={record.id} style={{display: 'flex', flexDirection: 'row'}} onClick={() => setSelectedSeaLife(record)}>
            <img src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`} width={200}></img>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <p>Sea Life: {record.label}</p> 
                <p>Contributor: {record.newusername}</p>
                <p>Date: {readableDate(record.dateTaken)}</p>
                <p>Location: {record.latitude} {record.longitude}</p>
            </div>
        </div>
    )
    })}
</div>
)
}