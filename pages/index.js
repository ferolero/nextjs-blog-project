import Link from 'next/link';
import Date from '../components/date';
import Layout, {siteTitle} from '../components/layout';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    },
  };
}

export default function Home({allPostsData}) {
  {console.log('postdata:',allPostsData)}
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[This is a Blog having some interesting entries regarding NextJS and some cool stuff]</p>
        <p>(esto es solamente una simulación - esto es solamente una simulación - esto es solamente una simulación)</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}
        style={{color:'gray'}}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br/>
              <small className={utilStyles.lightText}><Date dateString={date} /></small>
              
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
