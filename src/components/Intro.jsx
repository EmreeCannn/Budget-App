import { Form} from "react-router-dom"

import illustraiton from "../assets/illustration.jpg"

function Intro() {
  //  const location = useLocation();
  //  console.log(location);
  return (
    <div className="intro">
      <div>
        <h1>
            Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
        Personal budgeting is the secret to financial freedom. Start your journey today.
        </p>
        {/* Eğer action belirtilmezse, form verileri mevcut URL'ye (current URL) gönderilir. */}
        {/* eğer mevcut url i anlamakta zorlanırsan useLocation kullanabilirsin  */}
        <Form method ="post">
            <input 
            type="text" 
            name="userName" 
            placeholder="what is your name ?"
            aria-label="Your Name" 
            autoComplete="given-name"
             required />
             <input type="hidden" name="_action" value={"NewUser"}  />
            <button type="submit" className="btn btn--dark">
                <span>Create Acount</span>
            </button>
        </Form>
      </div>
      <img src= {illustraiton} />
    </div>
  )
}

export default Intro
