let params = {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 1800
        }
      },
      "color": {
        "value": "#ffffff"
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
        "value": 0.7,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": true
        }
      },
      "size": {
        "value": 4,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 8,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 160,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": true,
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
      "detect_on": "window",
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
          "distance": 100,
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

class Table
{
  #cell_count = 0;
  #div;
  #parentid;
  
  constructor(parent_id)
  {
    this.#parentid = parent_id;
  }

  get_cellCount()
  {
    return this.#cell_count;
  }

  create()
  {
    this.#div  = document.createElement("div");
    this.#div.classList.add("w3-row","w3-padding");
    
    let parent = document.getElementById(this.#parentid);
    parent.appendChild(this.#div);
  }

  reset()
  {
    this.#cell_count = 0;
    let parent = this.#div;
    parent.classList.add("conceal-fast");
    setTimeout(this.remove,3000,parent);
  }

  remove(parent)
  {
    parent.remove();
  }

  add(title_txt,description,prj_link,img_link,font_color)
  {
    let parent     = this.#div;

    let anchor  = document.createElement("a");
    anchor.href = prj_link;
    anchor.target = "_blank";
    anchor.style.color = font_color;
    anchor.style.height = '300px';
    anchor.style.marginBottom = '40px';
    anchor.classList.add("w3-col","s12","m6","l4","w3-padding"); 

    let child = document.createElement("div");
    child.classList.add("w3-card-4","w3-round-xlarge",);
    child.style.display = "inline-block";
    child.style.overflow = "hidden";
    child.style.position = "relative";
    child.style.width = "100%";
    child.style.height = "300px";

    let container = document.createElement("div");
    container.classList.add("w3-large");
    container.style.marginBottom = "16px";

    let bg_img = document.createElement("img");
    bg_img.src = img_link;
    bg_img.classList.add("w3-round-xlarge");
    bg_img.style.pointerEvents = "none";
    bg_img.style.position = "absolute";
    bg_img.style.height = "100%";
    bg_img.style.width = "100%";
    bg_img.style.zIndex = -1;

    let title       = document.createElement("div");
    title.innerText = title_txt;
    title.style.paddingLeft = "16px";

    let br1          = document.createElement("br");
    let br2          = document.createElement("br");

    let subtitle       = document.createElement("p");
    subtitle.innerText = description;
    subtitle.classList.add("w3-padding");

    container.appendChild(bg_img);
    container.appendChild(br1);
    container.appendChild(title);
    container.appendChild(br2);
    container.appendChild(subtitle);

    child.appendChild(container);

    anchor.appendChild(child);

    parent.appendChild(anchor);

  }

}

let urls_list = []


let table = new Table("project_holder");

let center_block   = document.getElementById("center_block");
let project_button = document.getElementById("projects_button");
let project_close  = document.getElementById("project_close");
let project_panel  = document.getElementById("project_panel");

let back_set = false;

let networkcall = (url) => 
                         {
                           table.create();
                           let xhr = new XMLHttpRequest();
                           xhr.onload =  () =>
                           {
                            if (xhr.status >= 200 && xhr.status < 400) 
                            {
                              let json = JSON.parse(xhr.responseText);
                              for(const element of json)
                              {
                                table.add(element.title,element.description,element.link,element.img_link,element.font_color);
                              }
                              return;
                            }
                            console.log("Something went wrong!");
                            alert("Request Failed! Kindly refresh page");
                          };
                          
                          xhr.onerror = function () 
                          {
                            console.log("Something went wrong!");
                            alert("Request Failed! Kindly refresh page");
                          };

                          xhr.open("GET",url);
                          xhr.send();
                        }

let open_projects  = () =>
                     {
                       if(!back_set)
                       {
                         history.pushState(null, null, window.location.href);
                         back_set = true;
                       }
                       window.onpopstate = () => {
                                                    if(back_set)
                                                    {
                                                      history.forward();
                                                      close_projects();
                                                    }
                                                  };

                       center_block.classList.add("fade-left");
                       project_panel.classList.add("fade-out");
                       center_block.classList.remove("fade-out");  
                       project_panel.classList.remove("fade-in");  
                       networkcall("assets/projects/projects.json");
                     }; 

let close_projects = () =>
                     {
                      window.onpopstate = null;
                      table.reset();
                      center_block.classList.add("fade-out");
                      project_panel.classList.add("fade-in");
                      center_block.classList.remove("fade-left");
                      project_panel.classList.remove("fade-out");  
                     };

project_button.onclick = open_projects;
project_close.onclick  = close_projects;


let about   = document.getElementById('about');
let socials = document.getElementById('socials');

about.onclick = () =>{
  document.getElementById('about_modal').style.display = 'block';
};

socials.onclick = () =>{
  document.getElementById('social_modal').style.display = 'block';
};