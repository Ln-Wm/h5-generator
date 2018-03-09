let upload=function(){
  return new Promise((resolve,reject)=>{
    const dom=`<input type="file" class="pic-upload" style="display:none;" id="file">`;
    if(!$('.pic-upload').length){
      $('body').append(dom);
    }
    $('.pic-upload').click();
    $('.pic-upload').on('change',function(){
      let formData = new FormData();
      formData.append("avatar", document.getElementById("file").files[0]);
      $.ajax({
         url: '/fileUpload',
         type: "POST",
         data: formData,
         contentType: false,
         processData: false,
         success: function (json) {
           $('.pic-upload').remove();
           resolve(json);
         },
      });
    });
  });
}
export default upload
