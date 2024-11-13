import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataId } from '../api/tmdb';

export function Detalhes() {
  // console.log(useParams());
  // console.log("desestruturação do objeto: " +useParams().id+ " e " +useParams().categoria);

  const { categoria } = useParams();
  const { id } = useParams();

  const navigate = useNavigate();

  const [item, setItem] = useState([]);

  async function loadData() {
    const data = await getDataId(categoria, id);
    setItem(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  {
    console.log(item);
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
                lg:top-80
                lg:left-[50%]
                lg:ml-[-425px]

                bg-brand-dark
                bg-opacity-50 
                backdrop-blur-sm
                items-center
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
