//importar dependencias
import 'isomorphic-fetch';

//importar componentes
import Error from './_error'
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

export default class extends React.Component {
   //llamar api
   static async getInitialProps({ res }){
      try {
         const req = await fetch('https://api.audioboom.com/channels/recommended')
         const { body: channels } = await req.json()
         
         return { channels, statusCode: 200 }
      } catch(e) {
         res.statusCode = 503
         return { channels: null, statusCode: 503 }
      }
   }

   render(){
      //Traer canales del getInitialProps
      const { channels, statusCode } = this.props 

      //validar errores
      if(statusCode !== 200) return <Error statusCode = { statusCode }/>

      return(
          <Layout title = "Podcasts">
            <ChannelGrid channels = { channels } />
         </Layout>
      ) 
   }
}
