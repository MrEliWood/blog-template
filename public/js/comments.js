const commentSubmits = document.getElementsByClassName("commentSubmit");
const commentInputs = document.getElementsByClassName("commentInput");

for (let i = 0; i < commentSubmits.length; i++) {

    commentSubmits[i].addEventListener("click", function (event) {

        event.preventDefault();

        // construct body with comment
        const commentObject = {
            body: commentInputs[i].value,
            blog_id: event.target.value
        };

        // post comment request
        fetch("/comments", {

            method: "POST",
            body: JSON.stringify(commentObject),
            headers: {
                "Content-Type": "application/json"
            }

            })
            .then(res => {

                if (res.ok) {
                    location.reload();
                } else {
                    alert("Post error, please try again.");
                };

            });

        });

};