export interface FeaturePicture {
  kind: 'picture'
  title: string
  number: string
  text: string
  image: string
  imageAlt: string
  modifier: 'city' | 'bridge'
}

export interface FeatureFringe {
  kind: 'fringe'
  title: string
  number: string
  text: string
  width: 'small' | 'road' | 'tourist'
}

export interface FeatureComfort {
  icon: 'hotel' | 'gift' | 'food'
  title: string
  text: string
}

export const FEATURES_PICTURES: FeaturePicture[] = [
  {
    kind: 'picture',
    title: 'Настоящий городок',
    number: '– №1 –',
    text: 'Седона не аттракцион для туристов, там течет своя жизнь',
    image: 'main-city',
    imageAlt: 'Фото города «Sedona»',
    modifier: 'city',
  },
  {
    kind: 'picture',
    title: 'Там есть дерзкий мост',
    number: '– №2 –',
    text: 'Да, по нему можно пройти! Если вы осмелитесь, конечно',
    image: 'main-bridge',
    imageAlt: 'Фото дерзкого моста города «Sedona»',
    modifier: 'bridge',
  },
]

export const FEATURES_FRINGE: FeatureFringe[] = [
  {
    kind: 'fringe',
    title: 'Небольшая площадь',
    number: '– №3 –',
    text: 'Все интересные места находятся очень близко',
    width: 'small',
  },
  {
    kind: 'fringe',
    title: 'Красивая дорога',
    number: '– №4 –',
    text: 'Ехать в Седону из Лас-Вегаса совсем не скучно!',
    width: 'road',
  },
  {
    kind: 'fringe',
    title: 'Мало туристов',
    number: '– №5 –',
    text: 'Большинство едет в Гранд-Каньон и толпится там',
    width: 'tourist',
  },
]

export const FEATURES_COMFORT: FeatureComfort[] = [
  {
    icon: 'hotel',
    title: 'Жилье',
    text: 'Рекомендуем пожить в настоящем мотеле, все как в кино!',
  },
  {
    icon: 'gift',
    title: 'Сувениры',
    text: 'Не только китайского, но и местного производства!',
  },
  {
    icon: 'food',
    title: 'Еда',
    text: 'Всегда заказывайте фирменный бургер, вы не разочаруетесь!',
  },
]
