interface ItemSettings {
  label?: string;
  color?: string;
  pattern?: string;
  pattern_exact?: boolean;
  icon?: string;
  type: 'custom' | 'type1' | 'type2' | 'type3' | 'type4' | 'others';
  picutre?: string;
  max_items?: number;
}

export type {
  ItemSettings
};
