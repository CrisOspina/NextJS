//importar componentes
import Layout from "../components/Layout";
import Link from 'next/link';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
   const { statusCode } = this.props

    return (
       <Layout title = "Oh nooo :(">
        { statusCode === 404 ?
            <div className="message">
               <h1>Hmm no existe la página</h1>
               <p>
                  <Link href="/">
                     <a> Volver al inicio</a>
                  </Link>
               </p>
            </div>
            :
            <div className="message">
               <h1>Hubo un problema :(</h1>
               <p>Intenta nuevamente en unos segundo</p>
            </div>
        }

        <style jsx>{`
            .message {
               padding: 100px 30px;
               text-align: center;
            }   

            h1 {
               margin-bottom: 2em;
            }
            
            a {
               color: #8756ca;
            }
        `}</style>
      </Layout>
    )
  }
}

export default Error