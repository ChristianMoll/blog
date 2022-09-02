import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className={styles.Left}>
      <Link href="/">
        <a className={styles.Bold} data-active={isActive('/')}>
          Feed
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className={styles.Left}>
        <Link href="/">
          <a className={styles.Bold} data-active={isActive('/')}>
            Feed
          </a>
        </Link>
      </div>
    );
    right = (
      <div className={styles.Right}>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className={styles.Right}>
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className={styles.Left}>
        <Link href="/">
          <a className={styles.Bold} data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive('/drafts')}>My drafts</a>
        </Link>
      </div>
    );
    right = (
      <div className={styles.Right}>
        <Link href="/create">
            <a>New post</a>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    );
  }

  return (
    <nav className={styles.Nav}>
      {left}
      {right}
    </nav>
  );
};

export default Header;
