import Layout from '../../components/layout';
import { getCharactersIds, getCharactersData } from '../../lib/resources';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';



//every next.js app that use dynamic urls must include a getStaticPaths()
export async function getStaticPaths() {
    const paths= await getCharactersIds();
    console.log('paths from [id].js: ' + paths);
    return {
        paths,
        fallback: false
    };
}

//every next.js app that use dynamic urls must include a getStaticProps()

export async function getStaticProps({params}) {
    const itemData = await getCharactersData(params.id);
    return {
        props: {
            itemData
        }
    }

}

export default function Entry({itemData}) {
    console.log(itemData);
  return (
    <Layout character>
  <div className="card mx-auto card-class mt-4 p-0 border border-dark">      
  <div className="card-body">
        <div className="row">
        <div className="col-md-8">
          <div className="card-body">
          <h2 className="card-title fw-bold text-decoration-underline">{itemData.data.author}</h2>
          <h4>Quote:</h4>
        <p className="card-text">{itemData.data.quote}</p>
        {/* using a teneray(?) to ask if database has spices in its dtabase */}
        {itemData.data.youtube ?
          <a href={itemData.data.youtube}><button className="btn btn-primary">Watch Quote</button></a> 
          : null
        }
        <div className="d-block">
            <Image
            src={itemData.data.image}
            alt={itemData.data.alt}
            width={itemData.data.width}
            height={itemData.data.height}
              />
              </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  </Layout>
  );
}
