import { CSSObjectWithLabel } from 'react-select';

export const reactSelectStyles = {
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
    marginBottom: '1rem',
    borderColor: '#6C757D',
    paddingInline: '0.25rem',
    paddingBlock: '0.25rem',
    boxShadow: 'none',
    ':hover': {
      borderColor: '#6C757D',
    },
    '@media only screen and (min-width: 640px)': {
      paddingInline: '0.5rem',
      marginBottom: '1.5rem',
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
};
