//importar librerias
import { Link } from '../routes'
import slug from '../helpers/slug'

class Series extends React.Component {
   render() {
      //props
      const { series } = this.props

      return (
         <React.Fragment>
            { series.length > 0 &&
            <div>
               <h2>Series</h2>
               <div className="channels">
                  { series.map((serie) => (
                  <Link route='channel' params={{
                     slug: slug(serie.title),
                     id: serie.id
                  }} prefetch key={serie.id}>
                     <a className="channel">
                        <img src={ serie.urls.logo_image.original } alt=""/>
                        <h2>{ serie.title }</h2>
                     </a>
                  </Link>
                  ))}
               </div>
            </div>
            }

            {/* estilos */}
            <style jsx>{`
               .channels {
                  display: grid;
                  grid-gap: 15px;
                  padding: 15px;
                  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
               }
               a.channel {
                  display: block;
                  margin-bottom: 0.5em;
                  color: #333;
                  text-decoration: none;
               }
               .channel img {
                  border-radius: 3px;
                  box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
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

export default Series;

