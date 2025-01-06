/* eslint-disable react/prop-types */


// react router
import { Form, NavLink } from "react-router-dom"

// Logomark
import LogoMark from "../assets/logomark.svg"

function Nav({userName}) {
   

    const deleteUser = (e) =>{
        // confirm, JavaScript'te kullanılan yerleşik bir fonksiyondur 
        // ve kullanıcıdan bir işlemle ilgili onay almak için kullanılır.
        //  confirm, bir modal diyalog kutusu açar ve kullanıcının bir "Tamam" veya "İptal" seçeneği sunmasına olanak tanır.
        // duruma göre bana true false döner
        const result= confirm(`delete ${userName} user and all data`);
        if(!result){
           console.log("veriler silinmedi");
           e.preventDefault();
           //?prevent default sayfamın yenilenmesini ve verilerimin action a göndermesini engeller 
          //!preventDefaultun anlamı kullanıcı hayıra tıkladı verilerin silinmesini istemiyor bu yüzden formu gönderme diyyorum
        }
    }


  return (
    <nav>
      <NavLink to={"/"} aria-label="Go To Home Page" >
        <img src={LogoMark} alt="logoMark" height={30} />
        <span>Home Budget</span>
      </NavLink>
      {
        userName && (
            // React Router, form verilerini action fonksiyonunun parametresine bir request nesnesi olarak iletir.
            // request.formData() yöntemi, form verilerini alıp işlemenizi sağlar.
            // action içinde hangi routa formdan gelen verilerimi göndermek istediğimi belirtiyorum 
            <Form method="post"  action="/logout"  onSubmit={deleteUser} >
                
                <button type="submit" className="btn btn--warning">
                    <span>Delete User</span>
                </button>
            </Form>
        )
      }
    </nav>
  )
}

export default Nav
