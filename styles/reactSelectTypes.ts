import { CSSObjectWithLabel, ControlProps } from 'react-select';

export const reactSelectStyles = (borderColor: string) => ({
  placeholder: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#fff',
    fontSize: '1rem',
    '@media only screen and (min-width: 640px)': {
      fontSize: '1.25rem',
    },
  }),
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: '#11101A',
    borderColor,
    paddingInline: '0.25rem',
    paddingBlock: '0.25rem',
    boxShadow: 'none',
    ':hover': {
      borderColor,
    },
    '@media only screen and (min-width: 640px)': {
      paddingInline: '0.5rem',
    },
  }),
  multiValue: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: '#6C757D',
  }),
  multiValueLabel: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#FFF',
  }),
  multiValueRemove: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#FFF',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#9C9A9A',
      color: '#FFF',
    },
  }),
  menu: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: '#11101A',
  }),
  option: (styles: CSSObjectWithLabel) => {
    return {
      ...styles,
      backgroundColor: '#11101A',
      color: '#FFF',
      cursor: 'pointer',
    };
  },
  input: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#fff',
  }),
});

export const QuoteMutationSelectStyles = (borderColor: string) => ({
  placeholder: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#fff',
    paddingLeft: '3rem',
    fontSize: '1rem',
    paddingBlock: '1.5rem',
    '@media only screen and (min-width: 640px)': {
      fontSize: '1.25rem',
    },
  }),
  control: (styles: CSSObjectWithLabel, props: ControlProps) => ({
    ...styles,
    backgroundColor: '#000',
    paddingInline: '0.25rem',
    paddingBlock: '0.25rem',
    boxShadow: 'none',
    borderColor,
    marginBottom: props.menuIsOpen && '12rem',
    ':hover': {
      borderColor,
    },
    '@media only screen and (min-width: 640px)': {
      paddingInline: '0.5rem',
    },
  }),
  multiValue: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: '#6C757D',
  }),
  multiValueLabel: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#FFF',
  }),
  multiValueRemove: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#FFF',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#9C9A9A',
      color: '#FFF',
    },
  }),
  menu: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: '#11101A',
  }),
  menuList: (styles: CSSObjectWithLabel) => ({
    ...styles,
    maxHeight: '12rem',
  }),
  option: (styles: CSSObjectWithLabel) => {
    return {
      ...styles,
      backgroundColor: '#11101A',
      color: '#FFF',
      cursor: 'pointer',
    };
  },
  input: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#fff',
    paddingLeft: '3rem',
  }),
  singleValue: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#fff',
    fontSize: '1rem',
    paddingLeft: '3rem',
    paddingBlock: '1.5rem',
    '@media only screen and (min-width: 640px)': {
      fontSize: '1.25rem',
    },
  }),
});

export type ReactSelectStylesType = ReturnType<typeof reactSelectStyles>;
export type QuoteMutationSelectType = ReturnType<
  typeof QuoteMutationSelectStyles
>;
