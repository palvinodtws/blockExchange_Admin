import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../Component/ui/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";
import Footer from "../Component/ui/Footer";
import Head from "next/head";
import Script from "next/script";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { getSession } from "next-auth/react";



function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <SSRProvider>
            <Head>
              <meta
                key="description"
                property="og:description" content="Matrimonial Admin"/>
              <meta property="og:image" key="image" style={{width:"100%"}} content="" />
              <link rel="icon" type="image/x-icon"  style={{width:"100%"}} href="/logo.ico"/>
            </Head>
        {/* <Navbar {...pageProps} /> */}
            <Component {...pageProps} />
            
            {/* <Footer  /> */}
          <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"></Script>
 

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/fontawesome.min.css" integrity="sha512-RvQxwf+3zJuNwl4e0sZjQeX7kUa3o82bDETpgVCH2RiwYSZVDdFJ7N/woNigN/ldyOOoKw8584jM4plQdt8bhA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/v5-font-face.min.css" integrity="sha512-FrptovHG4M5T2rAIxvIeTsv3z3luk7BF7WEYdUkTB8VtkqD+8ZYlVPpJgIGqWK65sxuom0q6/lpXpBu43CdaPg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.9.1/font/bootstrap-icons.min.css" integrity="sha512-5PV92qsds/16vyYIJo3T/As4m2d8b6oWYfoqV+vtizRB6KhF1F9kYzWzQmsO6T3z3QG2Xdhrx7FQ+5R1LiQdUA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

      </SSRProvider>
    </SessionProvider>
  );
}

export default MyApp;
