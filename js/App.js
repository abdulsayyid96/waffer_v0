import WeverView from "./weverView.js";
import WeverAPI from "./WeverAPI.js";


export default class App {
    constructor(root) {
        this.links = [];
        this.view = new WeverView(root, this._handlers());

        this._refreshLinkList();
    }

    _refreshLinkList() {
        const linkList = WeverAPI.getLink();

        this._setList(linkList);
    }

    _setList(links) {
        this.view._updateLinkList(links);
        this.view._updateCountHeader(links.length);
    }

    _handlers() {
        return {
            onLinksAdd: (links) => {
                const newLink = {
                    link: links
                }
                WeverAPI.saveLink(newLink);
                this._refreshLinkList();
            },

            onLinksDelete: id => {
                WeverAPI.deleteLink(id);
                this._refreshLinkList();
            }
        };
    }
}