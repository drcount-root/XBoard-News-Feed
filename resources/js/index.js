typeof exports === "object";

var iCount = 0;
async function addMagazine() {
    let countArray = ["collapseOne","collapseTwo","collapseThree"];
    let headingArray = ["headingOne","headingTwo","headingThree"];
    let titleHead = ["Covid News", "Global News","Sports"]
        try{
          for(let i=0; i< magazines.length; i++){
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines[i]}`);
            //console.log(url);
            let data  = await res.json();
            let divAccordions = document.getElementById("accordion");
            let divCard = document.createElement("div");
            divCard.className="card";
            divCard.innerHTML = `
              <div>
                <h5 class="mb-0">
                  <button class="accordion-button btn btn-link text-style" type="button" data-toggle="collapse" data-target="#${countArray[i]}" aria-expanded="true" aria-controls="${countArray[i]}">
                    <i class="fas fa-angle-down"></i>${titleHead[i]}
                  </button>
                </h5>
              </div>          
              <div id="${countArray[i]}" class="collapse show" aria-labelledby="${headingArray[i]}" data-parent="#accordion">
                <div class="card-body" id="Carousel${i}">
                </div>
              </div>
            `;
            divAccordions.appendChild(divCard);
            console.log(data.items);
            gallery(data.items);
            
          }
        } catch(error) {
            return null;
        }       
}

function gallery(items) {
  console.log(items);
    let varCount = 0;
    let divElement = document.getElementById("Carousel" + iCount);
    divElement.innerHTML = `
  <div id="carouselExampleIndicators${iCount}" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner" id = "carousel-slides${iCount}">
    </div>
      <a class="carousel-control-prev car-rectangle-left" id="control-left" href="#carouselExampleIndicators${iCount}" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next car-rectangle-right" id="control-right" href="#carouselExampleIndicators${iCount}" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
  </div>`;

    let divCarousel = document.getElementById("carousel-slides" + iCount);
    console.log(divElement);
    items.map((key,index) => {
      let divImage = document.createElement("div");

      if(varCount === 0) {
        divImage.className = "carousel-item active";
        divImage.innerHTML = `
        <a href="${key.link}" target="_blank" style="color:black">
        <div>
        <img class="img-responsive imgheight d-block w-100" src="${key.enclosure.link}" alt="First slide">
        </div>
        <div class="mt-4 active">
          <div>
            <h4>${key.title}</h4>
          </div>
          <div class="d-flex">
            <span class="pr-2"><b>${key.author}</b></span>
            <span>${key.pubDate}</span>
          </div>
          <hr />
          <div><p>${key.description}</p></div>
        </div>
        </a>`;
        varCount = 1;
      } else {
        divImage.className = "carousel-item";
        divImage.innerHTML = `
        <a href="${key.link}" target="_blank" style="color:black; text-decoration:none">
        <div>
        <img class="img-responsive imgheight d-block w-100" src="${key.enclosure.link}" alt="First slide">
        </div>
        <div class="mt-4">
          <div>
            <h4>${key.title}</h4>
          </div>
          <div class="d-flex">
            <span class="pr-2"><b>${key.author}</b></span>
            <span>${key.pubDate}</span>
          </div>
          <hr />
          <div><p>${key.description}</p></div>
        </div>
        </a>`;
      }
        
      divCarousel.appendChild(divImage);
    });

    iCount = iCount+1;

}

export {addMagazine, gallery};