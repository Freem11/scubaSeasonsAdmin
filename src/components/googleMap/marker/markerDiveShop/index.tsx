import React from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../assets/DiveCentre24x24.png';

type MarkerDiveShopProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveShop(props: MarkerDiveShopProps) {

  return (
    <Marker
      icon={icon}
      title={props.title}
      position={props.position}
    >
    </Marker>
  );
}
