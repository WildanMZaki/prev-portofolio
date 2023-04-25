function getData(url, callback) {
    $.get(
        url, data => callback(data)
    );
}

function showSkill(){
    $('#hSkillsTitle').html("Hard Skills");
    $('[data-item="all"]').addClass('active');
    $('#mySkills').html('');        
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
            `);
        });
    })
}

showSkill();

$('#mySkills').on('click', '.more-skill', (e) => {
     getData("./skills.json", data => {
        let selected = data[parseInt(e.currentTarget.dataset.index)];
        $('#hSkillsTitle').html(selected.name);
        $('#hardSkilBreadcrumb').append(`<li class="breadcrumb-item active" data-item="sub">${selected.name}</li>`);
        $('[data-item="all"]').removeClass('active');
        $('#mySkills').html('');
        selected.childs.forEach(el => {
            $('#mySkills').append(`
                <div class="skill-item my-2">
                    <div class="d-flex justify-content-between">
                        <h5>${el.name}</h5>
                        <h5>${el.value} %</h5>
                    </div>
                    <div class="w-100 bg-light rounded-pill">
                        <div class="w${el.value} bg-warning text-warning rounded-pill">.</div>
                    </div>
                </div>
            `);
        })
     })
});

$('[data-item="all"]').click(e => {
    $('[data-item="sub"]').remove();
    showSkill();    
});
