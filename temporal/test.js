function moveBanner(e){
    var wrapper = this.querySelector(".active > .tommy");
    var i;
    
        console.log(wrapper)
        var offsetLeft = wrapper.offsetLeft,
              offsetTop = wrapper.offsetTop;

        var posX = e.pageX - offsetLeft, 
              posY = e.pageY - offsetTop;

        var width = wrapper.clientWidth,
              height = wrapper.clientHeight;
        
        var vX = -40,
              vY = -10,
              mX = vX / width,
              mY = vY / height,
              ecX = mX * (posX - width ) + (vX/2), 
              ecY = mY * (posY - height) + (vY/2);
        
        wrapper.style.transform = "translateX("+ecX+"px) translateY("+ecY+"px)"; 


    

}

var full = document.getElementById("banner-slider-demo-14");

var owl = document.getElementsByClassName("owl-item");

full.addEventListener("mousemove", moveBanner);

// owl.forEach(function(item, index){
//     console.log('ejec')
//     item.
// })
