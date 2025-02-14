import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../assets/DiveCentre24x24.png';
import { ShopsArrayContext } from '../../../../contexts/shopsArrayContext';

type MarkerDiveShopProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveShop(props: MarkerDiveShopProps) {
  const { shopsArray } = useContext(ShopsArrayContext);

  return (
    <Marker
      icon={shopsArray.find(item => item.id === props.id) ? icon : icon}
      title={props.title}
      position={props.position}
    >
    </Marker>
  );
}
