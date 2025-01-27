import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../assets/AnchorBlue1.png';
import iconGold from '../../../../assets/AnchorGold.png';
import { SitesArrayContext } from '../../../../contexts/sitesArrayContext';

type MarkerDiveSiteProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveSite(props: MarkerDiveSiteProps) {
  const { sitesArray } = useContext(SitesArrayContext);

  return (
    <Marker
      icon={sitesArray.find(item => item.id === props.id) ? iconGold : icon}
      title={props.title}
      position={props.position}
    >
    </Marker>
  );
}
