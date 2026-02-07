import { useContext, useEffect, useMemo, useState } from 'react';
import { MapContext } from './mapContext';
import { DiveSiteContext } from '../../contexts/diveSiteContext';
import { DiveShopContext } from '../../contexts/diveShopContext';
import { SitesArrayContext } from '../../contexts/sitesArrayContext';
import { ShopsArrayContext } from '../../contexts/shopsArrayContext';
import { debounce } from '../../reusables/_helpers/debounce';
import MapView from './view';


export default function MapLoader() {
  const mapContext = useContext(MapContext);
  const [tempMarker, setTempMarker] = useState<{ lat: number, lng: number } | null>(null);
  const { sitesArray } = useContext(SitesArrayContext);
  const { shopsArray } = useContext(ShopsArrayContext);
 
  const diveSiteContext = useContext(DiveSiteContext);
  const diveShopContext = useContext(DiveShopContext);
  
  const center = useMemo(() => ({
    lat: mapContext.initialPoint[0],
    lng: mapContext.initialPoint[1],
  }), []);

  const handleOnLoad = (map: google.maps.Map) => {
    mapContext.setMapRef(map);
  };

  const handleBoundsChange = debounce(async () => {
    if (!mapContext.mapRef) {
      return;
    }
    const boundaries = mapContext.mapRef.getBounds();
    if (boundaries) {
      mapContext.setBoundaries(boundaries);
    }
  }, 500);

  useEffect(() => {
    if (mapContext.mapRef) {
      if (diveSiteContext.selectedDiveSite && !diveSiteContext.selectedDiveSite.lat) {
        setTempMarker({
          lat: diveSiteContext.selectedDiveSite.lat,
          lng: diveSiteContext.selectedDiveSite.lng,
        });
      }

      if (diveShopContext.selectedShop && !diveShopContext.selectedShop.lat) {
        setTempMarker({
          lat: diveShopContext.selectedShop.lat,
          lng: diveShopContext.selectedShop.lng,
        });
      }
    }

    setTimeout(() => {
      setTempMarker(null);
    }, 2000);
  }, [diveSiteContext.selectedDiveSite, diveShopContext.selectedShop]);


  return (
    <MapView
      googleMapApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      mapConfig={mapContext.mapConfig}
      center={center}
      tempMarker={tempMarker}
      onLoad={handleOnLoad}
      handleBoundsChange={handleBoundsChange}
      diveSites={sitesArray.length === 0 ? [] : diveSiteContext.basicCollection.items}
      diveShops={shopsArray.length === 0 ? [] : diveShopContext.collection.items}
      proposedSites={sitesArray}
      proposedShops={shopsArray}
    />
  );
}
