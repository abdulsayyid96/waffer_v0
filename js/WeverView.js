export default class WeverView {
    constructor(root, {onLinksAdd, onLinksDelete} = {}) {
        this.root = root;
        this.onLinksAdd = onLinksAdd;
        this.onLinksDelete = onLinksDelete;
        this.root.innerHTML = `
        <nav class="floating-nav">
            <input class="input-link" type="text" placeholder="Paste your link here">
            <button class="btn-add">Add to watch</button>
        </nav>
        <div class="main-header">
        </div>
        <div class="main-container">
            <ul class="container-list">
            </ul>
        </div>
        `;

        const btnAddLink = this.root.querySelector(".btn-add");
        const inputLink = this.root.querySelector(".input-link");
        
        btnAddLink.addEventListener("click",() => {
            const newLink = inputLink.value.trim();
            const lenLink = inputLink.value.length;

            if(newLink != ""){
                // console.log(lenLink);
                this.filterLink(newLink)
                inputLink.value = "";
            } else {
                alert("Fill the link!")
            }
        });

    }

    _createVideoLink(id, link) {

        return `
        <li class="link-list-item" data-link-id="${id}">
            <div class="btn-delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            </div>
            <iframe 
                src="https://www.youtube.com/embed/${link}"
                title="YouTube video player"
                frameborder="0" 
                allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture;" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
            </iframe>
        </li>
        `
    }
    
    _updateLinkList(linkList) {
        const ContainerList = this.root.querySelector(".container-list"); 
        
        ContainerList.innerHTML = "";
        
        for(const listOfLink of linkList) {
            const html = this._createVideoLink(listOfLink.id,listOfLink.link)
            ContainerList.insertAdjacentHTML("beforeend",html);
        }

        // Select & Delete link function

        ContainerList.querySelectorAll(".link-list-item").forEach(linkListItem => {
            linkListItem.addEventListener("click", () => {
                this.onLinksDelete(linkListItem.dataset.linkId);
            })
        });
        
        
    }
    
    _countVideoList(linkList) {

        return `
            <h1>Wever</h1>
            <div>${linkList} videos </div>
        `
    }

    _updateCountHeader(numOfVideo) {
        const mainHeader = this.root.querySelector(".main-header");

        mainHeader.innerHTML = "";

        const headerHTML = this._countVideoList(numOfVideo)
        mainHeader.insertAdjacentHTML("beforeend",headerHTML);
    }

    filterLink(link) {
        
        if (link.includes("https://www.youtube.com/")) {
            
            const FirstSlice = link.slice(32,link.length);
            const secondSlice = FirstSlice.slice(0,11)
            // console.log(secondSlice);
            this.onLinksAdd(secondSlice);

        } if (link.includes("https://youtu.be/")) {
            
            // console.log(link.slice(17,link.length));
            this.onLinksAdd(link.slice(17,link.length));
        }
    }

}