
let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning");

let getRepoIssues = function (repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        //if request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function
                displayIssues(data);
                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            alert("There was a problem with your request");
        }
    });
};

let displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = " The repo selected has no open issues.";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        //    create a link element to take users to the issue on github
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        //create span to hold issue title
        let issueTitleEl = document.createElement("span");
        issueTitleEl.textContent = issues[i].title;
        //append to container
        issueEl.appendChild(issueTitleEl);
        //create  a type element
        let issueTypeEl = document.createElement("span");
        // check if issue is an actual issue or a pull request
        if (issues.pull_request) {
            issueTypeEl.textContent = "(Pull request)";
        } else {
            issueTypeEl.textContent = "(Issue)";
        }
        //append to container
        issueEl.appendChild(issueTypeEl);
        issueContainerEl.appendChild(issueEl);
    }

};

var displayWarning = function (repo) {
    // add text to warning container
    limitWarningEl.textContent = "This repo has more than 30 issues, ";
    let linkEL = document.createElement("a");
    linkEL.textContent = "see all issues on GitHub.com";
    linkEL.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEL.setAttribute("target", "_blank");
    limitWarningEl.appendChild(linkEL);
};



getRepoIssues("facebook/react");