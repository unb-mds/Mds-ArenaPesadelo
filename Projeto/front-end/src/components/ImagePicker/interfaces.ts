
export interface IImagePicker {
  type?: 'square' | 'circle';
  defaultImage?: string;
  onPick(file: File | null): Promise<void>;
}
