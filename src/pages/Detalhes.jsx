import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataId, getDataVideos } from '../api/tmdb';
import { BarLoader } from 'react-spinners';

export function Detalhes() {
  // console.log(useParams());
  // console.log("desestruturação do objeto: " +useParams().id+ " e " +useParams().categoria);

  const [loading, setLoading] = useState(true);

  const { categoria } = useParams();
  const { id } = useParams();

  const navigate = useNavigate();

  const [item, setItem] = useState([]);
  const [itemVideo, setItemVideo] = useState([]);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getDataId(categoria, id);
      setItem(data);
    } catch (error) {
      console.log('Erro ao buscar dados: ', error);
    }
  }

  async function loadDataVideos() {
    setLoading(true);
    try {
      const data = await getDataVideos(categoria, id);
      setItemVideo(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log('Erro ao buscar dados: ', error);
    }
  }

  useEffect(() => {
    loadData();
    loadDataVideos();
  }, []);

  if (loading) {
    return <BarLoader width={'100%'} color="#00B1E9" className="mt-24" />;
  }

  return (
    <>
      {/* <h1 className="mt-2">{categoria} - {id}</h1> */}
      <div className="h-[300] lg:h-[500]">
        <img
          className="relative w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`}
          alt=""
        />
      </div>

      <div
        className="
                flex
                w-[90%]
                max-w-[850px]
                mt-3
                mx-auto

                lg:absolute
                lg:top-40
                lg:left-[50%]
                lg:ml-[-425px]

                bg-brand-dark
                bg-opacity-50 
                backdrop-blur-sm
                items-start
                gap-8
                pr-6"
      >
        <div>
          <img
            className="hidden lg:block"
            width={300}
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            alt=""
          />
        </div>
        <div>
          <h2 className="mt-2 font-bold text-lg">{item.title || item.name}</h2>
          <ul>
            <li>
              Ano:{' '}
              {item.first_air_date?.substring(0, 4) ||
                item.release_date?.substring(0, 4)}
            </li>
            <li>Avaliação: {item.vote_average?.toFixed(1)}</li>
          </ul>

          <div className="bg-black">
            {/* {categoria === 'filmes' && ()} */}
            {id}
            <iframe
              className="mx-auto"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                itemVideo[itemVideo.length - 1].key
              }?si=EUyYitu5wVAnXqz5`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>

          <p className="mt-2">{item.overview}</p>

          <button
            onClick={() => navigate(-1)}
            className="bg-brand-blue-light hover:bg-brand-yellow text-gray-50 hover:text-brand-dark py-2 px-10 font-bold rounded my-5"
          >
            Voltar
          </button>
        </div>
      </div>
    </>
  );
}
