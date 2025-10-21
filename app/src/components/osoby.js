function Osoba({imie,wiek}){
  return(
    <div className="">
    <h1>{imie}</h1>
    {wiek?<p>Wiek: {wiek}</p>:""}
    </div>
  )
}

export default Osoba
