import { useContext, useEffect, useState } from "react";
import { getSingleSpecies, getSpeciesPhotos } from "../../apicalls/supabaseCalls/speciesSupabaseCalls";
import { SpeciesContext } from "../../contexts/seaLifeHeaders/speciesContext";
import SpeceisHeaderSelectionView from "./view";
import { Species } from "../../entities/species";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";

export default function SeaLifeHeadersEval( ) {
    const { species } = useContext(SpeciesContext)
    const [currentPhoto, setCurrentPhoto] = useState<Species[]| null>(null);
    const [photoList, setPhotoList] = useState<SeaLifePhoto[] | null>(null);

    const getSpeciesInfo = async(headerlessSpecies: string) => {
        const species = await getSingleSpecies(headerlessSpecies)
        setCurrentPhoto(species)

        const photos = await getSpeciesPhotos(headerlessSpecies)
        setPhotoList(photos)
     };


     const getRefreshedPhotos = async(headerlessSpecies: string) => {
        const photos = await getSpeciesPhotos(headerlessSpecies)
        setPhotoList(photos)
     };


        useEffect(() => {
            if(species){
                getSpeciesInfo(species)
            }
        },[species])



        useEffect(() => {
            if(species){
                getRefreshedPhotos(species)
            }
        },[currentPhoto])


    return (
        <SpeceisHeaderSelectionView
            currentPhoto={currentPhoto}
            setCurrentPhoto={setCurrentPhoto}
            photoList={photoList}
        />

    )

}