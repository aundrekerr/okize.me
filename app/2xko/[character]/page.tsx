export default async function CharacterPage({ params }: { params: { character: string } }) {
  if (!params.character) return;

  return (
    <>
      <main className="page">
        <div className="container mx-auto mt-16">
          <h1>{params.character}</h1>
          <p>Nothing here yet.</p>
        </div>
      </main>
    </>
  )
}