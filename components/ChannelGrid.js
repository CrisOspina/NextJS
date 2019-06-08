//importar librerias
import { Link } from '../routes';
//importar helper
import slug from '../helpers/slug';

class ChannelGrid extends React.Component {
   render() {
      //Propiedad channels
      const { channels } = this.props

      return (
         <React.Fragment>
            <div className="channels">
               { channels.map((channel) => (
                  <Link route='channel' 
                     params={{ 
                        slug: slug(channel.title),
                        id: channel.id
                     }} prefetch key={channel.id}>
                     <a className="channel" key={channel.id}>
                        <img src={ channel.urls.logo_image.original } alt="Channel"/>
                        <h2>{ channel.title }</h2>
                     </a>
                  </Link>
               )) }
            </div>

            {/* Estilos */}
            <style jsx>{`
               .channels {
                  display: grid;
                  grid-gap: 15px;
                  padding: 15px;
                  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
               }

               .channel {
                  display: block;
                  border-radius: 3x;
                  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
               }

               a.channel {
                  display: block;
                  margin-bottom: 0.5em;
                  color: #333;
                  text-decoration: none;
               }

               .channel img {
                  width: 100%;
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

export default ChannelGrid;
