

class ColourPicker {
    

    constructor(root, savedColours) {
        //  Keep reference to html root element
        this.root = root;
        this.colorjoe = colorjoe.rgb(this.root.querySelector(".colorjoe"));
        //  Reference for selected colour
        this.selectedColour = null;
        this.savedColours = this.getSavedColours();
          
        

        this.colorjoe.show();
        this.setSelectedColour("#009578");

        // When user changes the colour, run this function..
        this.colorjoe.on("change", colour => {
            this.setSelectedColour(colour.hex(), true);
        });


        //  loop, grabbing onto it's element and index
        this.root.querySelectorAll(".saved-color").forEach((el, i) => {
            this.showSavedColour(el, this.savedColours[i]);

            el.addEventListener("mouseup", e => {

                // Going with keyboard shortcut as middle wheel on 
                // laptops and tablets is a bit annoying
                if (e.button == 2) {
                    e.preventDefault();
                    this.saveColour(this.selectedColour, i);
                    this.showSavedColour(el, this.selectedColour);
                }


                this.setSelectedColour(el.dataset.colour);
            });
        });
    }

    setSelectedColour(colour, skipCjUpdate = false) {
        this.selectedColour = colour;
        this.root.querySelector(".selected-color-text").textContent = colour.toUpperCase();
        this.root.querySelector(".selected-color-text").style.background = colour.toUpperCase();

        if (!skipCjUpdate) {
            this.colorjoe.set(colour);
        }
    }

    showSavedColour(element, colour) {        
        element.style.background = colour;
        //  HTML5 data-attributes   
        element.dataset.colour = colour;
    }

    getSavedColours() {
        //  Get saved colours, or default to empty array
        const savedColours = JSON.parse(localStorage.getItem("colourpicked-saved") || "[]");

        //  Provide the defaults if the user is loaiding site for the first time
        //
        //  Return a new array of 5 elements, map() if there is a corresponding value
        //  inside the savedColours array for that index, and if there is, use it
        //  instead.
        //  See; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        return new Array(5).fill("#FFFFFF").map((defaultColour, index) => {
            return savedColours[index] || defaultColour;
        });
    }

    saveColour(colour, index) {
        this.savedColours[index] = colour;
        localStorage.setItem("colourpicked-saved", JSON.stringify(this.savedColours));
    }

}


export function initColorJoe() {  
    //console.log("initColourJoe");
    //console.log("Passed in colours: " + savedColours);
    const cp = new ColourPicker(document.getElementById("colourJoeContainer"));
}