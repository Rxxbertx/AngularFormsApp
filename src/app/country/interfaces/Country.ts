export interface Fra {
  official: string;
  common: string;
}

export interface Hat {
  official: string;
  common: string;
}

export interface NativeName {
  fra: Fra;
  hat: Hat;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface CountryItem {
  name: Name;
  cca3: string;
  borders: string[];
};
