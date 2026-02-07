import { useContext, useEffect } from "react";
import { getSpecies } from "../../apicalls/supabaseCalls/speciesSupabaseCalls";
import { SeaLifeHeadersContext } from "../../contexts/seaLifeHeaders/seaLifeHeaderContext";
import SeaLifeHeadersView from "./view";

export default function SeaLifeHeadersList() {
    const { headerlessSpecies, setHeaderlessSpecies} = useContext(SeaLifeHeadersContext)

    

    useEffect(() => {
    getSpeciesPhotos()
    },[])

    const getSpeciesPhotos = async() => {
        const species = await getSpecies()
        if(species){
            setHeaderlessSpecies(species)
        }
     
     };

    return (
        <SeaLifeHeadersView headerlessSpecies={headerlessSpecies} />
    )
}