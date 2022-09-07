// write your code here
let ramen_menu = document.getElementById("ramen-menu")
let ramen_display = document.getElementById("ramen-detail")
let rating = document.getElementById("rating-display")
let comment = document.getElementById("comment-display")
let form = document.getElementById("new-ramen")

form.addEventListener("submit", (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/ramens", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: event.target.name.value,
                restaurant: event.target.restaurant.value,
                image: event.target.image.value
            })
        })
    })


// uses fetch on the JSON file and returns a promise
const fetchRamen = () => {
   return fetch("http://localhost:3000/ramens")
    .then(res => res.json())
}

// creates the ramen in the div 
const createRamen = (ramen) => {
    let ramens = document.createElement("li")
    
    let ramen_img = document.createElement("img")
    ramen_img.src = ramen.image

    ramen_menu.appendChild(ramen_img);

    ramen_img.addEventListener("click", (event) => {
        document.querySelector(".detail-image").src = ramen.image
        document.querySelector(".name").textContent = ramen.name
        document.querySelector(".restaurant").textContent = ramen.restaurant
        rating.textContent = ramen.rating
        comment.textContent = ramen.comment
    })
}

fetchRamen().then(data => {
    data.forEach(ramen => {
        postRamen(ramen)
    })
});