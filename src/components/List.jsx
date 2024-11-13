import { useEffect, useState } from 'react';
import { getData } from '../api/tmdb';
import { BarLoader } from 'react-spinners';
import Card from './Card';
import { Pagination } from './Pagination';
import { Classification } from './Classification';

export default function ({ categoria }) {
  const [items, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [ordem, setOrdem] = useState('popular');

  const options =
    categoria == 'filmes'
      ? [
          { value: 'popular', options: 'Popular' },
          { value: 'top_rated', options: 'Melhores Filmes' },
          { value: 'upcoming', options: 'Em Breve' },
          { value: 'now_playing', options: 'Em Cartaz' },
        ]
      : [
          { value: 'popular', options: 'Popular' },
          { value: 'top_rated', options: 'Melhores Séries' },
          { value: 'on_the_air', options: 'No Ar' },
        ];

  // não existe uma função 'awayt' sem que esteja dentro de uma função 'asyncrona'
  async function loadItems() {
    setLoading(true);
    try {
      const data = await getData(categoria, page, ordem); // aciona a API
      setItens(data); //Guarda os dados da API em um estado
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log('Erro ao buscar dados: ', error);
    }
  }

  function handleOrder(ordem) {
    setOrdem(ordem);
    setPage(1);
  }

  // Função especial que é executada ao fim da renderização do componemte
  useEffect(() => {
    loadItems();
    console.log(ordem);
  }, [page, ordem]);

  if (loading) {
    return <BarLoader width={'100%'} color="#00B1E9" />;
  }

  return (
    <div className="max-w-container-site mx-auto pb-20">
      <div className="flex justify-between mt-6">
        <div>
          <select
            value={ordem}
            onChange={(e) => handleOrder(e.target.value)}
            className="w-40 rounded border py-1 text-brand-blue-light bg-brand-blue-dark"
          >
            {options.map((item) => (
              <Classification item={item} />
            ))}
          </select>
        </div>

        <Pagination page={page} setPage={setPage} />
      </div>

      <div className="flex flex-wrap justify-center gap-5 my-8">
        {items.map((item) => (
          <Card item={item} categoria={categoria} key={item.id} />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <div>
          <select
            value={ordem}
            onChange={(e) => handleOrder(e.target.value)}
            className="w-40 rounded border py-1 text-brand-blue-light bg-brand-blue-dark"
          >
            {options.map((item) => (
              <Classification item={item} />
            ))}
          </select>
        </div>

        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
}
