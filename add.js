
let rub1 = document.querySelector(".rub1");
let rub2 = document.querySelector(".rub2");
let usd1 = document.querySelector(".usd1");
let usd2 = document.querySelector(".usd2");
let eur1 = document.querySelector(".eur1");
let eur2 = document.querySelector(".eur2");
let gbp1 = document.querySelector(".gbp1");
let gbp2 = document.querySelector(".gbp2");
let buttonsLeft = document.querySelectorAll(".btn-left");
let rightInput = document.querySelector(".right-input");
let leftInput = document.querySelector(".left-input");
let addBtn = document.querySelector(".addBtn");
let newUl = null;
addBtn.addEventListener("click", () => {
    if (!newUl) {
        newUl = document.createElement("ul");
        newUl.classList.add("newUl");
        let items = ["БАНК", "БИЗНЕС", "ИНВЕСТИЦИИ", "СТРАХОВАНИЕ", "МОБАЙЛ", "ПУТЕШЕСТВИЯ", "РАЗВЛЕЧЕНИЯ"];
        items.forEach(item => {
            let newLi = document.createElement("li");
            newLi.classList.add("newLi")
            newLi.textContent = item;
            newUl.append(newLi);
        });
        mainDiv.insertBefore(newUl, mainDiv.children[0]);
    } else {
        newUl.remove();
        newUl = null;
    }
});
buttonsLeft.forEach(button => {
    button.addEventListener("click", () => {
        buttonsLeft.forEach(btn =>
            btn.classList.remove("active-left", "rub1")
        );
        button.classList.add("active-left");
        ;
    });
});
let buttonsRight = document.querySelectorAll(".btn-right");
buttonsRight.forEach(item => {
    item.addEventListener("click", () => {
        buttonsRight.forEach(element => {
            element.classList.remove("active-right", "usd2");
        })
        item.classList.add("active-right");
    })
})

let leftCounteiner = document.querySelector(".main-leftDiv-window");
let rightCounteiner = document.querySelector(".main-rightDiv-window");
let buttons = document.querySelectorAll(".btn")
function goOnline1(){
    if (rub1.classList.contains("active-left") && usd2.classList.contains("active-right")) {
    fetch("https://v6.exchangerate-api.com/v6/21a684990e0c8cf9243ba46f/latest/RUB")
        .then(res => res.json()).then(dataRUB => {
            console.log(dataRUB);
            let newLeftP = document.createElement("p");
            newLeftP.classList.add("p")
            let usd = dataRUB.conversion_rates.USD
            newLeftP.textContent = `1 RUB= ${usd} USD`
            leftCounteiner.append(newLeftP)
        })
    fetch("https://v6.exchangerate-api.com/v6/21a684990e0c8cf9243ba46f/latest/USD")
        .then(res => res.json()).then(dataUSD => {
            let newRightP = document.createElement("p");
            newRightP.classList.add("p")
            let rub = dataUSD.conversion_rates.RUB
            newRightP.textContent = `1 USD= ${rub} RUB`
            rightCounteiner.append(newRightP)
        })
}
function valyuta(esasValyuta, hedefValyuta, container, text) {
    fetch(`https://v6.exchangerate-api.com/v6/21a684990e0c8cf9243ba46f/latest/${esasValyuta}`)
        .then(res => res.json()).then(data => {
            console.log(data)
            let deyer = data.conversion_rates[hedefValyuta]
            let newP = document.createElement("p");
            newP.classList.add("p");
            newP.textContent = text.replace("{deyer}", deyer);
            container.append(newP);
            console.log(container)
        })
}
function valyutaSecimi(baseLeft, baseRight, leftCounteiner, rightCounteiner) {
    removeOnlyParagraphs(leftCounteiner);
    removeOnlyParagraphs(rightCounteiner);
    valyuta(baseLeft, baseRight, leftCounteiner, `1 ${baseLeft} = {deyer} ${baseRight}`);
    valyuta(baseRight, baseLeft, rightCounteiner, `1 ${baseRight} = {deyer} ${baseLeft}`);
}
buttons.forEach(item => {
    item.addEventListener("click", () => {
        let baseLeft = rub1.classList.contains("active-left") ? "RUB" :
            eur1.classList.contains("active-left") ? "EUR" :
                gbp1.classList.contains("active-left") ? "GBP" :
                    "USD";
        let baseRight = rub2.classList.contains("active-right") ? "RUB" :
            eur2.classList.contains("active-right") ? "EUR" :
                gbp2.classList.contains("active-right") ? "GBP" :
                    "USD";
        valyutaSecimi(baseLeft, baseRight, leftCounteiner, rightCounteiner);
    })
})
function removeOnlyParagraphs(container) {
    let paragraphs = container.querySelectorAll("p");
    paragraphs.forEach(p => p.remove());
}
}

leftInput.addEventListener("input", () => {
    leftInput.value = leftInput.value.replace(/[^0-9.,]/g, "");
    leftInput.value = leftInput.value.replace(/,/g, ".");
    if ((leftInput.value.match(/\./g) || []).length > 1) {
        leftInput.value = leftInput.value.replace(/\.$/, "");
    }
});

rightInput.addEventListener("input", () => {
    rightInput.value = rightInput.value.replace(/[^0-9.,]/g, "");
    rightInput.value = rightInput.value.replace(/,/g, ".");
    if ((rightInput.value.match(/\./g) || []).length > 1) {
        rightInput.value = rightInput.value.replace(/\.$/, "");
    }
});
goOnline1()


function goOnline() {
    function valyutaSecimi1(baseLeft, baseRight) {
        fetch(`https://v6.exchangerate-api.com/v6/21a684990e0c8cf9243ba46f/latest/${baseLeft}`)
            .then(res => res.json())
            .then(data => {
                let conversionRate = data.conversion_rates[baseRight];

                function convertValues() {
                    if (conversionRate !== 1) {
                        if (leftInput.value.trim() !== "") {
                            rightInput.value = (leftInput.value * conversionRate).toFixed(5);
                        } else if (rightInput.value.trim() !== "") {
                            leftInput.value = (rightInput.value / conversionRate).toFixed(5);
                        }
                    } else {
                        if (leftInput.value.trim() !== "") {
                            rightInput.value = (leftInput.value * conversionRate).toFixed(0);
                        } else if (rightInput.value.trim() !== "") {
                            leftInput.value = (rightInput.value / conversionRate).toFixed(0);
                        }
                    }
                }
                leftInput.addEventListener("input", () => {
                    if (leftInput.value.trim() !== "") {
                        rightInput.value = (leftInput.value * conversionRate).toFixed(5);
                    } else {
                        rightInput.value = "";
                    }
                });
                rightInput.addEventListener("input", () => {
                    if (rightInput.value.trim() !== "") {
                        leftInput.value = (rightInput.value / conversionRate).toFixed(5);
                    } else {
                        leftInput.value = "";
                    }
                });
                convertValues();
            });
    }
    fetch(`https://v6.exchangerate-api.com/v6/21a684990e0c8cf9243ba46f/latest/RUB`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let conversionRate1 = data.conversion_rates.USD;
            leftInput.addEventListener("input", () => {
                if (leftInput.value.trim() !== "") {
                    rightInput.value = (leftInput.value * conversionRate1).toFixed(5);
                } else {
                    rightInput.value = "";
                }
            });

            rightInput.addEventListener("input", () => {
                if (rightInput.value.trim() !== "") {
                    leftInput.value = (rightInput.value / conversionRate1).toFixed(5);
                } else {
                    leftInput.value = "";
                }
            });

            if (leftInput.value.trim() !== "") {
                rightInput.value = (leftInput.value * conversionRate1).toFixed(5);
            } else if (rightInput.value.trim() !== "") {
                leftInput.value = (rightInput.value / conversionRate1).toFixed(5);
            }
        });
    function yoxlaVeIcraEt1() {
        let baseLeft = rub1.classList.contains("active-left") ? "RUB" :
            eur1.classList.contains("active-left") ? "EUR" :
            gbp1.classList.contains("active-left") ? "GBP" :
            "USD";
        let baseRight = rub2.classList.contains("active-right") ? "RUB" :
            eur2.classList.contains("active-right") ? "EUR" :
            gbp2.classList.contains("active-right") ? "GBP" :
            "USD";
        valyutaSecimi1(baseLeft, baseRight);
    }
    document.addEventListener("DOMContentLoaded", () => {
        yoxlaVeIcraEt1();
    });
    buttons.forEach(item => {
        item.addEventListener("click", () => {
            yoxlaVeIcraEt1();
        });
    });
    leftInput.addEventListener("input", () => {
        yoxlaVeIcraEt1();
    });
    rightInput.addEventListener("input", () => {
        yoxlaVeIcraEt1();
    });
};
goOnline();
let mainDiv = document.querySelector(".main-Div")
let msg = document.createElement("p")
function internet() {
    if (navigator.onLine === false) {
        leftInput.value = "";
        rightInput.value = "";        
        msg.style.display = "block";
        msg.classList.add("msg");
        msg.textContent = "Нет подключения к Интернету";
        mainDiv.insertBefore(msg, mainDiv.children[1]);
        function goOfline() {
            function valyutaSecimi2(baseLeft, baseRight) {
                if (baseLeft === baseRight) {
                    rightInput.value = leftInput.value;
                } else {
                    rightInput.value = "";
                }
            }
            function yoxlaVeIcraEt() {
                let baseLeft = rub1.classList.contains("active-left") ? "RUB" :
                    eur1.classList.contains("active-left") ? "EUR" :
                    gbp1.classList.contains("active-left") ? "GBP" :
                    "USD";
        
                let baseRight = rub2.classList.contains("active-right") ? "RUB" :
                    eur2.classList.contains("active-right") ? "EUR" :
                    gbp2.classList.contains("active-right") ? "GBP" :
                    "USD";
                valyutaSecimi2(baseLeft, baseRight);
            }
            document.addEventListener("DOMContentLoaded", () => {
                yoxlaVeIcraEt();
            });
            buttons.forEach(item => {
                item.addEventListener("click", () => {
                    yoxlaVeIcraEt(); 
                });
            });
            leftInput.addEventListener("input", () => {
                yoxlaVeIcraEt();
            });
            rightInput.addEventListener("input", () => {
                yoxlaVeIcraEt();
            });
        }
        goOfline();
    }
     else {
        msg.style.display = "none";
        goOnline();
    }
}

internet();
window.addEventListener("online", internet);
window.addEventListener("offline", internet);

