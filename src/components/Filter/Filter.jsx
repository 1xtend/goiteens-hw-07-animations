import styles from './Filter.module.css';

import Input from '../Input/Input';

function Filter({ onChange }) {
  return (
    <div className={styles.search}>
      <label htmlFor="searchInput">Find contact by name</label>

      <Input type="search" id="searchInput" onChange={onChange} />
    </div>
  );
}
export default Filter;
