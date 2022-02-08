class UserCard extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({ mode: "open" }); // 开启 Shadow DOM:closed为封闭的，不允许外部访问
    var templateElem = document.getElementById("userCardTemplate");
    var content = templateElem.content.cloneNode(true);
    content
      .querySelector("img")
      .setAttribute("src", this.getAttribute("image"));
    content.querySelector(".container>.name").innerText = this.getAttribute(
      "name"
    );
    content.querySelector(".container>.email").innerText = this.getAttribute(
      "email"
    );
    shadow.appendChild(content);
    templateElem.remove();
  }
}
window.customElements.define("user-card", UserCard); // 自定义元素类
