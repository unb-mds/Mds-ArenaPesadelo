
export interface IImagePicker {
  defaultImage?: string;
  onPick(file: File | null): Promise<void>;
}
