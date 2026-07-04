export default class WeverAPI {
    static getLink() {
        const links = JSON.parse(localStorage.getItem("weverApp-list") || "[]");

        return links;
    }

    static saveLink(newLink) {
        const links = WeverAPI.getLink();

        // id
        newLink.id = Math.floor(Math.random() * 100000);
        // date
        newLink.date = new Date().toISOString();

        links.push(newLink);
        localStorage.setItem("weverApp-list", JSON.stringify(links));
    }

    static deleteLink(id) {
        const links = WeverAPI.getLink();
        const newLink = links.filter(link => link.id != id);

        localStorage.setItem("weverApp-list", JSON.stringify(newLink));
    }
}