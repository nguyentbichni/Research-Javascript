//Javascript
const acc_btn = document.querySelectorAll(".label");
const acc_content = document.querySelectorAll(".content");

acc_btn.forEach(btn => {
  btn.addEventListener("click",(e) =>{
    acc_content.forEach((acc) => {
    if(e.target.nextElementSibling !== acc && acc.classList.contains("active")){
        acc.classList.remove("active");
        acc_btn.forEach((btn) => {
          btn.classList.remove("active");
        })
      }
    })
    const panel = btn.nextElementSibling;
    panel.classList.toggle("active");
    btn.classList.toggle("active");
    console.log("🚀 ~ file: script.js ~ line 31 ~ btn.addEventListener ~ btn", btn)
  })
})

window.onclick = (e) => {
  if(!e.target.matches(".label")){
    acc_btn.forEach((btn) => btn.classList.remove("active"))
    acc_content.forEach((btn) => btn.classList.remove("active"))
  }
}
// JQuery
// $(document).ready(function(){
//   $(".label").click(function(){
//     if($(this).next(".content").hasClass("active")){
//       $(this).next(".content").removeClass("active").slideUp()
//       $(this).removeClass("active");
//     }else{      
//       $(".contentBx .content").removeClass("active").slideUp()
//       $(this).next("content").addClass("active").slideDown()   
//     }
//   })
// });