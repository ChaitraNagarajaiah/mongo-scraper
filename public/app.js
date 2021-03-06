$.get('/scrape', function (res) {
    console.log(res)
})

$(document).ready(function () {
    console.log("hi");
    hide()


    $.getJSON("/api/articles", function (data) {
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<a href='" + data[i].link + "'>Link to the article</a>" + "<br />" + data[i].summary + "</p>");
            $("#articles").append(`
            <div class="">
                <p data-id='${data[i]._id}'>
                    ${ data[i].title} </br>
                    <a href='" +${ data[i].link}'>
                        Link to the article
                    </a> </br>
                    ${data[i].summary}
                </p>
                <button>comment</button>
                <button>save</button>
            </div>
        `);
        }
    });
});

$("#scrape").click(function () {
    console.log("hello");
})

$(document).on("click", "p", function () {
    $("#comments").empty();
    var thisId = $(this).attr("data-id");
    const title = $(this).text();
    console.log(title);
    console.log(thisId)
    // $.ajax({
    //     method: "GET",
    //     url: "/api/articles/" + thisId
    // }

    // $("#comments").append("<h2>" + title + "</h2>");
    // $("#comments").append("<input id ='titleinput' name='title'>");
    // $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
    // $("#comments").append("<button data-id='" + thisId + "' id='savecomment'>Save Comment</button>");

    $("#comments").append(`
        <div class="">
            <h2>${title}</h2>
            <input id ='titleinput' name='title'>
            <textarea id='bodyinput' name='body'></textarea>
            <button data-id='${thisId}' id='savecomment'>Save Comment</button>
        </div>
    `)




});


$(document).on("click", "#savecomment", function () {
    var thisId = $(this).attr("data-id");
    console.log($("#titleinput").val(), $("#bodyinput").val());
    $.ajax({
        method: "POST",
        url: "/api/articles/" + thisId,
        data: {
            // Value taken from title input
            name: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            console.log(data);
            $("#comments").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});

