 W = 0
 H = 0
 BW = 100
 BH = 10
 R = 10

 vx = 2
 vy = 2
  

  function step() {
    x = parseInt($("#ball").attr("cx"))
    y = parseInt($("#ball").attr("cy"))
    x += vx
    y += vy

    if((x>=W-R && vx>0) || (x<=R && vx<0)) rebond_h() // Rebond bords
    else if(y>=H-R-BH && x+R/2>=barx && x-R/2<=barx+BW) rebond_bar((x+R/2-barx)/(BW+R)) // Rebond barre
    else if(y<=R) rebond_v() // Rebond haut
    else if(y>=H-R) perdu()

    $("#ball").attr("cx", x).attr("cy", y)
  }

  function rebond_v() { vy = -vy }
  function rebond_h() { vx = -vx }
  function rebond_bar(angle) {
    vy = -vy
    vx = 10*(angle - 0.5)
  }

  function perdu() {
    clearInterval(_i)
    $("#msg").text("PERDU !").show()
  }


  barx=0
  $(function() {
    svg = $("svg")

    $(window).keyup((e) => {
      if(e.key == ' ') location.reload()
    })

    $("#bar").attr("width", BW).attr("height", BH)
    $("#ball").attr("r", R)
    W = $("svg").width()
    H = $("svg").height()

    svg.on('mousemove', (e) => {
      barx = e.offsetX
      if(barx>=W-BW) barx = W-BW
      $("#bar").attr("x", barx)
    })



    _i = setInterval(step, 9)
  })
