// listen for comment attempts
document.querySelector("#blogSubmit").addEventListener("click", function(event) {

    event.preventDefault();

    // construct body with comment
    const commentObject = {
        body: document.querySelector("#newTitle").value,
        UserId: req.session.user.id,
        blogId: document.querySelector("#newBody").value
    };

    // post blog request
    fetch("/blogs",{

        method: "POST",
        body: JSON.stringify(commentObject),
        headers: {
            "Content-Type": "application/json"
        }

    }).then( res => {

        if(res.ok){
            location.href = "/dashboard";
        } else {
            alert("Post error, please try again.");
        };

    });

});