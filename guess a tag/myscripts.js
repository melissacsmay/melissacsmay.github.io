//insert tags to create game 
const tags = ['pizza', 'sun', 'pineapple', 'cat', 'sunglasses','library', 'beach', 'moon', 'shoes'];
const list = document.getElementById('list-data');
const answerList = document.getElementById('testchoices');
let answer = ''


function randomColor() {
    const r = Math.floor(Math.random() * 202);
    const g = Math.floor(Math.random() * 202);
    const b = Math.floor(Math.random() * 202);
    return 'rgb(' + r + ', ' + g + ',' + b + ')'
}

function reset() {
    answerList.innerHTML = "";
    answer = tags[Math.floor(Math.random() * tags.length)]
    getTaggedPhoto(answer);

    const testchoices = [];
    testchoices.push(answer);
  
  while (testchoices.length < 5) {
        const rand = tags[Math.floor(Math.random() * tags.length)]
        if (testchoices.indexOf(rand) == -1) {
            testchoices.push(rand);
        }
    }

    testchoices.sort(function() {
        return Math.random() * 3 - 1;
    });


    for (let i = 0; i < testchoices.length; i++) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        li.appendChild(btn)
        btn.innerHTML = testchoices[i]
        btn.style.backgroundColor = randomColor();
        btn.onclick = function() {
            if (btn.innerHTML == answer) {
                alert('You are Right!')
            } else {
                alert('Sorry! The answer is ' + answer)
            }
            reset();
        }
        answerList.appendChild(li);
    }
}

//download without refreshing
function getTaggedPhoto(tagName) {
    //picks up relevant photos for the game
    fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=KrmAndd99kW65GDWfCUpCbeIEBWbDMzg8aBtwabH3DSzyUpKiD')
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result)
            //clear list on page
            list.innerHTML = ''

            const items = result.response;


            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                if (item.photos != undefined) {
                    const imgSrc = item.photos[0].original_size.url;

                    const img = document.createElement('img');
                    img.src = imgSrc;

                    const li = document.createElement('li');
                    li.appendChild(img);
                    //li.innerHTML=imgSrc;
                    list.appendChild(li);
                }
            }
        })
}


reset();
