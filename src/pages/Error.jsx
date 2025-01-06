import {Link, useNavigate, useRouteError } from "react-router-dom"


function Error() {
  const err = useRouteError();
  // eğer kullandığım rotada herhangi bir hata ile karşılaşırsam error elemnt içinde belirttiğim compenente
  // useRouterError kullanra ulaşabilirim 

  const navigate = useNavigate();
  return (
    <div className="error" >
      <h2> Olamaz Adamım Bir Sorunla Karşılaştık Ama Sakın Merak Etme Emre Her Şeyi Kontrol Altına Alıcak  </h2>
      <p>{err.message}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={()=>navigate(-1)} >Go Back</button>
                                                {/*navigate -1 diyerek bir önceki sayfama git diyorum  */}
        <Link to={"/"}>
        <span>Go home</span>
        </Link>
      </div>
    </div>
  )
}

export default Error
