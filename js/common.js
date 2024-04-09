//이미지 슬라이더
function initComparisons() {
  var x, i;
  /* Find all elements with an "overlay" class: */
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /* Once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function: */
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /* Get the width and height of the img element */
    w = img.offsetWidth;
    h = img.offsetHeight;
    /* Set the width of the img element to 50%: */
    img.style.width = (w / 2) + "px";
    /* Create slider: */
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /* Insert slider */
    img.parentElement.insertBefore(slider, img);
    /* Position the slider in the middle: */
    // slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    $(".comp_txt").css("left",(w / 2) - (slider.offsetWidth / 2) + "px");
    /* Execute a function when the mouse button is pressed: */
    slider.addEventListener("mousedown", slideReady);
    
    /* And another function when the mouse button is released: */
    window.addEventListener("mouseup", slideFinish);
    /* Or touched (for touch screens: */
    slider.addEventListener("touchstart", slideReady);
      /* And released (for touch screens: */
    window.addEventListener("touchend", slideFinish);
    function slideReady(e) {
      /* Prevent any other actions that may occur when moving over the image: */
      e.preventDefault();
      /* The slider is now clicked and ready to move: */
      clicked = 1;
      /* Execute a function when the slider is moved: */
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
      $(".comp_txt").css("display","none")
      $(".comp_txt2").css("display","none")
    }
    function slideFinish() {
      /* The slider is no longer clicked: */
      clicked = 0;
      $(".comp_txt").css("display","block");
      $(".comp_txt2").css("display","block")
    }
    function slideMove(e) {
      var pos;
      /* If the slider is no longer clicked, exit this function: */
      if (clicked == 0) return false;
      /* Get the cursor's x position: */
      pos = getCursorPos(e)
      /* Prevent the slider from being positioned outside the image: */
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /* Execute a function that will resize the overlay image according to the cursor: */
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = (e.changedTouches) ? e.changedTouches[0] : e;
      /* Get the x positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x coordinate, relative to the image: */
      x = e.pageX - a.left;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /* Resize the image: */
      img.style.width = x + "px";
      /* Position the slider: */
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
      // $(".comp_txt").css({"left" : x-497+"px"});
      // $(".comp_txt2").css({"left" : x-489+"px"});
    }
  }
}

$(document).ready(function () {

  const arr = [
    "L",
    "i",
    "호",
    "생",
    "m",
    "t",
    "고",
    "4",
    "M",
    "래",
    "나",
    "사",
    "R",
    "&",
    "란",
    "y",
    "십",
    "%",
    "P",
    "안",
    "6",
    "일",
    "1",
    "기",
    "@",
    "억",
    "!",
    "3",
    "들",
    "e",
    "본",
    "~",
    "/",
    "l",
    "육",
    "w",
    "아",
    "이",
    "S",
    "세",
    "$",
    "0",
    "전",
    "r",
    "a",
    "노",
    "리",
    "#",
    "S",
    "비",
    "봄",
    "s",
    "약",
    "월",
    "o",
    "?",
    "속",
    "b",
    "명",
    "f"
  ]

  //grid 그리기
  for (i =0; i<arr.length; i++){
    $(".life_preview").append("<span class='item'>"+arr[i]+"</span>");
  }

  const arr2 = ["바다에도 봄이 온다","슬픔의 기억력으로","단단해지는 마음","모두의 일곱 해"];
  const ran_num = Math.floor(Math.random() * 4);
  $(".preview_typing").text(arr2[ran_num]);

  $(".navmenu").on("click", function () {
    $(".navmenu").removeClass("active_txt");
    $(this).addClass("active_txt");
  });

  $(".preview_btn").on("click", function () {
    $(".preview_btn").removeClass("active");
    $(this).addClass("active");
    $(".item").css("font-family",$(this).attr("font-weight"));
  });

  $(".weight-box").on("click", function () {
    $(".weight-box").removeClass("active");
    $(this).addClass("active");
    $(".preview_typing").css("font-family",$(this).attr("font-weight"));
    $(".preview_typing div").css("font-family",$(this).attr("font-weight"));
  });

  $(".background-box").on("click", function () {
    $(".background-box").removeClass("active2");
    $(".img_txt").removeClass("active_txt");
    $(this).addClass("active2");
    $("p[img-src='"+$(this).attr("img-src")+"']").addClass("active_txt");
    if($(this).attr("img-src") != "imgUpload"){
      $(".preview_typing").css("background-image",  "url(./image/background_img.png), url("+$(this).attr("img-src")+".png)" );
    }
    //직접 업로드
    else{
      $('#file').click();
    }
  });

  $("#file").on("change", function() {
    $(".preview_typing").css("background-image",'none');
    var file = event.target.files[0];
    var reader = new FileReader(); 
    reader.onload = function(e) {
      $(".preview_typing").css({"background-image":"url(./image/background_img.png), url("+ e.target.result+")"}); 			
      $(".preview_typing").setAttribute('crossorigin', 'anonymous');	
    }
    reader.readAsDataURL(file);
  });

  $(".customRange1").on("input change",function () {
    $('.preview_typing').css("font-size", $(this).val() + "px");
  });

  $(".customRange1").on("input change",function () {
    $('.preview_typing').css("font-size", $(this).val() + "px");
  });

  //초기화
  $(".reset").on("click", function () {
    $(".preview_typing").text("바다에도 봄이 온다");
    $('.preview_typing').css("background-color", "#FFFCE3");
    $('.preview_typing').css("background-image", "");
    $('.preview_typing').css("font-family", "April16th-Life");
    $('.preview_typing').css("font-size", "4rem");
    $('.weight-box').removeClass("active");
    $('.life_btn').addClass("active");
    $(".customRange1").val("50");
  });

  $("#save").on("click", function () {
    downImg(1);
  });

  $("#save2").on("click", function () {
    downImg(2);
  });

  function downImg(num){
    $(".preview_typing").css("border","none");
    html2canvas ($("#preview_typing"+num) [0]).then(function (canvas) {
      var myImage = canvas.toDataURL();
      downloadURI(myImage, "416_image.png");
    });
    $(".preview_typing").css("border","0.2rem solid #DDDDDD");
  }

  function downloadURI(uri, name){

    // if (navigator.userAgent.indexOf('KAKAO') >= 0){
        const win = window.open(uri, '_blank');
    // }else{
    //     var link = document.createElement ("a");
    //     link.download = name;
    //     link.href = uri;
    //     document.body.appendChild(link);
    //     link.click();
    // }
    
  }

});

const remCalc = (px, base = 10) => {
  let tempPx = px
  if (typeof px === 'string' || px instanceof String)
    tempPx = tempPx.replace('px', '')

  tempPx = parseInt(tempPx)
  return (1 / base) * tempPx + 'rem'
}

var setElm = $('.slide-area'),
slideSpeed = 7000;

setElm.each(function(){
	
	var self = $(this),
		selfWidth = self.innerWidth(),
		findUl = self.find('ul'),
		findLi = self.find('li'),
		listWidth = findLi.outerWidth(),
		listCount = findLi.length,
		loopWidth = listWidth * listCount + (20*listCount);
	findUl.wrapAll('<div class="loop-slider-wrap"/>');
	var selfWrap = self.find('.loop-slider-wrap');

	if(loopWidth > selfWidth){
		findUl.css({width:loopWidth}).clone().appendTo(selfWrap);
		
		selfWrap.css({width:loopWidth*2});
		
		function loopMove(){
			selfWrap.animate({left:'-' + (loopWidth) + 'px'}, slideSpeed * listCount, 'linear', function(){
				selfWrap.css({left:'0'});
				loopMove();
			});
		};
	loopMove();	
	}
});


//특정영역에 js실행
var isVisible = false;

$(window).on('scroll',function() {
    if (checkVisible($('#home'))&&!isVisible) {
        $(".navmenu").removeClass("active_txt");
        $(".home").addClass("active_txt");
    }else if(checkVisible($('#introduce'))&&!isVisible){
      $(".navmenu").removeClass("active_txt");
      $(".introduce").addClass("active_txt");
      // isVisible=true;
    }else if(checkVisible($('#campaign'))&&!isVisible){
      $(".navmenu").removeClass("active_txt");
      $(".campaign").addClass("active_txt");
      // isVisible=true;
    }else if(checkVisible($('#download'))&&!isVisible){
      $(".navmenu").removeClass("active_txt");
      $(".download").addClass("active_txt");
      // isVisible=true;
    }else{
      $(".navmenu").removeClass("active_txt");
      $(".home").addClass("active_txt");
    }
});

function checkVisible( elm, eval ) {
    eval = eval || "object visible";
    var viewportHeight = $(window).height(), // Viewport Height
        scrolltop = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();   
    
    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}

function myFunction(e,num) {
  var x = e.pageX;
  var y = e.pageY;
  document.getElementById("tooltip"+num).style.left = x+10 + "px";
  document.getElementById("tooltip"+num).style.top = y + "px";
}

function myFunction2(e,num) {
  var x = e.offsetX;
  var y = e.offsetY;
  // alert("tooltip"+num+"/"+y);
  document.getElementById("tooltip2").style.left = x+10 + "px";
  document.getElementById("tooltip2").style.top = y + "px";
}

$(".img-comp-slider").on("click", function () {
  $(".comp_txt").css("display","none");
});

window.onscroll = function () {
  // console.log(document.body.scrollHeight, window.scrollY, window.innerHeight);
  
  const totalPageHeight = document.body.scrollHeight;
  const scrollPoint = window.scrollY + window.innerHeight;

  // console.log(scrollPoint,totalPageHeight);

  if( window.scrollY > 0 ){
    $(".header2").css("border-bottom","solid 0.1rem #ededed")
  }else{
    $(".header2").css("border-bottom","")
  }

  // check if we hit the bottom of the page
  if (scrollPoint >= totalPageHeight) {
      $(".section1").css("visibility","hidden");
      $(".section1_m").css("visibility","hidden");
  }else{
    $(".section1").css("visibility","visible");
    $(".section1_m").css("visibility","visible");
  }
}