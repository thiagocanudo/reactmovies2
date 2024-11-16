import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDataId, getDataVideos } from "../api/tmdb";
import { BarLoader } from "react-spinners";

export function Detalhes() {
  // console.log(useParams());
  // console.log("desestruturação do objeto: " +useParams().id+ " e " +useParams().categoria);

  const { categoria } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  const [itemVideo, setItemVideo] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const urlVideo = itemVideo[itemVideo.length - 1];

  async function loadData() {
    setLoading(true);
    try {
      const data = await getDataId(categoria, id);
      setItem(data);
    } catch (error) {
      console.log("Erro ao buscar dados: ", error);
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
      console.log("Erro ao buscar dados: ", error);
    }
  }

  useEffect(() => {
    loadData();
    loadDataVideos();
  }, []);

  if (loading) {
    return <BarLoader width={"100%"} color="#00B1E9" className="mt-24" />;
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
                mt-6
                mb-20
                mx-auto
                relative 
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
              Ano:{" "}
              {item.first_air_date?.substring(0, 4) ||
                item.release_date?.substring(0, 4)}
            </li>
            <li>Avaliação: {item.vote_average?.toFixed(1)}</li>
            <li>{item.title || item.name}</li>
          </ul>

          {/* <div className="bg-black"></div> */}

          <p className="mt-2">{item.overview}</p>

          {urlVideo && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-brand-blue-light hover:bg-brand-yellow text-gray-50 hover:text-brand-dark mr-3 py-2 px-10 font-bold rounded my-5"
            >
              Trailler
            </button>
          )}

          <button
            onClick={() => navigate(-1)}
            className="bg-brand-blue-light hover:bg-brand-yellow text-gray-50 hover:text-brand-dark py-2 px-10 font-bold rounded my-5"
          >
            Voltar
          </button>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-brand-blue-dark">
                    {item.title || item.name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {urlVideo && (
                    <iframe
                      className="mx-auto"
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${urlVideo.key}?si=EUyYitu5wVAnXqz5`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
