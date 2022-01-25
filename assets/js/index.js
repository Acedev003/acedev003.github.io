let params = {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#7e8d85"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#7e8d85"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 80,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 300,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 800,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 800,
          "size": 80,
          "duration": 2,
          "opacity": 0.8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true 
}
particlesJS('particles-js', params);

let urls_list = []

let center_block   = document.getElementById("center_block");
let project_button = document.getElementById("projects_button");

let networkcall = (url,object) => 
                         {
                           let xhr = new XMLHttpRequest();

                           xhr.onload =  () =>
                           {
                            if (xhr.status >= 200 && xhr.status < 400) 
                            {
                              console.log(JSON.parse(xhr.responseText));
                              return;
                            }
                            console.log("Something went wrong!");
                          };
                          
                          xhr.onerror = function () 
                          {
                            console.log("Something went wrong!");
                          };

                          xhr.open("GET",url);
                          xhr.send();
                         }

let open_projects  = () =>
                     {
                       center_block.classList.add("fade-left")  
                       networkcall("https://api.github.com/users/acedev003/repos?type=owner")
                     }; 

project_button.onclick = open_projects;