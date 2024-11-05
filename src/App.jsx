import { useEffect, useState } from 'react'
import { main } from './utils/readFromTxt.js'
import { getPeruDate } from './utils/getPeruDate.js'
import "./App.css"

function App() {

  const [text, setText] = useState("")
  const [formData, setFormData] = useState({})
  const [nickname, setNickname] = useState("")
  const [login, setLogin] = useState(false)

  let preguntas = []

  useEffect(()=>{
    main(text, setText)
  }, [])
  preguntas = text.split("\r\n")

  const handleLogin = () => {
    setLogin(v => !v)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData)
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const date = getPeruDate()
    const resp = await fetch("https://aye932p213.execute-api.us-east-2.amazonaws.com/qa-parejas-save-data", {
      method: "POST",
      body: JSON.stringify({
        "id": nickname,
        "date": date,
        "questions": JSON.stringify(formData) 
      })
    })
    const response = await resp.json()
    alert(response.message)
  }

  return (
    <div className="principal w-full h-full">
      {
        !login ?
        (
          <div className="h-full flex-col content-center">
            <div>Ingresa tu Nickname: </div>
            <div>
              <input
                onChange={(e)=>setNickname(e.target.value)}
                value={nickname}
              />
            </div>
            
            <button
              onClick={handleLogin}
            >
              Continuar
            </button>
          </div>
        ) : 
        (
          <>
            <div className="header text-lg text-[#BE3C88] mb-5">
              Q&A by Franz
            </div>

            <div className="text-[#19B3B8]">
              Hola {nickname}!
            </div>
            <small className="text-[#77EE22]">
              ¿Te equivocaste de NickName? Dale refresh a la página y vuelve a comenzar.
            </small>

            <form className="preguntas mt-5" onSubmit={handleSubmit}>
              {preguntas.map((e, i)=>{
                return (
                  <div key={i}>
                    <div>
                      {e}
                    </div>
                    <textarea
                      id={i}
                      name={e}
                      className="chatbox"
                      cols={30}
                      rows={2}
                      placeholder="responde"
                      onChange={handleChange}
                    >
                    </textarea>
                  </div>
                )
              })}
              <button type="submit" className="button">Enviar</button>
            </form>

            <div className="footer">
              Franz Rony Ventocilla Tamara - 2024
            </div>
          </>
        )
      }
    </div>
  )
}

export default App
