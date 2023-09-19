function create_dot(){
    dot = document.querySelector("dot-area");
    for (var i = 0; i < 32; i++) {
        dot.innerHTML += "<dot-row></dot-row>";
    }
    create_dot_item();
}

function create_dot_item(){
    dot_row = document.querySelectorAll("dot-row");

    dot_row.forEach(item => {
        for (var i = 0; i < 32; i++) {
            item.innerHTML += "<dot-item id='f'></dot-item>";
        }
    });

    f = document.querySelectorAll("#f");
    f.forEach(item => {
        item.addEventListener("click", item_fill);
        item.addEventListener("mouseover", item_fill);
    });
}

function item_fill(e) {
    if(e.buttons >= 1 || e.type == "click") {
        if(!e.target.classList.contains("fill")) {
            e.target.classList.add("fill");
        } else {
            e.target.classList.remove("fill");
        }
    }
}

function remove_item() {
    f = document.querySelectorAll("#f");
    f.forEach(item => {
        item.classList.remove("fill");
    });
}

function load() {
    document.querySelector("dialog-title").innerHTML = `$ LOAD<br>$ <cli-cursor></cli-cursor>`;
    document.querySelector("dialog-area").classList.remove("hidden-area");
    document.querySelector("dialog-content").innerHTML = "";
}

function copy() {

    result_array = "";
    content = "";
    idx = 0;
    dot_item = document.querySelectorAll("dot-item");

    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            if(dot_item[idx].classList.contains("fill")) v = 1;
            else v = 0;
            
            if(j == 0)
                content += `${v}`;
            else
                content += `, ${v}`;
            idx++;
        }
        if(i == 31)
            result_array += (`{${content}}`);
        else
            result_array += (`{${content}}, <br>`);
        content = [];
    }

    result_array = `{<br>${result_array}<br>}`

    document.querySelector("dialog-title").innerHTML = `$ COPY<br>COPY SUCCESS<cli-cursor></cli-cursor>`;
    document.querySelector("dialog-area").classList.remove("hidden-area");
    document.querySelector("dialog-content").innerHTML = `
    <content-scroll>${result_array}</content-scroll>
    `

    let tempInput = document.createElement("textarea");
    tempInput.value = result_array.replace(/<br>/g, `\n`);

    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

function close_dialog() {
    document.querySelector("dialog-area").classList.add("hidden-area");
}

setInterval(function() {
    cli = document.querySelectorAll("cli-cursor")

    cli.forEach(item => {
        item.innerHTML = "";
    });

    setTimeout(function() {
        cli.forEach(item => {
            item.innerHTML = "▁";
        });
    }, 500);
}, 1000);

create_dot();