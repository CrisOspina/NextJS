//importar librerias
import 'isomorphic-fetch';

//import componentes
import Layout from '../components/Layout';
import PodcastSelect from '../components/PodcastSelect';
import Error from './_error'

export default class extends React.Component {
   //id
   static async getInitialProps({ query, res }){
      const id = query.id
      try {
         const reqClip = await fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`)

         if(reqClip.status >= 400) {
            res.statusCode = reqClip.status
            return { clip: null, statusCode: reqClip.status }
         }
         const clip = (await reqClip.json()).body.audio_clip

         return { clip, statusCode: 200 }

      }catch(e) {
         return { clip: null, statusCode: 503 }
      }
   }

   render(){
      //Recibo lo obtenido de la api
      const { clip, statusCode } = this.props

      if(statusCode !== 200) {
         return <Error statusCode = { statusCode } />
      }

      return(
         <Layout title = { clip.title }>
            <PodcastSelect clip = { clip } />
         </Layout>
      )
   }
}