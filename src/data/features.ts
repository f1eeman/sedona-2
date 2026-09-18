export type FeatureId = 'city' | 'bridge' | 'area' | 'road' | 'tourists'
export type ComfortId = 'hotel' | 'gift' | 'food'

export interface FeaturePicture {
  id: Extract<FeatureId, 'city' | 'bridge'>
  image: string
  modifier: 'city' | 'bridge'
}

export interface FeatureFringe {
  id: Extract<FeatureId, 'area' | 'road' | 'tourists'>
  width: 'small' | 'road' | 'tourist'
}

export const FEATURES_PICTURES: FeaturePicture[] = [
  { id: 'city', image: 'main-city', modifier: 'city' },
  { id: 'bridge', image: 'main-bridge', modifier: 'bridge' },
]

export const FEATURES_FRINGE: FeatureFringe[] = [
  { id: 'area', width: 'small' },
  { id: 'road', width: 'road' },
  { id: 'tourists', width: 'tourist' },
]

export const FEATURES_COMFORT: ComfortId[] = ['hotel', 'gift', 'food']
