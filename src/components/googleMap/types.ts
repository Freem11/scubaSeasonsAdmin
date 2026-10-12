export enum PointFeatureCategory {
  DiveSite = 1,
  DiveShop = 2,
};

export type ClusterProperty = {
  id:           number
  title:        string
  cluster:      boolean
  category:     PointFeatureCategory
  point_count?: number
};
