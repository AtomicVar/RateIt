function postScore(){
    let radios = document.querySelectorAll('input.star');
    for (let i = 0; i < 5; i++) {
        if (radios[i].checked == true) {
            let score = i + 1;
            let uid = 'xxx';
            let url = 'https://127.0.0.1:3001';
            let data = {
                uid,
                score
            };

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(res => {
                resObj = res.json();
                if (resObj.status == true) {
                    let status = document.getElementById("status");
                    status.innerHTML = 'Upload OK!';
                    status.className = 'success';
                } else {

                }
            }).catch(e => console.log('Error: ' + e));
        }
    }

    // Submit without checking
}

function getScore(){
}

document.addEventListener('DOMContentLoaded', getScore);
document.getElementById('submit').addEventListener('click', postScore);
