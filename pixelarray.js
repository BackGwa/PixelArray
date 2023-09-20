let enable = false;

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
        if(!e.target.classList.contains("c0")) {
            e.target.classList.add("c0");
        } else {
            e.target.classList.remove("c0");
        }
    }
}

function remove_item() {

    playse('ckse');

    f = document.querySelectorAll("#f");
    f.forEach(item => {
        item.classList.remove("fill");
    });
}

function load() {

    playse('ckse');

    document.querySelector("dialog-title").innerHTML = `$ LOAD<br>$ INSERT ARRAY`;
    document.querySelector("dialog-area").classList.remove("hidden-area");
    document.querySelector("dialog-content").innerHTML = `
    <input type="text" id="varr">
    <dialog-btn onmouseenter="playse('btnse')" onclick="load_call()">
        <dialog-btn-label>$ SUBMIT</dialog-btn-label>
    </dialog-btn>
    `;
}

function draw(result, dot_item, index) {
    setTimeout(() => {
        if(index == 1023) {
            setTimeout(() => {
                dot_item[index].classList.replace("fill_g", "c0");
                enable = true;
            }, index * 1);
        }

        if(index != 0) {
            setTimeout(() => {
                dot_item[index - 1].classList.replace("fill_g", "c0");
            }, index * 1);
        }

        if(result == "1") {
            dot_item[index].classList.add("fill_g");
        }

        if(result == "2") {
            dot_item[index].classList.remove("c0");
        }

        if((index + 1) % 16 == 0) {
            playsx(index);
        }

    }, index * 2);
}

function load_call() {

    playse('ckse');

    inx = 0;
    remove_item();
    document.querySelector("cli-interface").classList.add("disable");

    varr_full = document.querySelector("#varr").value;

    if(varr_full.length < 2) {
        document.querySelector("cli-interface").classList.remove("disable");
        return;
    }

    varr_Y = varr_full.split(",  ");
    varr_Y.forEach((item, index1) => {
        varr_X = item.split(", ");
        varr_X.forEach((inner_item, index2)=> {
            result = inner_item.replace(/{/g, "").replace(/}/g, "").replace(/ /g, "");
            dot_item = document.querySelectorAll("dot-item");
            draw(result, dot_item, Math.abs(31 - index2 - 31) + index1 * 32);
        });
    });

    T = setInterval(() => {
        if(enable) {
            document.querySelector("cli-interface").classList.remove("disable");
            enable = false;
            clearInterval(T);
            playse("btnse");
        }
    }, 256);

    close_dialog();
}

function copy() {

    playse('ckse');

    result_array = "";
    content = "";
    idx = 0;
    dot_item = document.querySelectorAll("dot-item");

    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            if(dot_item[idx].classList.contains("c0")) v = 1;
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
            result_array += (`{${content}},  <br>`);
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

function revert() {
    playse('ckse');
    document.querySelector("cli-interface").classList.add("disable");
    dot_item = document.querySelectorAll("dot-item");

    dot_item.forEach((item, index) => {
        if(item.classList.contains("c0")) {
            draw("2", dot_item, index);
        } else {
            draw("1", dot_item, index)
        };
    });

    T = setInterval(() => {
        if(enable) {
            document.querySelector("cli-interface").classList.remove("disable");
            enable = false;
            clearInterval(T);
            playse("btnse");
        }
    }, 256);
    
}

function close_dialog() {
    playse('ckse');
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

function playse(type) {
    document.querySelector("#se").src = `./${type}.mp3`;
    document.querySelector("#se").play();
}

function playsx(idx) {
    sx = document.createElement("audio");

    sx.setAttribute('loop', ``);
    sx.setAttribute('src', `./drawse.mp3`);
    sx.setAttribute('id', `sx${idx}`);
    sx.setAttribute('class', `sxaudio`);

    document.body.appendChild(sx);
    document.getElementById(`sx${idx}`).play();

    setTimeout(() => {
        document.getElementById(`sx${idx}`).remove();
    }, 500);
}

document.oncontextmenu = () => {
    return false;
}