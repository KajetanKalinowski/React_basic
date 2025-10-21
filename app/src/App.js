import './App.css';
import { useState,useEffect} from 'react';
function App() {
  // const [licznik,setLicznik] = useState(0)
  // const [pokarz,setPokarz] = useState(false)
  // const [lista,setLista] = useState([])
  // const [text,setText] = useState('')
  // const [timer,setTimer] = useState(0)
  // const [stop,setStop] = useState(true)
  // const Dodaj = ()=>{
  //   setLista((prev)=>[...prev,text])
  //   console.log(lista)
  // }
  // useEffect(()=>{
    
  //   if(stop==false){
  //   setTimeout(()=>{setTimer(timer+1)},1000)
  //   }
  // })

  // const Dodaj2 = ()=>{
  //   setLista((prev)=>[...prev,timer])
  //   console.log(lista)
  // }
  const [kraje,setKraje] = useState([])
  const [region,setRegion] = useState('')
  const [ladowanie,setLadowanie] = useState(true)
  const [error,setError] = useState(false)
  const [input,setInput] = useState('')
  const [input2,setInput2] = useState('')

  useEffect(()=>{
    
    const getdata = async ()=>{
      try{
      const data = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,population`)
      const json = await data.json()
      setKraje(json)
      setLadowanie(false)
      console.log(json)
      }catch(err){
        console.log(err)
        setError(true)
      }
    }
    getdata()
  },[])
 
    
    const getdata2 = async ()=>{
      try{
      const data = await fetch(`https://restcountries.com/v3.1/region/${input}`)
      const json = await data.json()
      setKraje(json)
      setRegion(json.region)
      console.log(json)
      }catch(err){
        console.log(err)
        setError(true)
      }
    }
    const getdata3 = async ()=>{
      try{
      const data = await fetch(`https://restcountries.com/v3.1/name/${input2}`)
      const json = await data.json()
      setKraje(json)
      console.log(json)
      }catch(err){
        console.log(err)
        setError(true)
      }
    }
    const sortAZ = () => {
  const sorted = [...kraje].sort((a, b) => a.name.common.localeCompare(b.name.common));
  setKraje(sorted);
};

const sortZA = () => {
  const sorted = [...kraje].sort((a, b) => b.name.common.localeCompare(a.name.common));
  setKraje(sorted);
};


  return (
    <>
    {error && "Wystąpił błąd podczas ładowania danych"}
    {ladowanie?"Ładowanie danych...":(
    <div className="App flex items-center justify-center flex-col">
        {/* <button className='bg-slate-400' onClick={()=>{setLicznik(licznik+1)}}>+1</button>
        {licznik}
        <button className='bg-slate-400' onClick={()=>{setLicznik(licznik-1)}}>-1</button>
            <div>
              <p style={{visibility:pokarz?"hidden":"visible"}}>Nate Higgers</p>
              <button onClick={()=>{setPokarz((prev=>!prev))}}>{pokarz?"pokarz":"ukryj"}</button>
              
            </div>
            <div>
              <input type='text' id='inp' className='border-2' onChange={(e)=>{setText(e.target.value)}}/><button className='bg-slate-400 border-2 border-black' onClick={Dodaj}>Dodaj</button>
              <ol className='flex flex-col justify-center items-center'>
                {lista.map((item,idx)=>(
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>
            <div className='flex gap-5 flex-col'>
              <h1 className='bg-slate-500'>{timer}</h1>
              <button onClick={()=>{setStop(false)}}>Start</button><button onClick={()=>{setStop(true)}}>Stop</button><button onClick={()=>{setTimer(0)}}>Reset</button>
              <button onClick={Dodaj2}>Zapisz</button>
            </div> */}
            <p>Region</p><input className='bg-slate-400' type='text' onChange={(e)=>setInput(e.target.value)}/><button className='bg-slate-400' onClick={()=>getdata2()}>Szukaj</button>
            <p>Nazwa</p><input className='bg-zinc-500' type='text' onChange={(e)=>setInput2(e.target.value)}/><button className='bg-zinc-500' onClick={()=>getdata3()}>Szukaj</button>
            
            <>
            <button className='bg-orange-200' onClick={sortAZ}>Sortuj A-Z</button>
            <button className='bg-orange-200' onClick={sortZA}>Sortuj Z-A</button>
            <select name='region' onChange={(e)=>setInput(e.target.value)}>
              <option value={'europe'}>Europe</option>
              <option value={'asia'}>Asia</option>
              <option value={'africa'}>Africa</option>
            </select>
            <button className='bg-slate-300' onClick={()=>getdata2()}>Szukaj</button>
            </>
            <ul>
              {kraje.map((item,idx)=>(
                <li key={idx}><p>{item.name.common} - {item.population.toLocaleString()}</p> <img alt={item.flags.alt} src={item.flags.png}/> </li>
              ))}
            </ul>
    </div>)}
    </>
  );
}

export default App;
