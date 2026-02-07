import React from "react";
import style from './styles.module.scss';
import { Species } from "../../entities/species";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import { updateSpeciesImage } from "../../apicalls/supabaseCalls/speciesSupabaseCalls";

type SpeceisHeaderSelectionViewProps = {
    currentPhoto: Species[] | null;
    setCurrentPhoto: React.Dispatch<React.SetStateAction<Species[] | null>>
    photoList: SeaLifePhoto[] | null;
};

export default function SpeceisHeaderSelectionView({ currentPhoto, setCurrentPhoto, photoList }: SpeceisHeaderSelectionViewProps) {

    const updateHeaderImageSelection = async(speciesId: number, imageId: number) => {
        const updatedSpeciesRecord= await updateSpeciesImage(speciesId, imageId)
        setCurrentPhoto(updatedSpeciesRecord)
    };

    let showPhoto = true
    if(currentPhoto){
        showPhoto = currentPhoto[0].image_url
    } else {
        showPhoto = false
    }

    return (
        <> 
    <h3>Selected Species Header Image</h3>
        {currentPhoto && currentPhoto[0] && currentPhoto[0].image_id&&
            <div className={style.cardMain} onClick={() => null}>
            <div className={style.pic}>
                <img
                    src={`${currentPhoto[0].public_domain}/${currentPhoto[0].md}`}
                    width={200}
                    style={{borderRadius: "5%"}}
                    alt={currentPhoto.label}
                />
            </div>
            <div className="full-height flex-column">
                <div>{currentPhoto.label}</div>
            </div>
        </div>}

        {!currentPhoto || !currentPhoto[0].image_id &&
            <div className={style.cardMain} onClick={() => null}>
            <div className={style.pic}>
            </div>
            <div className="full-height flex-column">
                <div>No Image Selected</div>
            </div>
        </div>}
          
        <h3>Species Header Image Options</h3>

            {photoList && photoList.map((record) => {
                const photoName = record.photoFile.split('/').pop();

                return (
                    <div className={style.cardMain} key={record.id} onClick={() => updateHeaderImageSelection(currentPhoto[0].id, record.image_id)}>
                        <div className={style.pic}>
                            <img
                                src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
                                width={200}
                                className={currentPhoto && currentPhoto[0].image_id === record.image_id ? style.imageSelected :  style.image}
                                alt={record.label}
                            />
                        </div>
                        <div className="full-height flex-column">
                            <div>{record.label}</div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}