//importar librerias
import { Link } from '../routes';
//importar helper
import slug from '../helpers/slug';

class PodcastList extends React.Component {
   render() {
      // props
      const { audioClips } = this.props
      
      return (
         <React.Fragment>
            <h2>Ultimos Podcasts</h2>
            { audioClips.map((clip) => (
            <Link route='podcasts' params={{
               slug: slug(clip.title),
               id: clip.id,
               slugChannel: slug(clip.channel.title),
               idChannel: clip.channel.id
            }} prefetch key={clip.id}>
               <a className='podcast'>
                  <h3>{ clip.title }</h3>
                  <div className='meta'>
                     { Math.ceil(clip.duration / 60) } minutes
                  </div>
               </a>
            </Link>
            ))}

            {/* estilos */}
            <style jsx>{`
            .podcast {
               display: block;
               text-decoration: none;
               color: #333;
               padding: 15px;
               border-bottom: 1px solid rgba(0,0,0,0.2);
               cursor: pointer;
            }
            .podcast:hover {
               color: #000;
            }
            .podcast h3 {
               margin: 0;
            }
            .podcast .meta {
               color: #666;
               margin-top: 0.5em;
               font-size: 0.8em;
            }
            h2 {
               padding: 5px;
               font-size: 0.9em;
               font-weight: 600;
               margin: 0;
               text-align: center;
            }
         `}</style>

         </React.Fragment>
      );
   }
}

export default PodcastList;
