// write your code here
let ramen_menu = document.getElementById("ramen-menu")
let ramen_display = document.getElementById("ramen-detail")
let rating = document.getElementById("rating-display")
let comment = document.getElementById("comment-display")
let form = document.querySelector("#new-ramen")
let update = document.getElementById("edit-ramen")

const fetchRamen = () => {
   return fetch("http://localhost:3000/ramens")
    .then(res => res.json())
}

const postRamen = (ramen) => {
    let ramens = document.createElement("li")
    
    let ramen_img = document.createElement("img")
    ramen_img.src = ramen.image

    ramen_img.addEventListener("click", (event) => {
        ramenDetail(ramen)
    })
    ramen_menu.appendChild(ramen_img)
}

const ramenDetail = (ramen) => {
    document.querySelector(".detail-image").src = ramen.image
    document.querySelector(".name").textContent = ramen.name
    document.querySelector(".restaurant").textContent = ramen.restaurant
    rating.textContent = ramen.rating
    comment.textContent = ramen.comment 

    update.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/ramens/${ramenObj.id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rating: e.target.rating.value,
                comment: e.target.querySelector("#new-comment").value,
            }),
        })
    })
}

fetchRamen().then(data => {
    data.forEach(ramen => {
        postRamen(ramen)
    })
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: e.target.name.value,
            restaurant: e.target.restaurant.value,
            image: e.target.image.value,
            rating: e.target.rating.value,
            comment: e.target.newComment.value,
        }),
    });
});