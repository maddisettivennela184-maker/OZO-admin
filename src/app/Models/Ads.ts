export interface AdsSection {

  title?: string;

  description?: string;

  images?: string[];

  isActive?: boolean;

}

export interface Ads {

  _id?: string;

  section1?: AdsSection;

  section2?: AdsSection;

  section3?: AdsSection;

  section4?: AdsSection;

  section5?: AdsSection;

  createdAt?: string;

  updatedAt?: string;

}