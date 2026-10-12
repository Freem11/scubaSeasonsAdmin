
import style from './styles.module.scss';

import { DiveSiteWithHeader } from "../../entities/diveSiteWithHeader";
import { cloudflareBucketUrl } from "../../globalVariables";
import { clearDiveSitesHeadersBySiteId, updateHeaderPhoto } from '../../apicalls/supabaseCalls/diveSiteHeadersSupabaseCalls';

type HeadersEvalViewProps = {
    headers:   DiveSiteWithHeader[] | null
    setCurrentPhoto: React.Dispatch<React.SetStateAction<DiveSiteWithHeader | null>>
    currentPhoto: DiveSiteWithHeader | null
  };   

export default function DiveSitesWithHeadersView({ currentPhoto, setCurrentPhoto, headers }: HeadersEvalViewProps) {
    const updateHeaderImageSelection = async(currentPhoto: DiveSiteWithHeader, newId: number) => {
        await clearDiveSitesHeadersBySiteId(currentPhoto.dive_site_id)
        const newHEader = await updateHeaderPhoto(newId)
        setCurrentPhoto(newHEader)
    };

       return (
        <> 
    <h3>Selected Species Header Image</h3>
        {currentPhoto && currentPhoto && currentPhoto.photo_path&&
            <div className={style.cardMain} onClick={() => null}>
            <div className={style.pic}>
                <img
                    src={`${cloudflareBucketUrl}/${currentPhoto.photo_path.split("/").pop()}`}
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
                    <div className={style.cardMain} key={record.id} onClick={() => currentPhoto && updateHeaderImageSelection(currentPhoto, record.id)}>
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
