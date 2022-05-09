// listen for login attempts
document.querySelector("#blogSubmit").addEventListener("click", function(event) {

    event.preventDefault();

    // construct body with user blogs
    const blogObject = {
        title: document.querySelector("#newTitle").value,
        body: document.querySelector("#newBody").value,
    };

    // post blog request
    fetch("/blogs",{

        method: "POST",
        body: JSON.stringify(blogObject),
        headers: {
            "Content-Type": "application/json"
        }

    }).then( res => {

        if (res.ok) {
            location.reload();
        } else {
            alert("Post error, please try again.");
        };

    });

});