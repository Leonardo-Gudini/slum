import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export type Photo = {
  "albumId": number,
  "id": number,
  "title": string,
  "url": string,
  "thumbnailUrl": string
}

export type Album = {
  "userId": number,
  "id": number,
  "title": string
}

function App() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);

  const [albums, setAlbums] = useState<Album[] | null>(null);

    useEffect(()=>{
      axios.all([
        axios.get('https://jsonplaceholder.typicode.com/photos'),
        axios.get('https://jsonplaceholder.typicode.com/albums')
      ])
      .then(axios.spread((photos, albums) => {
        setPhotos(photos.data)
        setAlbums(albums.data)
      }))
    })

    const changeResolution = (url: string)=>{
      window.open(url)
    }

    ////////////

    return(
      <div>
        {albums?.map((album, index) => {
          return(
            <div key={index}>
              <h1 className='album-title'>{album.title}</h1>
              {photos?.map((photo, index) => {
                if (photo.albumId === album.id) {
                  return (
                      <div key={index}>
                          <div className='container'>
                            <div className='photo-item'>
                              <img className='image' onClick={()=>changeResolution(photo.url)} src={photo.thumbnailUrl} alt={photo.title} />
                              <ul>
                                <li>Title: {photo.title}</li>
                                <li>Album ID: {photo.albumId}</li>
                                <li>ID: {photo.id}</li>
                              </ul>
                            </div>
                          </div>
                      </div>
                  )
                }
                
              })}
            </div>
          )
        })}
      </div>
    )

    // return(
    //   <div>
    //     {albums?.map((album, index) => {
    //       return (
    //         <div key={index}>
    //           <h1 className='albumTitle'>{album.title}</h1>
    //           {photos?.map((photo, index) => {
    //             return (
    //               <div className='d-flex flex-wrap' key={index}>
    //                 <img className='image' onClick={()=>changeResolution(photo.url)} src={photo.thumbnailUrl} alt={photo.title} />
    //               </div>
    //             )
    //           })}
    //         </div>
    //       )
    //     })}
    //   </div>
    // )

    

    // return (
    //     <div className="App">
    //         {photos
    //             ? photos.map((photo) => {
    //                   return <div>
    //                   <ul>
    //                     <li>Photo Title: {photo.title}</li>
    //                     <li>Album ID: {photo.albumId}</li>
    //                     <li>ID: {photo.id}</li>
    //                   </ul>
    //                   <img onClick={()=>changeResolution(photo.url)} src={photo.thumbnailUrl} alt={photo.title}/>
    //                 </div>;
    //               })
    //             : null}

    //         {albums
    //             ? albums.map((album) => {
    //               return <div>
    //                 <ul>
    //                   <li>Album Title: {album.title}</li>
    //                 </ul>
    //               </div>
    //             })
    //           : null}
    //     </div>
    // );
}

export default App;
