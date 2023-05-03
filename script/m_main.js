$(function(){


/////////////////네비게이션////////////////////////////
let t_btn = $('.toggle');
let gnbli = $('.gnb_li > li > a');
t_btn.click(function(){
  $(this).find('span').first().toggleClass('act01');
  $(this).find('span').eq(1).toggleClass('act02');
  $(this).find('span').last().toggleClass('act03');

  $('.header_nav').slideToggle();
})
gnbli.click(function(){
  $(this).next().slideToggle(400).parent().siblings().find('.gnb_li_li').slideUp();
  // if($('.gnb_li_li').slideDown()){
  //   $(this).parent().siblings().find('.gnb_li_li').slideUp();
  // }
  $(this).find('i.fa-solid').toggleClass('a_on').parent().parent().siblings().find('i.fa-solid').removeClass('a_on');
  return false;
})


/////////////////메인슬라이드///////////////////////////
  let videoDuration = [11000, 21000, 13000];
  let vd = $('.video_box > video');
  let n = $('.video_box').index();
  let interval;
  // console.log(vd);
  function startSlide() {
    interval = setInterval(function() {
        $(".slide li").eq(n).fadeOut();
        // vd.get(n).pause();
        if (n == 2) {
          n = 0;
        } else {
          n++;
        }
        $(".slide li").eq(n).fadeIn();
        // vd.get(n).play();
        $(".c_btn li").removeClass("on1");
        $(".c_btn li").eq(n).addClass("on1");
      }, videoDuration[n]);
    }
    
  startSlide();

  
  ///////////////////// 좌우 버튼 클릭 시 슬라이드 변경///////////////////
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



  //////////////메인 슬라이드 컨트롤버튼///////////////////////
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
    let prd_txt_li_width = prd_txt_width / 3;
  
    prd_txt_li.css("width", prd_txt_li_width + "px");
  
    $(window).resize(function() {
      prd_txt_width = prd_txt.width();
      prd_txt_li_width = prd_txt_width / 3;
      prd_txt_li.css("width", prd_txt_li_width + "px");
    });



  ////////////////ajax메서드로 json데이터 불러오기//////////////////
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


///////////뉴스이벤트 탭메뉴//////////////////////
    $('.n_e_tab span').click(function() {
      // 클릭된 탭의 인덱스값 가져오기
      var idx = $(this).index();
  
      // 모든 탭 내용 숨기기
      $('.n_e_li > ul').removeClass('active');
  
      // 클릭된 탭 내용만 보이도록 설정
      $('.n_e_li > ul').eq(idx).addClass('active');
  
      // 탭메뉴 active 클래스 설정
      $('.n_e_tab span').removeClass('active');
      $(this).addClass('active');
    });
  
    // 처음에 첫번째 탭 내용 보이도록 설정
    $('.n_e_li > ul').first().addClass('active');


});



  ////////////////윈도우 스크롤 이벤트를 활용하여 top버튼 나오게하기////////////////
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


    ////////////제품 이미지 페이지///////////////////////
  // 이미지 인덱스와 이미지 배열 생성
// 이미지 인덱스와 이미지 배열 생성
let currentImgIndex = 0;
const images = [
  "./image/product01.png",
  "./image/product02.png",
  "./image/product03.png",
  "./image/product04.png",
  "./image/product05.png",
  "./image/product06.png",
  "./image/product07.png",
  "./image/product08.png",
  "./image/product09.png"
];

// 첫 번째 이미지를 제외한 이미지 숨기기
$('.prd_img img:not(.image1)').hide();

// 3초마다 이미지 변경
setInterval(() => {
  // 현재 이미지 숨기기
  $('.prd_img img:visible').fadeOut();
  
  // 다음 이미지 보여주기
  currentImgIndex = (currentImgIndex + 1) % images.length;
  $(`.image${currentImgIndex+1}`).fadeIn();
}, 2000);



  



  ////////////라운지 섹션 이벤트 슬라이드//////////////////
  //1. 변수선언
  const sw = document.querySelector('.s_wrap');
  const lb = document.querySelector('#lounge_sec i.fa-angle-left');
  const rb = document.querySelector('#lounge_sec i.fa-angle-right');
  let count = 0;
  let sn = document.querySelectorAll('.s_wrap > figure');
  const s_total = sn.length;
  const fig = 100;
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
    sw.style.left = fig*-n+'%';
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




