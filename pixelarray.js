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
            item.innerHTML += "<dot-item></dot-item>";
        }
        item.addEventListener("click", item_fill);
    });
}

function item_fill(e) {
    if(!e.target.classList.contains("fill")) {
        e.target.classList.add("fill");
    } else {
        e.target.classList.remove("fill");
    }
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
            result_array += (`[${content}]`);
        else
            result_array += (`[${content}], `);
        content = [];
    }

    result_array = `[${result_array}]`

    let tempInput = document.createElement("input")
    tempInput.value = result_array;

    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

create_dot()