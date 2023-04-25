function getData(url, callback) {
    $.get(
        url, data => callback(data)
    );
}

function showSkill(){
    getData("./skills.json", data => {
        data.forEach((el, ind) => {
            // Cek apakah punya value atau child
            let value;
            if (el.hasOwnProperty("value")) {
                value = el.value;
            } else {
                let values = el.childs.map(e => e.value)
                value = Math.round(values.reduce((a, b) => a+b, 0) / values.length); 
            }
            $('#mySkills').append(`
                <div class="skill-item my-2">
                    <div class="d-flex justify-content-between">
                        <h5>${el.name}</h5>
                        <h5>${value} %</h5>
                    </div>
                    <div class="w-100 bg-light rounded-pill">
                        <div class="w${value} bg-warning text-warning rounded-pill">.</div>
                    </div>
                    ${(el.hasOwnProperty("childs")) ? 
                        `<div class="d-flex justify-content-end">
                            <small class="text-warning more-skill" data-index="${ind}">Show more..</small>
                        </div>`: ''}
                </div>
            `)
        });
    })
}

showSkill();