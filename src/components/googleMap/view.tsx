import React, { useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, Libraries } from '@react-google-maps/api';
import style from './style.module.scss';
import { ClusterProperty, PointFeatureCategory } from './types';
import { DiveSiteBasic } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';
import './style.css';
import { MarkerDiveSiteCluster } from './marker/markerDiveSiteCluster';
import Supercluster from 'supercluster';
import { diveSiteToPointFeature } from './dto/diveSiteToPointFeature';
import useSupercluster, { UseSuperclusterArgument } from 'use-supercluster';
import { MarkerDiveSite } from './marker/markerDiveSite';
import { MarkerDiveShop } from './marker/markerDiveShop';
import { diveShopToPointFeature } from './dto/diveShopToPointFeature';
import RoundButtonIcon from '../../reusables/roundButton';
import Icon from '../../icons/Icon';

const libraries: Libraries = ['places', 'visualization'];

type MapViewProps = {
  googleMapApiKey:    string
  options?:           google.maps.MapOptions
  mapConfig:          number
  zoom?:              number
  center:             google.maps.LatLngLiteral
  tempMarker?:        google.maps.LatLngLiteral | null
  onLoad?:            (map: google.maps.Map) => void
  handleBoundsChange: () => void
  diveSites?:         DiveSiteBasic[] | null
  diveShops?:         DiveShop[] | null
};

export default function MapView(props: MapViewProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id:               'google-map-script',
    libraries,
    googleMapsApiKey: props.googleMapApiKey,
  });

  const options: google.maps.MapOptions = useMemo(() => ({
    mapTypeId:             'hybrid',
    clickableIcons:        false,
    maxZoom:               18,
    minZoom:               3,
    mapTypeControl:        false,
    fullscreenControl:     false,
    disableDefaultUI:      true,
    streetViewControl:     false,
    ...(props.options ?? {}),
  }), [props.options]);


  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
    if (typeof props.onLoad === 'function') {
      props.onLoad(map);
    }
  };

  const zoomMapIn = () => {
    const zoom = map?.getZoom();
    if (zoom) {
      map?.setZoom(zoom + 1);
    }
  };

  const zoomMapOut = () => {
    const zoom = map?.getZoom();
    if (zoom) {
      map?.setZoom(zoom - 1);
    }
  };

  const clusterConfig = useMemo<UseSuperclusterArgument<ClusterProperty, Supercluster.AnyProps>>(() => {
    const bounds = map?.getBounds();
    const zoom = map?.getZoom();

    if (bounds && zoom) {
      const points = [] as Supercluster.PointFeature<ClusterProperty>[];
      props.diveSites?.forEach(item => points.push(diveSiteToPointFeature(item)));
      props.diveShops?.forEach(item => points.push(diveShopToPointFeature(item)));
      return {
        points:  points,
        options: { radius: 75, maxZoom: 16 },
        zoom:    zoom,
        bounds:  [
          bounds.getSouthWest().lng(),
          bounds.getSouthWest().lat(),
          bounds.getNorthEast().lng(),
          bounds.getNorthEast().lat(),
        ],
      };
    }

    return { points:  [], zoom:    0 };
  }, [props.diveSites, props.diveShops]);
  const { clusters, supercluster } = useSupercluster(clusterConfig);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      zoom={props.zoom || 10}
      center={props.center}
      mapContainerClassName={style.mapContainer}
      options={options}
      onLoad={onMapLoad}
      onBoundsChanged={props.handleBoundsChange}
    >

      {clusters && clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const isCluster = cluster.properties.cluster;
        const pointCount = cluster.properties.point_count;

        if (isCluster && pointCount && supercluster && cluster.id) {
          return (
            <MarkerDiveSiteCluster
              key={cluster.id}
              pointCount={pointCount}
              position={{ lat, lng }}
              expansionZoom={supercluster.getClusterExpansionZoom(+cluster.id)}
            />
          );
        }

        if (cluster.properties.category === PointFeatureCategory.DiveSite) {
          return (
            <MarkerDiveSite
              key={cluster.id}
              id={cluster.properties.id}
              title={cluster.properties.title}
              position={{ lat, lng }}
            />
          );
        }

        if (cluster.properties.category === PointFeatureCategory.DiveShop) {
          return (
            <MarkerDiveShop
              key={cluster.id}
              id={cluster.properties.id}
              title={cluster.properties.title}
              position={{ lat, lng }}
            />
          );
        }
      })}


      <div className={style.zoomButtonContainer}>
        <RoundButtonIcon icon={<Icon name="plus" color="blue" onClick={zoomMapIn} />} />
        <RoundButtonIcon icon={<Icon name="minus" color="blue"  onClick={zoomMapOut} />} />
      </div>

    </GoogleMap>
  );
}
