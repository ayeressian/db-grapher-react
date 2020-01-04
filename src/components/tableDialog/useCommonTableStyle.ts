import { createUseStyles } from 'react-jss';

export default createUseStyles({
  table: {
    marginTop: '20px',
    border: 'none',
    borderCollapse: 'collapse',
    th: {
      textAlign: 'left',
    },
    '& td:first-child, & th:first-child': {
      borderLeft: 'none',
    },
    '& td, & th': {
      borderLeft: '1px solid #AAA',
      padding: '3px 5px 3px 5px',
    },
    'tr:hover': {
      backgroundColor: '#DDD',
    },
  },
});
