const getMails = (urlParam) => {
    fetch(`http://localhost:3000/${urlParam}`)
        .then(res => res.json())
        .then(res => {
            if (document.getElementById("mailList") === null) {
                let mailList = document.createElement("div");
                mailList.setAttribute("id", "mailList");
                mailList.className = "maillist"
                document.getElementById("container").appendChild(mailList);
            }
            if (document.getElementById("mailBodyItem") != null) {
                document.getElementById("mailBodyItem").remove();
            }
            document.getElementById("mailList").innerHTML = "";
            for (let i = 0; i < res.length; i++) {
                let mailListItem = document.createElement("div");
                mailListItem.className = "mailitem";
                mailListItem.setAttribute("id", `${urlParam}` + res[i].id);
                mailListItem.addEventListener("click", (event) => getMail(event, `${urlParam}`));
                mailListItem.innerHTML = `${res[i].subject}`;
                document.getElementById("mailList").appendChild(mailListItem);
            }
        });
}
const getMail = (event, from) => {
    let targetid = -1;
    if (from.indexOf("inbox") !== -1) {
        console.log("eeeee")
        targetid = event.target.id.slice(5);
    }
    else {
        targetid = event.target.id.slice(4);
    }
    fetch(`http://localhost:3000/${from}/${targetid}`)
        .then(res => res.json()).then(res => {
            let mailBodyElement = document.createElement("div");
            let mailSubject = document.createElement("div");
            mailSubject.innerHTML = `${res.subject}`;
            if (from.indexOf("inbox") !== -1) {
                let mailFrom = document.createElement("div");
                mailFrom.innerHTML = `${res.from}`;
                mailBodyElement.appendChild(mailFrom);
            }
            else {
                let mailTo = document.createElement("div");
                mailTo.innerHTML = `${res.to}`;
                mailBodyElement.appendChild(mailTo);
            }
            let mailBody = document.createElement("div");
            mailBody.innerHTML = `${res.body}`;
            mailBodyElement.setAttribute("id", "mailBodyItem");
            mailBodyElement.appendChild(mailSubject);

            mailBodyElement.appendChild(mailBody);
            document.getElementById("mailList").replaceWith(mailBodyElement);
        })
    console.log(event);
}