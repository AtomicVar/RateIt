function postScore() {
    let radios = document.querySelectorAll('input.star');
    for (let i = 0; i < 5; i++) {
        if (radios[i].checked == true) {
            let score = 5 - i;
            let url = 'http://95.179.143.156:3000/postScore';
            let query = { active: true, currentWindow: true };
            chrome.tabs.query(query, (tabs) => {
                let data = {
                    host: getHostFromUrl(tabs[0].url),
                    score
                };

                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        let score = document.getElementById("score");
                        let user_n = document.getElementById("user_n");
                        score.innerHTML = JSON.parse(xhr.responseText).score;
                        user_n.innerHTML = JSON.parse(xhr.responseText).count;
                        let status = document.getElementById("status");
                        status.innerHTML = "Upload OK.";
                    }
                    else {
                        let status = document.getElementById("status");
                        status.innerHTML = "Sending your score...";
                    }
                };

                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(JSON.stringify(data));
            });
        }

    }

    // Submit without checking
}

function getScore() {
    let query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        let host = document.getElementById("host");
        host.innerHTML = getHostFromUrl(tabs[0].url);
    });
}

function getHostFromUrl(url) {
    return url.match(/(?<=\/\/).*?(?=\/)/g)[0];
}

window.onload = getScore;
document.getElementById('submit').addEventListener('click', postScore);
