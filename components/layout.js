import Head from 'next/head';
import Link  from 'next/link';

export default function Layout({children, home}) {
return (
    <div>
        <Head>
            <title>Module 6 Firebase</title>
        </Head>
        <main>{children}</main>
        {!home && (
            <Link href='/'>
                <a className="btn btn-success btn-lg mt-4 my-auto">Back to Homepage</a>
            </Link>
        )}

    </div>
)
}