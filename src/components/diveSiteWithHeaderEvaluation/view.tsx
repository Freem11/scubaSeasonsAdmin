
import style from './styles.module.scss';
import { toast } from 'react-toastify';

import { DiveSiteWithHeader } from "../../entities/diveSiteWithHeader";
import { clearDiveSitesHeadersBySiteId, updateHeaderPhoto } from '../../apicalls/supabaseCalls/diveSiteHeadersSupabaseCalls';
import { updateDiveSitePhoto } from '../../apicalls/supabaseCalls/diveSiteSupabaseCalls';
import { removePhotoVariants } from '../../apicalls/cloudflareBucketCalls/cloudflareAWSCalls';

type HeadersEvalViewProps = {
    diveSiteId: number | undefined
    headers:   DiveSiteWithHeader[] | null
    setCurrentPhoto: React.Dispatch<React.SetStateAction<DiveSiteWithHeader | null>>
    currentPhoto: DiveSiteWithHeader | null
  };   

export default function DiveSitesWithHeadersView({ diveSiteId, currentPhoto, setCurrentPhoto, headers }: HeadersEvalViewProps) {
    // Order: point the dive site at the new photo first, then mark the row as
    // selected, then delete the outgoing photo's variants. A failed step stops
    // the chain, so the dive site never points at deleted files.
    const updateHeaderImageSelection = async(record: DiveSiteWithHeader) => {
        if (!diveSiteId || currentPhoto?.id === record.id) return;
        const siteUpdated = await updateDiveSitePhoto(diveSiteId, record.photo_path)
        if (!siteUpdated) {
            toast.error("Dive site not updated");
            return;
        }
        await clearDiveSitesHeadersBySiteId(diveSiteId)
        const newHeader = await updateHeaderPhoto(record.id)
        if (!newHeader) {
            toast.error("Header photo not marked as selected");
            return;
        }
        setCurrentPhoto(newHeader)
        if (currentPhoto) await removePhotoVariants(currentPhoto.photo_path)
    };

    console.log('currentPhoto', currentPhoto)
       return (
        <> 
    <h3>Selected Species Header Image</h3>
        {currentPhoto && currentPhoto.photo_path&&
            <div className={style.cardMain} onClick={() => null}>
            <div className={style.pic}>
                <img
                    src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${currentPhoto.photo_path.split("/").pop()}`}
                    width={200}
                    style={{borderRadius: "5%"}}
                />
            </div>
        </div>}

        {!currentPhoto &&
            <div className={style.cardMain} onClick={() => null}>
            <div className={style.pic}>
            </div>
            <div className="full-height flex-column">
                <div>No Image Selected</div>
            </div>
        </div>}
          
        <h3>Species Header Image Options</h3>

            {headers && headers.map((record) => {
                const photoName = record.photo_path.split('/').pop();

                return (
                    <div className={style.cardMain} key={record.id} onClick={() => updateHeaderImageSelection(record)}>
                        <div className={style.pic}>
                            <img
                                src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
                                width={200}
                                className={currentPhoto && currentPhoto.id === record.id ? style.imageSelected :  style.image}
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
}
