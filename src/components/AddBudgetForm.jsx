import { useEffect, useRef } from "react";
import {  useFetcher} from "react-router-dom";

//? submitting durumu, form gönderme işleminin başlangıcından bitene kadar olan kısmını kapsar. Yani, bir kullanıcı formu göndermeye başladığında (örneğin, bir POST isteği gönderildiğinde), submitting durumu aktive olur ve işlem bitene kadar bu durumda kalır.

function AddBudgetForm() {


  const fetcher = useFetcher();
  const isSubmitting = fetcher.state ==="submitting";
  // form gönderme işlemim başladığında true bittiğinde false olucak 
  // console.log(isSubmitting);
  // Kullanıcı formu gönderir: submitting aktif olur.

  //  Form başarıyla gönderildikten sonra, yeni verilerin alınması gerekebilir (örneğin, başka bir GET isteği): loading aktif olur.
  //  Tüm işlemler tamamlandıktan sonra form yeniden idle durumuna geçer.
  // console.log(fetcher.state);

  // Kullanıcı bir form gönderdiğinde veya veriyi sunucuya göndermek için bir işlem başlattığında,
  //  fetcher submitting durumuna geçer. Bu, veri gönderme işlemine başlandığını belirtir.
 
  // Örneğin, form verisi başarıyla gönderildikten sonra başka bir veri almak gerekiyorsa (örneğin, form gönderildikten sonra sonuçları görmek), bu işlem sırasında loading durumu aktif olur.
  // Veri gönderme işlemi ve veri alma işlemi tamamlandığında fetcher tekrar idle durumuna döner.
   const Formref = useRef();
   const inputRef = useRef();
  //  form ref aynı javascripteki gibi nasıl ben getelementbyclass name dediğimde domdaki verime ulaşıyorum aynı işlevi görür ancak sayfamı render etmez bu yüzden useeffect içinde kullanmalıyım
 
  useEffect(()=>{
    if(!isSubmitting){
      Formref.current.reset();
      // burada diyorum ki  form gönderme işlemi bittiğinde isSubmitting false olucak 
      // form gönderme işlemi bittiğinde sen git formun içinde yer alan input fieldleri temizle 
      // current ile direkt domdaki elementime ulaşıyorum 
      inputRef.current.focus();
    }
    
    
  },[isSubmitting])

  return (
    <div className="form-wrapper">
      <h3 className="h3">Create Budget</h3>
      <fetcher.Form method="POST" className="grid-sm" ref={Formref}>
        <div className="gird-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input ref={inputRef} style={{height:"50px",padding:"10px"}}
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g.. ,Groceries "
            required
          />
        </div>
        <div className="grid-xs" style={{marginTop:"21px"}} >
          <label htmlFor="newBudgetAmount">Budget Amount</label>
          <input style={{height:"50px",padding:"10px"}}
            type="number"
            min={1}
            step={0.1}
            inputMode="decimal"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="3000 $ "
            required
          />
          <input type="hidden" name="_action" value={"NewBudget"} />
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting} >
          {
            isSubmitting ? <span>Submitting...</span> : <span>Create Budget</span>
          }
        </button>
        {/* bununla beraber aynı url e gidiecek birden fazla action ım oldu peki bunları nasıl yöneticem 
         */}
      </fetcher.Form>
    </div>
  );
}

export default AddBudgetForm;
