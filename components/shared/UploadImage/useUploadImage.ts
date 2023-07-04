import { DragEvent, useState } from 'react';
import { useUploadImageProps } from './type';
import { getImageBlob } from '@/helpers';

export const useUploadImage = <T>({
  getFieldState,
  setValue,
}: useUploadImageProps<T>) => {
  const [fieldValue, setFieldValue] = useState<string>('');
  const { invalid, isDirty, error } = getFieldState('image');

  const onDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    setValue('image', files, { shouldValidate: true });
    if (files.length > 0) {
      const image = await getImageBlob(files[0]);
      setFieldValue(image);
    }
  };

  const onChange = async (file: File) => {
    const image = await getImageBlob(file);
    setFieldValue(image);
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
