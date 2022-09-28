import Layout from '../components/layout';
import { getCharactersIds, getCharactersData } from '../lib/resources';
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
    <div className="row">
      <div className="col-md-8">
        <div className="card-body w-50">
          <h2 className="card-title fw-bold text-decoration-underline">{itemData.data.author}</h2>
          <h4>Quote:</h4>
          <p>{itemData.data.quote}</p>
          <div className="d-block">
          <Image
          src={itemData.data.image}
          alt={itemData.data.alt}
          width={itemData.data.width}
          height={itemData.data.height}
            />
            </div>
          <button className="btn btn-success"><a href={itemData.data.youtube}>Watch the Quote</a></button>
          <h5 className="my-3">Affiliation:</h5>
               {itemData.data.affiliation.map((affiliation) => (
                <div key={affiliation}>
                <ul>
                  <li>
                    {affiliation}
                  </li>
                </ul>
                </div>
              ))}
            
            {itemData.related ? // if there are related id, display this header 
              <h5 className="my-3">Type: {itemData.data.type}</h5> : null
            }
        </div>
      </div>
    </div>
  </div>
  
    </Layout>
  );
}
