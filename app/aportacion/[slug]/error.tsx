'use client'
export default function Error({ error, reset }:{
  error: Error; reset: () => void
}) {
  console.error(error)
  return (
    <main style={{maxWidth:860, margin:'32px auto', padding:'0 16px'}}>
      <h1 style={{fontSize:28, fontWeight:800}}>Ocurrió un error</h1>
      <button onClick={() => reset()} style={{marginTop:12}}>Reintentar</button>
    </main>
  )
}
