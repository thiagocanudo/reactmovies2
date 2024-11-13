export function Pagination({page, setPage}){
    return (
        <div>
            <button onClick={() => setPage(page - 1)} disabled={page==1} className="disabled:opacity-50 disabled:pointer-events-none border rounded py-1 px-2 hover:bg-brand-blue-light text-brand-blue-light"> ← </button>
            <span className="inline-block mx-3 text-brand-blue-light">Página  {page}</span>
            <button onClick={() => setPage(page + 1)} className="border rounded py-1 px-2 hover:bg-brand-blue-light text-brand-blue-light"> → </button>
        </div>
    )
}