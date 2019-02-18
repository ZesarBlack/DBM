//ISPIRATION: https://www.uplabs.com/posts/xore-solar-system
//Full page simoberny.it
//Best on mobile

/* Inizializzazione HammerJS */
var element = document.getElementById('mobile_control');
var hammertime = new Hammer(element);

var swiped_top = false;

hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('swipeleft', function(ev) {
  cmove("prev");
});
hammertime.on('swiperight', function(ev) {
  cmove("next");
});
hammertime.on('swipeup', function(ev) {
  swiped_top = true;
  openmodal();
});
hammertime.on('swipedown', function(ev) {
  closemodal();
});
/* * * * * * * * * */

$(".action").on("click", function(){
  cmove($(this).attr('id'));
});

$('.title').each(function(){
  $(this).html("camara".replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});


anime.timeline({})
.add({
  targets: '.title',
  opacity: [0,1],
  easing: "easeOutExpo",
  duration: 100
})
.add({
  targets: '.title .letter',
  translateX: [40,0],
  translateZ: 0,
  opacity: [0,1],
  easing: "easeOutExpo",
  duration: 1200,
  delay: function(el, i) {
    return 500 + 30 * i;
  }
});

var angle = 0;
var config_id = 0;

function cmove(dir){
  var n_config = 8, next_id;
  var prev, next;
  var top = $("#pl"+ config_id);
  var orbit = $(".config_container");

  top.removeClass("pt");

  if(config_id == 0){
    prev = $("#pl"+ (n_config-1));
    next = $("#pl"+ (config_id+1)%n_config);
  }else{
    prev = $("#pl"+ (config_id-1));
    next = $("#pl"+ (config_id+1)%n_config);
  }

  if(dir == "prev"){
    next_id = (config_id + 1) % n_config;
    angle -= 45;
    next.addClass("pt");
    config_id++;
  }else{
    if(config_id == 0){
      next_id = 7;
      config_id = 7;
    }else{
      next_id = config_id-1;
      --config_id;
    }
    angle += 45;
    prev.addClass("pt");
  }

  $(".active").removeClass("active");
  $("#p" + config_id).addClass("active");
  $(".info_back h1").text(config[next_id]);

  if(swiped_top){
    $('.info_back h1').each(function(){
      $(this).html(config[config_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    anime.timeline({})
    .add({
      targets: '.info_back h1',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 100
    })
    .add({
      targets: '.info_back h1 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: function(el, i) {
        return 500 + 30 * i;
      }
    });
  }

  $('.title').each(function(){
    $(this).html(config[next_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });

  anime.timeline({})
  .add({
    targets: '.title .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
  });

  $('.pn').each(function(){
    $(this).html(config[next_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });

  anime.timeline({})
  .add({
    targets: '.pn .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
  });

  var ani_dir = (dir == "next") ? "0%" : "100%";

  anime.timeline({})
  .add({
    targets: '.config_photo',
    backgroundPosition: ['50% -75%', ani_dir + ' -85%'],
    opacity: {
      value: [1,0]
    },
    duration: 700,
    easing: 'easeOutQuad',
    complete: function(anim){
      $(".config_photo").css("background-image", "url(" + photo_config[next_id] +")");
    }
  })
  .add({
    targets: '.config_photo',
    backgroundPosition: ['0% -85%', '50% -75%'],
    opacity: [0.2,1],
    duration: 500,
    easing: 'easeOutQuad'
  });

  $(".info_back").css("background-image", "url(" + photo_config[next_id] +")");
  orbit.css("transform", "rotateZ(" + angle + "deg)");
}

$("#open_menu").on("click", function(){
  $(".menu").show();
});

$(".close").on("click", function(){
  $(".menu").hide();
});

$(".more").on("click", function(){
  swiped_top = true;
  openmodal();
});

function openmodal(){
  anime.timeline({})
  .add({
    targets: '.carousel',
    translateY: ["100%", 0],
    duration: 600,
    easing: 'easeOutQuad',
  });

    $('.info_back h1').each(function(){
      $(this).html(config[config_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    anime.timeline({})
    .add({
      targets: '.info_back h1',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 100
    })
    .add({
      targets: '.info_back h1 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: function(el, i) {
        return 500 + 30 * i;
      }
    });
}

function closemodal(){
  if(swiped_top){
    anime.timeline({})
    .add({
      targets: '.carousel',
      translateY: [0, "100%"],
      duration: 600,
      easing: 'easeOutQuad',
    });
    swiped_top = false;
  }
}

//var photo_config = ["https://i.kinja-img.com/gawker-media/image/upload/s--gBFsZfZv--/c_scale,fl_progressive,q_80,w_800/18mozgxwgu2ibjpg.jpg", "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_resolucion_true_color.jpg", "http://cdn.sci-news.com/images/enlarge3/image_4461e-memoria.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Jewel_of_the_Solar_System.jpg/1280px-Jewel_of_the_Solar_System.jpg", "https://upload.wikimedia.org/wikipedia/commons/3/3d/procesador2.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/wifi_Full.jpg/275px-wifi_Full.jpg", "http://annesastronomynews.com/wp-content/uploads/2012/02/ram-has-a-large-iron-core-which-generates-a-magnetic-field-and-is-heavily-cratered-with-regions-of-smooth-plains.-It-has-no-natural-satellites-and-no-substantial-atmosphere.jpg", "https://www.universetoday.com/wp-content/uploads/2008/10/so-e1489179310371.jpg"];
//var config = ["camara", "resolucion", "memoria", "precio", "procesador", "wifi", "ram", "so"];

var photo_config = ["img/camara.png","img/resolucion.png","img/memoria.png","img/precio.png","img/procesador.png","img/wifi.png","img/ram.png","img/android.png",];
var config = ["Camara", "Resolucion", "Memoria", "Precio", "Procesador", "WIFI", "RAM", "SO"];
