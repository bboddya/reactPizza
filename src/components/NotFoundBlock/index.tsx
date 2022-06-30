import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => (
  <h1 className={styles.wrap}>
    :(
    <br />
    Ничего не найдено!
  </h1>
);

export default NotFoundBlock;
