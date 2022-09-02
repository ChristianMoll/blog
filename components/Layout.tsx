import React, { ReactNode } from "react";
import Header from "./Header";
import styles from './layout.module.scss';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className={styles.Layout}>
    <Header />
    <div className={styles.Content}>{props.children}</div>
  </div>
);

export default Layout;
