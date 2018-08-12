// Naming conventions:
// eXxx: HTMLElement Object

function postScore() {
    let eRadios = document.querySelectorAll('input.star');
    let eScore = document.getElementById("score");
    let eUserNum = document.getElementById("user_n");
    let eStatus = document.getElementById("status");

    for (let i = 0; i < 5; i++) {
        if (eRadios[i].checked == true) {
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
                        avgScore = JSON.parse(xhr.responseText).score;
                        eScore.innerHTML = avgScore.toFixed(2);
                        eUserNum.innerHTML = JSON.parse(xhr.responseText).count;
                        eStatus.innerHTML = "Upload OK.";
                        eStatus.style.color = "green";

                        if (avgScore>= 4) {
                            eScore.style.color = "green";
                        } else if (avgScore >= 2) {
                            eScore.style.color = "orange";
                        } else {
                            eScore.style.color = "red";
                        }
                    }
                    else {
                        eStatus.innerHTML = "Sending your score...";
                        eStatus.style.color = "blue";
                    }
                };

                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(JSON.stringify(data));
            });
        }

    }

    // Submit without checking
    eStatus.innerHTML = "Error: you should select the score first.";
    eStatus.style.color = "red";
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
