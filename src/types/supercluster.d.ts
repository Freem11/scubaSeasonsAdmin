/**
 * Types for the `supercluster` package (8.x). The package ships no declaration file and
 * this install has no `@types/supercluster` or `@types/geojson`, so the public API from the
 * package README (Methods, Options) and the GeoJSON Feature and Point shapes are declared here.
 * `use-supercluster/dist/index.d.ts` reads `Supercluster.PointFeature`, `ClusterProperties`,
 * `AnyProps` and `Options` from this module.
 * `npm i -D @types/supercluster @types/geojson` can replace this file.
 */
declare module 'supercluster' {
  namespace Supercluster {
    type Position = number[];
    type BBox = [number, number, number, number] | [number, number, number, number, number, number];

    interface Point {
      type:        'Point'
      coordinates: Position
    }

    interface Feature<G, P> {
      type:       'Feature'
      id?:        string | number
      geometry:   G
      properties: P
      bbox?:      BBox
    }

    interface AnyProps {
      [name: string]: unknown
    }

    interface ClusterProperties {
      cluster:                 true
      cluster_id:              number
      point_count:             number
      point_count_abbreviated: string | number
    }

    interface Options<P, C> {
      minZoom?:    number
      maxZoom?:    number
      minPoints?:  number
      radius?:     number
      extent?:     number
      nodeSize?:   number
      log?:        boolean
      generateId?: boolean
      map?:        (props: P) => C
      reduce?:     (accumulated: C, props: Readonly<C>) => void
    }

    type PointFeature<P> = Feature<Point, P>;
    type ClusterFeature<C> = PointFeature<ClusterProperties & C>;

    interface TileFeature<C, P> {
      type:     1
      geometry: [[number, number]]
      tags:     (ClusterProperties & C) | P
    }

    interface Tile<C, P> {
      features: TileFeature<C, P>[]
    }
  }

  class Supercluster<P = Supercluster.AnyProps, C = Supercluster.AnyProps> {
    constructor(options?: Supercluster.Options<P, C>);
    load(points: Supercluster.PointFeature<P>[]): Supercluster<P, C>;
    getClusters(bbox: Supercluster.BBox, zoom: number): (Supercluster.ClusterFeature<C> | Supercluster.PointFeature<P>)[];
    getTile(z: number, x: number, y: number): Supercluster.Tile<C, P> | null;
    getChildren(clusterId: number): (Supercluster.ClusterFeature<C> | Supercluster.PointFeature<P>)[];
    getLeaves(clusterId: number, limit?: number, offset?: number): Supercluster.PointFeature<P>[];
    getClusterExpansionZoom(clusterId: number): number;
  }

  export = Supercluster;
}
