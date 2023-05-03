$(function(){


//네비게이션
  const gnb = $('.gnb_li > li > a');
  const lnb = $('.gnb_li_li > ul');
  $(function(){
  gnb.mouseover(function(){
    $('.gnb_li_li').hide();
    $(this).next("div").fadeIn(500);
  });
  lnb.mouseleave(function(){
    $('.gnb_li_li').hide();
    });
  });


//메인슬라이드
  let videoDuration = [11000, 21000, 13000];
  let vd = $('.video_box > video');
  let n = $('.video_box').index();
  let interval;
  // console.log(vd);
  function startSlide() {
    interval = setInterval(function() {
        $(".slide li").fadeOut();
        vd.get(n).pause();
        if (n == 2) {
          n = 0;
        } else {
          n++;
        }
        $(".slide li").eq(n).fadeIn();
        vd.get(n).play();
        $(".c_btn li").removeClass("on1");
        $(".c_btn li").eq(n).addClass("on1");
      }, videoDuration[n]);
    }
    
  startSlide();
  
  // 좌우 버튼 클릭 시 슬라이드 변경
  $(".btn_box li").click(function() {
    // $(".slid li video").pause();
    clearInterval(interval);
    let btnIndex = $(this).index();
    if (btnIndex == 0) {
      if (n == 0) {
        n = 2;
      } else {
        n--;
      }
    } else {
      if (n == 2) {
        n = 0;
      } else {
        n++;
      }
    }
      // vd.eq(n).pause();
      // vd.eq(n).play();
      $(".slide li").fadeOut();
      // $(".slide li video").pause();
      $(".slide li").eq(n).fadeIn();
      // $(".slide li video").eq(n).play();
      $(".c_btn li").removeClass("on1");
      $(".c_btn li").eq(n).addClass("on1");
      startSlide();
    });

  //컨트롤버튼
  const c_btn = $('.c_btn li');
  c_btn.click(function(){
    clearInterval(interval);
    n = $(this).index(); //클릭한 콘트롤 목록의 인덱스값을 다시 구하고
    $(".slide li").fadeOut(); //보이는 이미지 모두 숨기고
    c_btn.removeClass('on1'); //콘트롤버튼 서식을 모두제거
    $(".slide li").eq(n).fadeIn(); //인덱스번호에 맞는 슬라이드가 보이게한다.
    c_btn.eq(n).addClass('on1'); //해당하는 콘트롤버튼에 서식적용
  });



  ///////////움직이는 텍스트////////////////

  let prd_txt = $(".prd_txt");
  let prd_txt_ul = prd_txt.find("ul");
  let prd_txt_li = prd_txt_ul.find("li");
  let prd_txt_width = prd_txt.width();
  let prd_txt_li_width = prd_txt_width / 6;

  prd_txt_li.css("width", prd_txt_li_width + "px");

  $(window).resize(function() {
    prd_txt_width = prd_txt.width();
    prd_txt_li_width = prd_txt_width / 6;
    prd_txt_li.css("width", prd_txt_li_width + "px");
  });




  //ajax메서드로 json데이터 불러오기
  $('.m_box a').click(function(){
    $(this).hide();//더보기 버튼을 숨기고

    $.ajax({
      url:'./script/product.json',
      type:'post',
      dataType:'json',
      success:function(result){
        let t = '<div class="now_box1">';
        $.each(result.product,function(i,e){
          t+="<div class='now_item'><img src='./image/"+e.path+"'alt='"+e.tit+"'>"+"<img src='./image/"+e.subpath+"'alt='"+e.subtit+"'>"+"<p>"+e.tpath+"</p></div>";
          // t+="<img src='./image/"+e.subpath+"'alt='"+e.subtit+"'>";
          // t+="<p>"+e.tpath+"</p>";
        });
        t+="</div>";
        //데이터를 t변수에 담아서 list박스에 내용을 출력한다.
        $('#now_atc2').html(t);
      }
    });
    return false;
  });



});



  //윈도우 스크롤 이벤트를 활용하여 top버튼 나오게하기
  $(window).scroll(function(){
    let spos = $(this).scrollTop();
    console.log(spos);
    let dh = $(document).height();
    console.log(dh);

    if(dh/2<=spos){
      $('.top_btn').fadeIn();
    }else{
      $('.top_btn').fadeOut();
    }
    $('.top_btn').click(function(){
      $('html,body').animate({scrollTop:'0px'},500);
      return false;
    });
  });


    //이벤트 슬라이드
  //1. 변수선언
  const sw = document.querySelector('.s_wrap');
  const lb = document.querySelector('#lounge_sec i.fa-angle-left');
  const rb = document.querySelector('#lounge_sec i.fa-angle-right');
  let count = 0;
  let sn = document.querySelectorAll('.s_wrap > figure');
  const s_total = sn.length;
  const fig = 1300;
  sw.style.width = fig*s_total;
  //2. 클릭시 위치이동
  lb.addEventListener('click',()=>{
    clearInterval(Timer);
    if(count>0){
      mslide(count-1);
    }else{
      mslide(s_total-1);
    }
  });
  lb.addEventListener('mouseleave',()=>{
    Timer=setInterval(function(){
      if(count<s_total-1){
        mslide(count+1);
      }else{
        mslide(0);
      }
    },4000);
  });
  rb.addEventListener('click',()=>{
    clearInterval(Timer);
    if(count<s_total-1){
      mslide(count+1);
    }else{
      mslide(0);
    }
  });
  rb.addEventListener('mouseleave',()=>{
    Timer = setInterval(function(){
      if(count<s_total-1){
        mslide(count+1);
      }else{
        mslide(0);
      }
    },4000);
  });


  //3. 매 시간마다 반복 호출하여 자동으로 움직이게
  function mslide(n){
    sw.style.left = fig*-n+'px';
    count=n;
    sw.style.transition = 'left 0.5s ease';
  }
  mslide(0);
  let Timer = setInterval(function(){
    if(count<s_total-1){
      mslide(count+1);
    }else{
      mslide(0);
    }
  },4000)


  $(window).on('scroll', function(){
    let scrollTop = $(this).scrollTop();
    
    if(scrollTop >= 2300 && scrollTop < 2800) {
    $('.image1').fadeIn(2400);
    $('.image2').delay(300).fadeIn(2400);
    $('.image3').delay(600).fadeIn(2400);
    $('.image4').delay(900).fadeIn(2400);
    $('.image5').delay(1200).fadeIn(2400);
    $('.image6').delay(1500).fadeIn(2400);
    }
  });

  //탭메뉴
  let b=1;//초기값
  const img_list=document.querySelectorAll('.news_tab_li > li');
  console.log(img_list);
  
  img_list.forEach((el,index)=>{
    el.onclick=()=>{
      console.log(index);
      b=index+1;//인덱스 번호에 1을 더하여 1부터 숫자가 나오게
  
      document.getElementById('news_big_img').src='./image/News_Event_img'+b+'.jpg';
    }
  });


