import { DragEvent, useState } from 'react';
import { useUploadImageProps } from './type';

export const useUploadImage = ({
  getFieldState,
  setValue,
}: useUploadImageProps) => {
  const [fieldValue, setFieldValue] = useState<string>('');
  const { invalid, isDirty, error } = getFieldState('image');

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setValue('image', reader.result, { shouldValidate: true });
        setFieldValue(reader.result as string);
      };
    }
  };

  const onChange = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFieldValue(reader.result as string);
    };
  };

  return {
    fieldValue,
    invalid,
    isDirty,
    error,
    onDrop,
    onChange,
  };
};
