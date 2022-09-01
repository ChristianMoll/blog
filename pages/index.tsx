import { FC } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma';
import Head from 'next/head'
import styles from './index.module.scss';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    }
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[]
}

const Blog: FC<Props> = (props) => {
  return (
    <div className={styles.Header}>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"></meta>
        <meta name="description" content="Personal website of web developer Christian Moll"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Christian Moll</title>
      </Head>
      <Layout>
        <div className="page">
          <h1>Public Feed</h1>
          <main>
            {props.feed.map((post) => (
              <div key={post.id} className={styles.Post}>
                <Post post={post} />
              </div>
            ))}
          </main>
        </div>
      </Layout>
    </div>
  )
}

export default Blog
