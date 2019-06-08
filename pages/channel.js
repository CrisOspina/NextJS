//importar librerias
import 'isomorphic-fetch';

//importar componentes
import Error from './_error'
import Layout from '../components/Layout';
import PodcastListWithClick from '../components/PodcastListWithClick';
import Series from '../components/Series';
import Banner from '../components/Banner';
import PodcastPlayer from '../components/PodcastPlayer';

export default class extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openPodcast: null
    }
  }

  static async getInitialProps({ query, res }) {
    let idChannel = query.id
    try {
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
      ])

      //error 404
      if( reqChannel.status >= 400 ) {
        res.statusCode = reqChannel.status //respond para el server
        return {
          channel: null, audioClips: null, series: null, statusCode: reqChannel.status
        }
      }
      
      let dataChannel = await reqChannel.json()
      let channel = dataChannel.body.channel
      
      let dataAudios = await reqAudios.json()
      let audioClips = dataAudios.body.audio_clips
      
      let dataSeries = await reqSeries.json()
      let series = dataSeries.body.channels
      
      return { channel, audioClips, series, statusCode: 200 }
    } catch(e) {
      return { 
        channel: null, audioClips: null, series: null, statusCode: 503
      }
    }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }

  closePodcast = (event) => {
    event.preventDefault()
    this.setState({
      openPodcast: null
    })
  }

  render() {
    const { channel, audioClips, series, statusCode } = this.props
    const { openPodcast } = this.state

    if( statusCode !== 200 ) return <Error statusCode = { statusCode } />

    return (
      <Layout title={channel.title}>
        <Banner channel = { channel } /> 

        { openPodcast && 
          <PodcastPlayer 
            clip = { openPodcast } 
            onClose = { this.closePodcast }
          />  
        }
        
        <h1>{ channel.title }</h1>

        <Series series = { series } />
      
        <PodcastListWithClick 
          podcasts = { audioClips }  
          onClickPodcast = { this.openPodcast }
        />
        
        {/* estilos */}
        <style jsx>{`
        h1 {
          font-weight: 600;
          padding: 15px;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
        }
      `}</style>
    </Layout>)
  }
}
