
class Banner extends React.Component {
   render() {
      const { channel } = this.props
      return (
         <React.Fragment>
            <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

            {/* estilos */}
            <style jsx>{`
               .banner {
                  width: 100%;
                  padding-bottom: 25%;
                  background-position: 50% 50%;
                  background-size: cover;
                  background-color: #aaa;
               }
            `}</style>
         </React.Fragment>
      );
   }
}

export default Banner;
